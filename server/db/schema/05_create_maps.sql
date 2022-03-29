-- schema/05_create_maps.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS maps CASCADE;
-- CREATE USERS
CREATE TABLE maps (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  background TEXT,
  bio VARCHAR(250)
  -- 'https://lh3.googleusercontent.com/AJ5H-eUNPd2wAQlJsADGgNNMgG7BTotJG2Uz2hnibIoiSXH_76CKuZKBrJTAaPJoZNRxQ5Q=s0'
);