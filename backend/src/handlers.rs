use crate::db_service::Database;
use actix_web::web::Data;
use actix_web::{get, HttpResponse, Responder};

#[get("/people")]
async fn get_users(db: Data<Database>) -> impl Responder {
    match db.get_users().await {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
