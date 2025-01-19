# Hyperlocal Charity and Help Network

## Frontend

- Set up a new Next.js project using `npx create-next-app@latest`.
- After setting up, add the necessary files as needed.
- Install `styled-components` and `react-icons` for styling and adding icons to the components, respectively.
- The project also uses powerful libraries like Tailwind CSS and React.
- Created a simple webpage that routes to a sign-in page.
- Upon successful sign-in, users are directed to the main webpage.
- On the main page, users can view posts from various people about donation requests and those willing to donate.

## Backend

- Setup a new Rust project using `cargo new backend`
- Install the `sqlx` CLI to create migrations
- Initialize environment variable `DATABASE_URL=<path>/Charity` and run the command `sqlx database create`
- Create the SQLX migrations `sqlx migrate add -r charity` (`-r` flag is used to create both up and down migrations)
- Run the migrations using `sqlx migrate run`. (We can revert the migrations by running `sqlx migrate revert`)
- Load the environment variables correctly and use the `dotenv` crate (use `dotenv().ok()` to use) to load the `.env` files correctly.

Using `anyhow` to handle errors more elegantly (might use `thiserror` in the future). Using `actix-web` framework to handle the backend api creation.

### JWT Authentication
Using the `jsonwebtoken` crate to generate the JWTs for login and passing them as cookies using `actix`.\
The hashed password is then stored in the database. Hashing is done using the `bcrypt` library.
