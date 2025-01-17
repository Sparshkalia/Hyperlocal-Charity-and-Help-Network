use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, FromRow)]
pub struct User {
    pub user_id: i32,
    pub username: String,
    pub email: String,
    pub password: String,
    pub full_name: Option<String>,
    pub profile_pic: Option<Vec<u8>>,
    pub profile_pic_type: Option<String>,
    pub created_at: DateTime<Utc>,
}
