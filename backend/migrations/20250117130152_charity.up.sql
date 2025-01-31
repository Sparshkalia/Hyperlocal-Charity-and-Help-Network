-- Add up a migration script here
CREATE EXTENSION IF NOT EXISTS citext;
-- citext is a character-insensitive string type (since emails are case-insensitive, it makes sense to use citext)
CREATE TABLE users
(
    user_id          SERIAL PRIMARY KEY,
    username         VARCHAR(50)    NOT NULL UNIQUE,
    email            CITEXT         NOT NULL UNIQUE,
    password         VARCHAR(255)   NOT NULL, --Hashed passwords
    full_name        VARCHAR(100),
    profile_pic      BYTEA,                   --Stores the binary data of the image directly
    profile_pic_type VARCHAR(50),             --Image MIME type (jpeg, png, etc)
    created_at       timestamptz(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE receiver_posts
(
    post_id     SERIAL PRIMARY KEY,
    user_id     INT            NOT NULL,
    title       VARCHAR(255)   NOT NULL,
    description TEXT           NOT NULL,
    media       BYTEA,
    media_type  VARCHAR(50),
    completed   BOOLEAN        NOT NULL DEFAULT FALSE,
    created_at  timestamptz(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE donor_posts
(
    post_id     SERIAL PRIMARY KEY,
    user_id     INT            NOT NULL,
    title       VARCHAR(255)   NOT NULL,
    description TEXT           NOT NULL,
    media       BYTEA,
    media_type  VARCHAR(50),
    completed   BOOLEAN        NOT NULL DEFAULT FALSE,
    created_at  timestamptz(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TYPE post_type_enum AS ENUM ('receiver', 'donor');

CREATE TABLE comments
(
    comment_id   SERIAL PRIMARY KEY,
    user_id      INT            NOT NULL,
    post_id      INT            NOT NULL, --Can be donor/receiver
    post_type    post_type_enum NOT NULL,
    comment_text TEXT           NOT NULL,
    created_at   timestamptz(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE messages
(
    message_id  SERIAL PRIMARY KEY,
    sender_id   INT  NOT NULL,
    receiver_id INT  NOT NULL,
    content     TEXT NOT NULL,
    sent_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read     BOOLEAN     NOT NULL DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users (user_id) ON DELETE CASCADE
);