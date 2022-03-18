-- schema/01_create_users.sql
DROP TABLE IF EXISTS npcs CASCADE;
-- CREATE USERS
CREATE TABLE npcs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  img UUID REFERENCES images(id),
  campaign_id UUID REFERENCES campaigns(id),
  name VARCHAR(50),
  alive BOOLEAN,
  bio VARCHAR(300),
  details VARCHAR(100)
);