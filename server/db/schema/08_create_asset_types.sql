-- schema/08_create_asset_types.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS asset_types CASCADE;
-- CREATE USERS
CREATE TABLE asset_types (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);