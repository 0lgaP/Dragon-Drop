CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS story CASCADE;
-- CREATE STORY
CREATE TABLE story (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  campaign_id uuid REFERENCES campaigns(id) on DELETE CASCADE
);