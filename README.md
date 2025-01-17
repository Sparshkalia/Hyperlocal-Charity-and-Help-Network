# Hyperlocal Charity and Help Network

## Backend

- Setup a new Rust project using `cargo new backend`
- Install the `sqlx` CLI to create migrations
- Initialize environment variable `DATABASE_URL=<path>/Charity` and run the command `sqlx database create`
- Create the SQLX migrations `sqlx migrate add -r charity` (`-r` flag is used to create both up and down migrations)
- Run the migrations using `sqlx migrate run`. (We can revert the migrations by running `sqlx migrate revert`)
- Load the environment variables correctly and use the `dotenv` crate (use `dotenv().ok()` to use) to load the `.env` files correctly.

Using `anyhow` to handle errors more elegantly (might use `thiserror` in the future). Using `actix-web` framework to handle the backend api creation.
