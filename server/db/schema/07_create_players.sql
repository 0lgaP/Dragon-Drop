-- schema/01_create_users.sql
DROP TABLE IF EXISTS players CASCADE;
-- CREATE USERS
CREATE TABLE players (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  name VARCHAR(25) DEFAULT 'Cool Player',
  profile_pic TEXT DEFAULT 'https://i.imgur.com/xmsz8Al.png',
  sheet_url TEXT DEFAULT 'https://ddb.ac/characters/70788805/FcpVcv'
);