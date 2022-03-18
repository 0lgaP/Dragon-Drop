-- schema/02_create_campaigns.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS campaigns CASCADE;
-- CREATE USERS
CREATE TABLE campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100),
  dm_id UUID REFERENCES users(id)
);