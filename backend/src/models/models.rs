use actix::Message as ActixMessage;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Type};

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

#[derive(Serialize, Deserialize)]
pub struct LoginData {
    pub username: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct NewUser {
    pub username: String,
    pub email: String,
    pub password: String,
    pub full_name: Option<String>,
    pub profile_pic: Option<Vec<u8>>,
    pub profile_pic_type: Option<String>,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct Post {
    post_id: i32,
    user_id: i32,
    title: String,
    description: String,
    media: Option<Vec<u8>>,
    media_type: Option<String>,
}

#[derive(Serialize, Deserialize, Type, Clone, Copy)]
#[sqlx(type_name = "post_type_enum")]
pub enum PostType {
    #[sqlx(rename = "receiver")]
    Receiver,
    #[sqlx(rename = "donor")]
    Donor,
}

#[derive(Serialize, Deserialize)]
pub struct NewPost {
    pub post_type: String,
    pub title: String,
    pub description: String,
    pub media: Option<Vec<u8>>,
    pub media_type: Option<String>,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct Comment {
    pub comment_id: i32,
    pub user_id: i32,
    pub post_id: i32,
    pub post_type: PostType,
    pub comment_text: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Serialize, Deserialize)]
pub struct NewComment {
    pub post_id: i32,
    pub post_type: PostType,
    pub comment_text: String,
}

#[derive(Serialize, Deserialize)]
pub struct UpdateUser {
    pub full_name: Option<String>,
    pub profile_pic: Option<Vec<u8>>,
    pub profile_pic_type: Option<String>,
    pub password: Option<String>,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct Message {
    pub message_id: i32,
    pub sender_id: i32,
    pub receiver_id: i32,
    pub content: String,
    pub sent_at: DateTime<Utc>,
    pub is_read: bool,
}

#[derive(ActixMessage, Serialize, Deserialize, Clone)]
#[rtype(result = "()")]
pub struct ChatMessage {
    pub sender_id: i32,
    pub receiver_id: i32,
    pub content: String,
}