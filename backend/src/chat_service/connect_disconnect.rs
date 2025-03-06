use actix::{Addr, Message};
use crate::chat_service::websocketsession::WebSocketSession;

#[derive(Message)]
#[rtype(result = "()")]
pub struct Connect {
    pub user_id: i32,
    pub addr: Addr<WebSocketSession>
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect {
    pub user_id: i32,
}