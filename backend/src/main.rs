use crate::api::*;
use crate::auth_service::*;
use crate::chat_service::chatserver::ChatServer;
use crate::db_service::Database;
use actix::Actor;
use actix_cors::Cors;
use actix_web::web::Data;
use actix_web::{App, HttpServer, http};
use anyhow::{Context, Result};
use dotenv::dotenv;
use sqlx::migrate::Migrator;
use std::env;

mod api;
mod auth_service;
mod chat_service;
mod db_service;
mod models;

static MIGRATOR: Migrator = sqlx::migrate!();

#[actix_web::main]
async fn main() -> Result<()> {
    dotenv().ok();
    let db = Database::establish_connection(
        env::var("DATABASE_URL").context("$DATABASE_URL not found")?,
    )
    .await
    .context("Could not connect to database")?;
    let chat_server = ChatServer::new(db.clone()).start();

    MIGRATOR
        .run(&db.pool)
        .await
        .context("Failed to run migrations")?;

    let db_data = Data::new(db);
    let chat_server_data = Data::new(chat_server);
    let token_data = Data::new(Token::new()?);

    println!("Server started successfully!");

    //Might run the API on $ADDRESS/api
    HttpServer::new(move || {
        App::new()
            .app_data(db_data.clone())
            .app_data(token_data.clone())
            .app_data(chat_server_data.clone())
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
                    .allowed_headers(vec![
                        http::header::CONTENT_TYPE,
                        http::header::AUTHORIZATION,
                        http::header::COOKIE,
                        http::header::SET_COOKIE,
                    ])
                    .supports_credentials(),
            )
            .service(get_users)
            .service(get_users_by_id)
            .service(login)
            .service(add_new_user)
            .service(add_post)
            .service(add_comment)
            .service(show_comments)
            .service(update_user)
            .service(send_message)
            .service(get_messages_between_users)
            .service(websocket_route)
    })
    .bind(env::var("ADDRESS").context("$ADDRESS not found")?)?
    .run()
    .await
    .context("Failed to start an HTTP server")
}
