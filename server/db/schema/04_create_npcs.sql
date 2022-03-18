-- schema/01_create_users.sql
DROP TABLE IF EXISTS npcs CASCADE;
-- CREATE USERS
CREATE TABLE npcs (
  id SERIAL PRIMARY KEY,
  img FOREIGN KEY REFERENCES images(id),
  campaign_id FOREIGN KEY REFERENCES campaigns(id),
  name VARCHAR(50),
  alive BOOLEAN,
  bio VARCHAR(300)
  details VARCHAR(100)
);