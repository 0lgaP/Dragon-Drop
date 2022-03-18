-- schema/01_create_users.sql
DROP TABLE IF EXISTS players CASCADE;
-- CREATE USERS
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  user_id FOREIGN KEY REFERENCES users(id)
  campaign_id FOREIGN KEY REFERENCES campaigns(id)
);