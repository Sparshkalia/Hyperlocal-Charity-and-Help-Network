use crate::auth_service::*;
use crate::chat_service::chatserver::ChatServer;
use crate::chat_service::websocketsession::WebSocketSession;
use crate::db_service::*;
use crate::models::*;
use actix::Addr;
use actix_web::cookie::Cookie;
use actix_web::web::{Data, Json, Path, Payload};
use actix_web::{HttpRequest, HttpResponse, Responder, get, post, put, Error};
use actix_web_actors::ws;
use serde::Deserialize;
use serde_json::json;

#[get("/users")]
async fn get_users(db: Data<Database>) -> impl Responder {
    match db.get_users().await {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/user/{id}")]
async fn get_users_by_id(
    db: Data<Database>,
    req: HttpRequest,
    user_id: Path<i32>,
    token: Data<Token>,
) -> impl Responder {
    let auth_token = match Token::extract_token_from_cookie(&req) {
        None => return HttpResponse::Unauthorized().body("Unauthorized"),
        Some(token) => token,
    };

    match token.get_user_id_from_jwt(&auth_token) {
        Ok(token_user_id) => {
            if token_user_id == user_id.into_inner() {
                match db.get_user_by_id(token_user_id).await {
                    Ok(user) => HttpResponse::Ok().json(user),
                    Err(_) => HttpResponse::InternalServerError().finish(),
                }
            } else {
                HttpResponse::Unauthorized().body("Unauthorized")
            }
        }
        Err(_) => HttpResponse::InternalServerError().body("Invalid token"),
    }
}

#[post("/login")]
async fn login(db: Data<Database>, data: Json<LoginData>, token: Data<Token>) -> impl Responder {
    match db.login(data.into_inner()).await {
        Ok((user_id, username)) => match token.generate(user_id, &username) {
            Ok(token) => {
                let cookie = Cookie::build("auth_token", token)
                    .path("/")
                    .http_only(true)
                    .finish();
                HttpResponse::Ok().cookie(cookie).json(json!(
                    {
                        "user_id": user_id,
                        "username": username
                    }
                ))
            }
            Err(_) => HttpResponse::InternalServerError().json(json!({
                "error": "Failed to generate JWT"
            })),
        },
        Err(e) => HttpResponse::Unauthorized().json(json!({
            "error": e.to_string()
        })),
    }
}

#[post("/user")]
async fn add_new_user(db: Data<Database>, new_user: Json<NewUser>) -> impl Responder {
    match db.add_user(new_user.into_inner()).await {
        Ok(person) => HttpResponse::Ok().json(person),
        Err(e) => HttpResponse::InternalServerError().json(json!({
            "error": e.to_string()
        })),
    }
}

#[post("/post/{id}")]
async fn add_post(
    db: Data<Database>,
    req: HttpRequest,
    user_id: Path<i32>,
    new_post: Json<NewPost>,
    token: Data<Token>,
) -> impl Responder {
    let auth_token = match Token::extract_token_from_cookie(&req) {
        None => return HttpResponse::Unauthorized().body("Unauthorized"),
        Some(token) => token,
    };

    let token_user_id = match token.get_user_id_from_jwt(&auth_token) {
        Ok(user_id) => user_id,
        Err(_) => return HttpResponse::Unauthorized().body("Invalid token"),
    };

    if token_user_id != user_id.clone() {
        return HttpResponse::Unauthorized().body("Unauthorized");
    }

    match db
        .add_post(user_id.into_inner(), new_post.into_inner())
        .await
    {
        Ok(post) => HttpResponse::Ok().json(post),
        Err(e) => HttpResponse::InternalServerError().json(json!({
            "error": e.to_string()
        })),
    }
}

#[post("/comment/{id}")]
async fn add_comment(
    db: Data<Database>,
    req: HttpRequest,
    user_id: Path<i32>,
    new_comment: Json<NewComment>,
    token: Data<Token>,
) -> impl Responder {
    let auth_token = match Token::extract_token_from_cookie(&req) {
        None => return HttpResponse::Unauthorized().body("Unauthorized"),
        Some(token) => token,
    };

    let token_user_id = match token.get_user_id_from_jwt(&auth_token) {
        Ok(user_id) => user_id,
        Err(_) => return HttpResponse::Unauthorized().body("Invalid token"),
    };

    let user_id = user_id.into_inner();
    if token_user_id != user_id {
        return HttpResponse::Unauthorized().body("Unauthorized");
    }

    match db.add_comment(user_id, new_comment.into_inner()).await {
        Ok(comment) => HttpResponse::Ok().json(comment),
        Err(e) => HttpResponse::InternalServerError().json(json!({
            "error": e.to_string()
        })),
    }
}

///Need this wrapper struct for something
#[derive(Deserialize)]
struct ShowCommentsRequest {
    post_type: PostType,
}

#[get("/comments/{post_id}")]
async fn show_comments(
    db: Data<Database>,
    req: HttpRequest,
    post_id: Path<i32>,
    post_type: Json<ShowCommentsRequest>,
    token: Data<Token>,
) -> impl Responder {
    let auth_token = match Token::extract_token_from_cookie(&req) {
        None => return HttpResponse::Unauthorized().body("Unauthorized"),
        Some(token) => token,
    };

    let user_id = match token.get_user_id_from_jwt(&auth_token) {
        Ok(user_id) => user_id,
        Err(_) => return HttpResponse::Unauthorized().body("Invalid token"),
    };

    match db
        .show_comments(user_id, post_id.into_inner(), post_type.post_type)
        .await
    {
        Ok(comments) => HttpResponse::Ok().json(comments),
        Err(e) => HttpResponse::InternalServerError().json(json!({
            "error": e.to_string()
        })),
    }
}

#[put("/user/{id}")]
async fn update_user(
    db: Data<Database>,
    req: HttpRequest,
    user_id: Path<i32>,
    update_user: Json<UpdateUser>,
    token: Data<Token>,
) -> impl Responder {
    let auth_token = match Token::extract_token_from_cookie(&req) {
        None => return HttpResponse::Unauthorized().body("Unauthorized"),
        Some(token) => token,
    };

    let token_user_id = match token.get_user_id_from_jwt(&auth_token) {
        Ok(user_id) => user_id,
        Err(_) => return HttpResponse::Unauthorized().body("Invalid token"),
    };

    if token_user_id != user_id.into_inner() {
        return HttpResponse::Unauthorized().body("Unauthorized");
    }

    match db
        .update_user(token_user_id, update_user.into_inner())
        .await
    {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(e) => HttpResponse::InternalServerError().json(json!({
            "error": e.to_string()
        })),
    }
}

#[post("/message")]
async fn send_message(
    db: Data<Database>,
    req: HttpRequest,
    new_message: Json<ChatMessage>,
    token: Data<Token>,
) -> impl Responder {
    let auth_token = match Token::extract_token_from_cookie(&req) {
        None => return HttpResponse::Unauthorized().body("Unauthorized"),
        Some(token) => token,
    };

    let token_user_id = match token.get_user_id_from_jwt(&auth_token) {
        Ok(user_id) => user_id,
        Err(_) => return HttpResponse::Unauthorized().body("Invalid token"),
    };

    let new_message = new_message.into_inner();
    if token_user_id != new_message.sender_id {
        return HttpResponse::Unauthorized().body("Unauthorized");
    }

    match db.add_message(new_message).await {
        Ok(message) => HttpResponse::Ok().json(message),
        Err(e) => HttpResponse::InternalServerError().json(json!({
            "error": e.to_string()
        })),
    }
}

#[get("messages/{bf}/{gf}")]
async fn get_messages_between_users(
    db: Data<Database>,
    req: HttpRequest,
    path: Path<(i32, i32)>,
    token: Data<Token>,
) -> impl Responder {
    let auth_token = match Token::extract_token_from_cookie(&req) {
        None => return HttpResponse::Unauthorized().body("Unauthorized"),
        Some(token) => token,
    };

    let token_user_id = match token.get_user_id_from_jwt(&auth_token) {
        Ok(user_id) => user_id,
        Err(_) => return HttpResponse::Unauthorized().body("Invalid token"),
    };

    let (bf, gf) = path.into_inner();
    if token_user_id != bf {
        return HttpResponse::Unauthorized().body("Unauthorized");
    }

    match db.get_messages_between_users(bf, gf).await {
        Ok(messages) => HttpResponse::Ok().json(messages),
        Err(e) => HttpResponse::InternalServerError().json(json!({
            "error": e.to_string()
        })),
    }
}

#[get("/ws/{sender}/{receiver}")]
async fn websocket_route(
    chat_server: Data<Addr<ChatServer>>,
    req: HttpRequest,
    stream: Payload,
    path: Path<(i32, i32)>,
    token: Data<Token>,
) -> Result<HttpResponse, Error> {  // Change return type to Result<HttpResponse, Error>
    let (sender, _receiver) = path.into_inner();

    // Authentication
    // let auth_token = match Token::extract_token_from_cookie(&req) {
    //     None => return Ok(HttpResponse::Unauthorized().body("Unauthorized")),
    //     Some(token) => token,
    // };
    //
    // let token_user_id = match token.get_user_id_from_jwt(&auth_token) {
    //     Ok(user_id) => user_id,
    //     Err(_) => return Ok(HttpResponse::Unauthorized().body("Invalid token")),
    // };
    //
    // if token_user_id != sender {
    //     return Ok(HttpResponse::Unauthorized().body("Unauthorized"));
    // }

    // Create WebSocketSession
    let ws = WebSocketSession {
        user_id: sender,
        addr: chat_server.get_ref().clone(),
    };

    // Start WebSocket connection
    match ws::start(ws, &req, stream) {
        Ok(resp) => Ok(resp),
        Err(e) => {
            eprintln!("Websocket error: {e}");
            Err(e)
        }
    }
}
