use crate::auth::generate_jwt;
use crate::db_service::Database;
use crate::models::{LoginData, NewUser};
use actix_web::cookie::Cookie;
use actix_web::web::{Data, Json, Path};
use actix_web::{HttpResponse, Responder, get, post};
use anyhow::Context;
use serde_json::json;
use std::env;

#[get("/users")]
async fn get_users(db: Data<Database>) -> impl Responder {
    match db.get_users().await {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/user/{id}")]
async fn get_users_by_id(db: Data<Database>, user_id: Path<i32>) -> impl Responder {
    match db.get_user_by_id(user_id.into_inner()).await {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[post("/login")]
async fn login(db: Data<Database>, data: Json<LoginData>) -> impl Responder {
    match db.login(data.into_inner()).await {
        Ok((user_id, username)) => {
            //We need to panic if JWT_SECRET is not found
            let secret = env::var("JWT_SECRET")
                .context("$JWT_SECRET not found")
                .unwrap();
            match generate_jwt(user_id, &username, &secret) {
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
            }
        }
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
