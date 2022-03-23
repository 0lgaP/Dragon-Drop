CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS story_cards CASCADE;
-- CREATE STORY_CARDS
CREATE TABLE story_cards (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  story_id uuid REFERENCES story(id) on DELETE CASCADE,
  story_card_text VARCHAR(600) NOT NULL,
  created_on TIMESTAMP DEFAULT NOW(),
  completed BOOLEAN NOT NULL DEFAULT FALSE
);