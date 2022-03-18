-- schema/02_create_campaigns.sql
DROP TABLE IF EXISTS campaigns CASCADE;
-- CREATE USERS
CREATE TABLE campaigns (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100),
  dm_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);