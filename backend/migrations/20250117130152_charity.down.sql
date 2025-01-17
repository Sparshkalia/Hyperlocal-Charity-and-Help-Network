-- Add down migration script here
DROP TABLE IF EXISTS comments;

-- Drop the custom type for post_type_enum
DROP TYPE IF EXISTS post_type_enum;

-- Drop the donor_posts table
DROP TABLE IF EXISTS donor_posts;

-- Drop the receiver_posts table
DROP TABLE IF EXISTS receiver_posts;

-- Drop the users table
DROP TABLE IF EXISTS users;

-- Drop the citext extension
DROP EXTENSION IF EXISTS citext;