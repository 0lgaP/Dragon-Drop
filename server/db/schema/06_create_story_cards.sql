CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS story_cards CASCADE;
-- CREATE STORY_CARDS
CREATE TABLE story_cards (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  campaigns_id uuid REFERENCES campaigns(id) on DELETE CASCADE,
  order_num SMALLINT,
  story_card_text VARCHAR(600) NOT NULL,
  created_on TIMESTAMP DEFAULT NOW(),
  completed BOOLEAN NOT NULL DEFAULT FALSE
);