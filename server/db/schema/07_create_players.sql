-- schema/01_create_users.sql
DROP TABLE IF EXISTS players CASCADE;
-- CREATE USERS
CREATE TABLE players (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  name VARCHAR(25),
  profile_pic TEXT,
  sheet_url TEXT
);