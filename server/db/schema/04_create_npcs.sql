-- schema/01_create_users.sql
DROP TABLE IF EXISTS npcs CASCADE;
-- CREATE USERS
CREATE TABLE npcs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  img uuid REFERENCES images(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  name VARCHAR(50),
  alive BOOLEAN,
  bio VARCHAR(300)
  details VARCHAR(100)
);