use crate::db_service::Database;
use crate::handlers::get_users;
use actix_cors::Cors;
use actix_web::web::Data;
use actix_web::{App, HttpServer, http};
use anyhow::{Context, Result};
use dotenv::dotenv;
use sqlx::migrate::Migrator;
use std::env;

mod db_service;
mod handlers;
mod models;
mod auth;

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
        .run(db.pool())
        .await
        .context("Failed to run migrations")?;

    let db_data = Data::new(db);

    println!("Server started successfully!");

    HttpServer::new(move || {
        App::new()
            .app_data(db_data.clone())
            .wrap(
                Cors::default()
                    // .allowed_origin("https:://idk")
                    .allow_any_origin()
                    .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
                    .allowed_headers(vec![
                        http::header::CONTENT_TYPE,
                        http::header::AUTHORIZATION,
                    ]),
            )
            .service(get_users)
    })
    .bind(env::var("ADDRESS").context("$ADDRESS not found")?)?
    .run()
    .await
    .context("Failed to start an HTTP server")
}
