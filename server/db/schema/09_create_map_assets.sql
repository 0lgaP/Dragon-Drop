-- schema/09_create_map_assets.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS map_assets CASCADE;
-- CREATE USERS
CREATE TABLE map_assets (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  map_id uuid REFERENCES maps(id),
  asset_id uuid NOT NULL,
  type_id uuid REFERENCES asset_types(id)
);