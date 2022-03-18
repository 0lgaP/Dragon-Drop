-- schema/01_create_users.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users CASCADE;
-- CREATE USERS
CREATE TABLE users (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(20) NOT NULL
);