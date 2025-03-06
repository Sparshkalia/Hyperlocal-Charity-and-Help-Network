use crate::chat_service::connect_disconnect::{Connect, Disconnect};
use crate::db_service::Database;
use crate::models::ChatMessage;
use actix::{Actor, Context as ActixContext, Handler, Recipient};
use std::collections::HashMap;

pub struct ChatServer {
    sessions: HashMap<i32, Recipient<ChatMessage>>,
    database: Database,
}

impl ChatServer {
    pub fn new(database: Database) -> Self {
        ChatServer {
            sessions: HashMap::new(),
            database,
        }
    }

    fn send_message(&self, message: &ChatMessage) {
        if let Some(recipient) = self.sessions.get(&message.receiver_id) {
            let _ = recipient.do_send(message.clone());
        }
    }
}

impl Actor for ChatServer {
    type Context = ActixContext<Self>;
}

impl Handler<Connect> for ChatServer {
    type Result = ();

    fn handle(&mut self, msg: Connect, _: &mut Self::Context) -> Self::Result {
        eprintln!("User {} connected", msg.user_id);
        self.sessions.insert(msg.user_id, msg.addr.recipient());
    }
}

impl Handler<Disconnect> for ChatServer {
    type Result = ();

    fn handle(&mut self, msg: Disconnect, _: &mut Self::Context) -> Self::Result {
        eprintln!("User {} disconnected", msg.user_id);
        self.sessions.remove(&msg.user_id);
    }
}

impl Handler<ChatMessage> for ChatServer {
    type Result = ();

    fn handle(&mut self, msg: ChatMessage, _: &mut Self::Context) -> Self::Result {
        self.send_message(&msg);

        let db = self.database.clone();
        let chat_message = msg.clone();

        actix::spawn(async move {
            if let Err(e) = db.add_message(chat_message).await {
                eprintln!("Failed to add message to database: {}", e);
            }
        });
    }
}
