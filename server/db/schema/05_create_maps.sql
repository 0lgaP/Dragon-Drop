-- schema/05_create_maps.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS maps CASCADE;
-- CREATE USERS
CREATE TABLE maps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE
);