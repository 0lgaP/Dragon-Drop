-- schema/09_create_map_assets.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS notes CASCADE;
-- CREATE USERS
CREATE TABLE notes (
  -- id VARCHAR(73) PRIMARY KEY NOT NULL, --id need to be made by doing `${campaign_id}-${user_id}`
  campaign_id uuid REFERENCES campaigns(id),
  user_id uuid REFERENCES users(id),
  content TEXT,
  PRIMARY KEY (campaign_id, user_id)
);