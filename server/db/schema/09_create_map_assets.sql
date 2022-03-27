-- schema/09_create_map_assets.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS map_assets CASCADE;
-- CREATE USERS
CREATE TABLE map_assets (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  map_id uuid REFERENCES maps(id) ON DELETE CASCADE,
  asset_id uuid NOT NULL,
  type_id uuid REFERENCES asset_types(id),
  scale float(4) DEFAULT 10,
  top_pos float(4) DEFAULT 0,
  left_pos float(4) DEFAULT 0,
  layer_order numeric DEFAULT 1,
  layer_name VARCHAR(25) DEFAULT ''
);