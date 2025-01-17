use crate::models::User;
use anyhow::{Context, Result};
use sqlx::PgPool;

pub struct Database {
    pool: PgPool,
}

impl Database {
    pub async fn establish_connection(database_url: String) -> Result<Self> {
        let pool = PgPool::connect(&database_url)
            .await
            .context("Could not connect to database")?;

        Ok(Database { pool })
    }

    pub fn pool(&self) -> &PgPool {
        &self.pool
    }

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
}
