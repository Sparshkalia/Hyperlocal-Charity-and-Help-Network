use crate::auth::Token;
use crate::db_service::Database;
use crate::handlers::{add_comment, add_new_user, add_post, get_users, get_users_by_id, login, show_comments, update_user};
use actix_cors::Cors;
use actix_web::web::Data;
use actix_web::{http, App, HttpServer};
use anyhow::{Context, Result};
use dotenv::dotenv;
use sqlx::migrate::Migrator;
use std::env;

mod auth;
mod db_service;
mod handlers;
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

    MIGRATOR
        .run(&db.pool)
        .await
        .context("Failed to run migrations")?;

    let db_data = Data::new(db);
    let token_data = Data::new(Token::new()?);

    println!("Server started successfully!");

    //Might run the API on $ADDRESS/api 
    HttpServer::new(move || {
        App::new()
            .app_data(db_data.clone())
            .app_data(token_data.clone())
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
                    .allowed_headers(vec![
                        http::header::CONTENT_TYPE,
                        http::header::AUTHORIZATION,
                    ]),
            )
            .service(get_users)
            .service(get_users_by_id)
            .service(login)
            .service(add_new_user)
            .service(add_post)
            .service(add_comment)
            .service(show_comments)
            .service(update_user)
    })
    .bind(env::var("ADDRESS").context("$ADDRESS not found")?)?
    .run()
    .await
    .context("Failed to start an HTTP server")
}
