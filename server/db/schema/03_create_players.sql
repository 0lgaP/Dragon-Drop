-- schema/01_create_users.sql
DROP TABLE IF EXISTS players CASCADE;
-- CREATE USERS
CREATE TABLE players (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE
);