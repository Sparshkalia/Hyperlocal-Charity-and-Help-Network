use anyhow::{Context, Result};
use bcrypt::{hash, verify};
use chrono::{Duration, Utc};
use jsonwebtoken::{DecodingKey, EncodingKey, Header, Validation, decode, encode};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Claims {
    sub: i32, //User ID
    username: String,
    exp: usize,
}

pub fn generate_jwt(user_id: i32, username: &str, secret: &str) -> Result<String> {
    let expiration = Utc::now()
        .checked_add_signed(Duration::hours(24))
        .context("Failed to generate expiration timestamp")?
        .timestamp();

    let claims = Claims {
        sub: user_id,
        username: username.to_string(),
        exp: expiration as usize,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_ref()),
    )
    .context("Failed to encode JWT")
}

pub fn get_user_id_from_jwt(token: &str, secret: &str) -> Result<i32> {
    let validation = Validation::default();
    let token_data = decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_ref()),
        &validation,
    )
    .context("Invalid token")?;

    Ok(token_data.claims.sub)
}

pub fn hash_password(password: String) -> Result<String> {
    hash(password, bcrypt::DEFAULT_COST).context("Failed to hash password")
}

pub fn check_password(password: String, hashed: String) -> Result<bool> {
    verify(password, &hashed).context("Could not verify password")
}