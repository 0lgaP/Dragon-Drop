-- schema/01_create_users.sql
DROP TABLE IF EXISTS players CASCADE;
-- CREATE USERS
CREATE TABLE players (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  campaign_id UUID REFERENCES campaigns(id)
);