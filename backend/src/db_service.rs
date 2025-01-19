use crate::auth::{check_password, hash_password};
use crate::models::{LoginData, NewPost, NewUser, Post, User};
use anyhow::{Context, Result, anyhow};
use sqlx::PgPool;

pub struct Database {
    pool: PgPool,
}

impl Database {
    /// Create an instance of the Database
    pub async fn establish_connection(database_url: String) -> Result<Self> {
        let pool = PgPool::connect(&database_url)
            .await
            .context("Could not connect to database")?;

        Ok(Database { pool })
    }
    /// Method to use pool without exposing it? Maybe? Should make `pool` public?
    pub fn pool(&self) -> &PgPool {
        &self.pool
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
    /// Create a new post
}
