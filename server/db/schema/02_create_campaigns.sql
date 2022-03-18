-- schema/02_create_campaigns.sql
DROP TABLE IF EXISTS campaigns CASCADE;
-- CREATE USERS
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  dm_id FOREIGN KEY REFERENCES users(id)
);