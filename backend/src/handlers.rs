use crate::auth::Token;
use crate::db_service::Database;
use crate::models::{LoginData, NewUser};
use actix_web::cookie::Cookie;
use actix_web::web::{Data, Json, Path};
use actix_web::{HttpRequest, HttpResponse, Responder, get, post};
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
