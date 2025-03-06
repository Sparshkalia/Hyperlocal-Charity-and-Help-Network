use crate::auth_service::*;
use crate::models::*;
use anyhow::{Context, Result, anyhow};
use sqlx::PgPool;

#[derive(Clone)]
pub struct Database {
    pub pool: PgPool,
}

impl Database {
    /// Create an instance of the Database
    pub async fn establish_connection(database_url: String) -> Result<Self> {
        let pool = PgPool::connect(&database_url)
            .await
            .context("Could not connect to database")?;

        Ok(Database { pool })
    }
    /// Query to get all the users in the database
    /// TODO- Remove this method
    pub async fn get_users(&self) -> Result<Vec<User>> {
        sqlx::query_as!(
            User,
            r#"
                SELECT user_id, username, email, password, full_name, profile_pic, profile_pic_type, created_at FROM users
            "#
        )
            .fetch_all(&self.pool)
            .await
            .context("Failed to fetch users")
    }
    /// Query to get the user by user_id
    pub async fn get_user_by_id(&self, user_id: i32) -> Result<User> {
        sqlx::query_as!(
            User,
            r#"
                SELECT user_id, username, email, password, full_name, profile_pic, profile_pic_type, created_at FROM users WHERE user_id = $1
            "#,
            user_id
        )
            .fetch_one(&self.pool)
            .await
            .context("Failed to fetch user by id")
    }
    /// Login method for existing users
    pub async fn login(&self, data: LoginData) -> Result<(i32, String)> {
        let user = sqlx::query!(
            r#"SELECT user_id, username, password FROM users WHERE username = $1"#,
            data.username
        )
        .fetch_one(&self.pool)
        .await
        .context("Failed to fetch user")?;

        if check_password(data.password, user.password)? {
            Ok((user.user_id, user.username))
        } else {
            Err(anyhow!("Invalid password"))
        }
    }
    /// Create a new user and store the hashed password
    pub async fn add_user(&self, data: NewUser) -> Result<User> {
        let hashed_password = hash_password(data.password)?;
        sqlx::query_as!(
            User,
            r#"
                INSERT INTO users (username, email, password, full_name, profile_pic, profile_pic_type)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING user_id, username, email, password, full_name, profile_pic, profile_pic_type, created_at
            "#,
            data.username,
            data.email,
            hashed_password,
            data.full_name,
            data.profile_pic,
            data.profile_pic_type
        )
            .fetch_one(&self.pool)
            .await.context("Failed to add new user")
    }
    ///Create a new post
    pub async fn add_post(&self, user_id: i32, new_post: NewPost) -> Result<Post> {
        let query = match new_post.post_type.as_str() {
            "receiver" => {
                r#"
                INSERT INTO receiver_posts (user_id, title, description, media, media_type)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING post_id, user_id, title, description, media, media_type, completed, created_at
            "#
            }
            "donor" => {
                r#"
                INSERT INTO donor_posts (user_id, title, description, media, media_type)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING post_id, user_id, title, description, media, media_type, completed, created_at
            "#
            }
            _ => return Err(anyhow!("Invalid post type")),
        };

        sqlx::query_as(query)
            .bind(user_id)
            .bind(new_post.title)
            .bind(new_post.description)
            .bind(new_post.media)
            .bind(new_post.media_type)
            .fetch_one(&self.pool)
            .await
            .context("Failed to add post")
    }
    /// Query to add a new comment
    pub async fn add_comment(&self, user_id: i32, new_comment: NewComment) -> Result<Comment> {
        sqlx::query_as!(
            Comment,
            r#"
                INSERT INTO comments (user_id, post_id, post_type, comment_text)
                VALUES ($1,$2, $3, $4)
                RETURNING comment_id, user_id, post_id, post_type as "post_type: _", comment_text, created_at
            "#,
            user_id,
            new_comment.post_id,
            new_comment.post_type as PostType,
            new_comment.comment_text,
        )
            .fetch_one(&self.pool)
            .await.context("Failed to add comment")
    }
    /// Checks if a given user_id wrote post_id
    pub async fn is_post_owner(
        &self,
        user_id: i32,
        post_id: i32,
        post_type: PostType,
    ) -> Result<bool> {
        let query = match post_type {
            PostType::Receiver => {
                r#"
                    SELECT EXISTS (
                        SELECT 1 FROM receiver_posts WHERE post_id = $1 AND user_id = $2
                    ) AS "exists!"
                "#
            }
            PostType::Donor => {
                r#"
                    SELECT EXISTS (
                        SELECT 1 FROM donor_posts WHERE post_id = $1 AND user_id = $2
                    ) AS "exists!"
                "#
            }
        };

        let result = sqlx::query_scalar(query)
            .bind(post_id)
            .bind(user_id)
            .fetch_one(&self.pool)
            .await
            .context("Failed to check post ownership")?;

        Ok(result)
    }
    /// Query to show all the comments of a particular post
    pub async fn show_comments(
        &self,
        user_id: i32,
        post_id: i32,
        post_type: PostType,
    ) -> Result<Vec<Comment>> {
        if !self.is_post_owner(user_id, post_id, post_type).await? {
            return Err(anyhow!("Unauthorized: User does not own the post"));
        }

        sqlx::query_as!(
            Comment,
            r#"
                SELECT comment_id, user_id, post_id, post_type as "post_type: _", comment_text, created_at
                FROM comments
                WHERE post_id = $1 AND post_type = $2
            "#,
            post_id,
            post_type as PostType,
        )
            .fetch_all(&self.pool)
            .await
            .context("Failed to fetch comments")
    }
    ///Query to update a user profile
    pub async fn update_user(&self, user_id: i32, update_user: UpdateUser) -> Result<User> {
        sqlx::query_as!(
            User,
            r#"
                UPDATE users
                SET
                    full_name = COALESCE($1, full_name),
                    profile_pic = COALESCE($2, profile_pic),
                    profile_pic_type = COALESCE($3, profile_pic_type),
                    password = COALESCE($4, password)
                WHERE user_id = $5
                RETURNING user_id, username, email, password, full_name, profile_pic, profile_pic_type, created_at
            "#,
            update_user.full_name,
            update_user.profile_pic,
            update_user.profile_pic_type,
            update_user.password.map(|pass| hash_password(pass)).transpose()?,
            user_id
        )
            .fetch_one(&self.pool)
            .await
            .context("Failed to update user")
    }
    ///Query to add a new message
    pub async fn add_message(&self, new_message: ChatMessage) -> Result<Message> {
        sqlx::query_as!(
            Message,
            r#"
                INSERT INTO messages (sender_id, receiver_id, content)
                VALUES ($1, $2, $3)
                RETURNING message_id, sender_id, receiver_id, content, sent_at, is_read
            "#,
            new_message.sender_id,
            new_message.receiver_id,
            new_message.content,
        )
        .fetch_one(&self.pool)
        .await
        .context("Failed to add new message")
    }
    ///Query to get all the messages between two people
    pub async fn get_messages_between_users(&self, bf: i32, gf: i32) -> Result<Vec<Message>> {
        sqlx::query_as!(
            Message,
            r#"
                SELECT message_id, sender_id, receiver_id, content, sent_at, is_read
                FROM messages
                WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
            "#,
            bf,
            gf
        )
        .fetch_all(&self.pool)
        .await
        .context("Failed to get messages between bf and gf")
    }
}
