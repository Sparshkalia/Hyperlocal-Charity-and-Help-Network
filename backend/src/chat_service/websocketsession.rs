use crate::chat_service::chatserver::ChatServer;
use crate::chat_service::connect_disconnect::{Connect, Disconnect};
use crate::models::ChatMessage;
use actix::{Actor, ActorContext, Addr, AsyncContext, Handler, StreamHandler};
use actix_web_actors::ws::{Message, ProtocolError, WebsocketContext};
use std::time::Duration;

pub struct WebSocketSession {
    pub user_id: i32,
    pub addr: Addr<ChatServer>,
}

impl WebSocketSession {
    fn heartbeat(&self, ctx: &mut WebsocketContext<Self>) {
        ctx.run_interval(Duration::from_secs(30), |act, ctx| {
            ctx.ping(b"");
        });
    }
}

impl Actor for WebSocketSession {
    type Context = WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        self.heartbeat(ctx);

        self.addr.do_send(Connect {
            user_id: self.user_id,
            addr: ctx.address(),
        })
    }

    fn stopped(&mut self, _: &mut Self::Context) {
        let server = self.addr.clone();
        server.do_send(Disconnect {
            user_id: self.user_id,
        })
    }
}

impl Handler<ChatMessage> for WebSocketSession {
    type Result = ();

    fn handle(&mut self, msg: ChatMessage, ctx: &mut Self::Context) -> Self::Result {
        let json = serde_json::to_string(&msg).unwrap_or_default();
        ctx.text(json);
    }
}

impl StreamHandler<Result<Message, ProtocolError>> for WebSocketSession {
    fn handle(&mut self, msg: Result<Message, ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(Message::Text(text)) => match serde_json::from_str::<ChatMessage>(&text) {
                Ok(chat_msg) => {
                    let mut validated_msg = chat_msg;
                    validated_msg.sender_id = self.user_id;

                    self.addr.do_send(validated_msg);
                }
                Err(e) => {
                    eprintln!("Error parsing message: {}", e);
                    ctx.text(format!("Error parsing message: {}", e));
                }
            },
            Ok(Message::Ping(bytes)) => {
                ctx.pong(&bytes);
            }
            Ok(Message::Close(reason)) => {
                ctx.close(reason);
                ctx.stop();
            }
            Err(e) => {
                eprintln!("WebSocket protocol error: {}", e);
                ctx.stop();
            }
            _ => (),
        }
    }
}
