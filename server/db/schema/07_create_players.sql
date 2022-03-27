-- schema/01_create_users.sql
DROP TABLE IF EXISTS players CASCADE;
-- CREATE USERS
CREATE TABLE players (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  name VARCHAR(25) DEFAULT 'No Name entered',
  profile_pic TEXT DEFAULT 'https://cdn.vox-cdn.com/thumbor/WDYEciOUWFz_PvWt-LyhaYeSEyo=/0x0:1548x1024/1400x1050/filters:focal(693x458:939x704):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/65936299/cats4.0.jpg',
  sheet_url TEXT DEFAULT 'https://ddb.ac/characters/70788805/FcpVcv'
);