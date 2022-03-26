-- schema/09_create_map_assets.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS notes CASCADE;
-- CREATE USERS
CREATE TABLE notes (
  campaign_id uuid REFERENCES campaigns(id),
  user_id uuid REFERENCES users(id),
  content TEXT,
  PRIMARY KEY (campaign_id, user_id)
);