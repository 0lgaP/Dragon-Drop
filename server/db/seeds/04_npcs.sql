-- seeds/04_npcs.sql
-- NPCs seeds
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES ('2c9267a4-2dbf-4ce4-91b3-ae6a514fa795', 'https://i.imgur.com/oysjpc5.png', '8a89386b-de43-4c63-9127-3a78394d4253', 'Merla Brushgather', true, 'A Halfling farmer looking for her lost goat, Morty.', 'Town1');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES ('c6b15ff4-eba6-4d07-b885-6bf54f935e65', 'https://i.imgur.com/WN2KSxf.png', '8a89386b-de43-4c63-9127-3a78394d4253', 'Morty', true, 'A goat belonging to Merla Brushgather.', 'Town1');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES ('a1830913-9213-464c-8139-485ba7238d7c', 'https://i.imgur.com/uR2QROV.png', '8a89386b-de43-4c63-9127-3a78394d4253', 'Orsik Ironfist', true, 'Local blacksmith, favours the drink too much.', 'Town1');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES ('74c7ec40-45d9-46e5-8ab3-cd2f1448fe1d', 'https://i.imgur.com/pMfFYJc.png', '8a89386b-de43-4c63-9127-3a78394d4253', 'Eryn Tharivol', true, 'Owner of Green Dragon Inn.', 'Town1, secretly part of Illuminati');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES ('6f83b2c1-7a35-431c-b6f7-b8998945c478', 'https://i.imgur.com/xmsz8Al.png', 'b819024a-4fd2-4316-8697-411ad293bb71', 'Ash Ketchum', true, 'Aiming to be the worlds best Pokemon trainer!', 'Pallet Town');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES ('315cbe8a-8bff-4e02-aa73-adeb16193374', 'https://i.imgur.com/oysjpc5.png', 'b819024a-4fd2-4316-8697-411ad293bb71', 'Jesse', true, 'Member of Team Rocket.', 'Viridian City'),
        ('718586f3-9640-4c2d-8533-683095bfb632', 'https://i.imgur.com/zaevcoR.jpg', 'b819024a-4fd2-4316-8697-411ad293bb71', 'Nerrator', true, 'Game Master', 'Canada');

INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES ('753edd75-7cda-4953-a1fb-f160e7330c7b', 'https://i.imgur.com/uR2QROV.png', 'b819024a-4fd2-4316-8697-411ad293bb71', 'James', true, 'Member of Team Rocket.', 'Viridian City');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES ('c6f18a16-9d2e-4ec7-995c-be066f95b2d7', 'https://i.imgur.com/WN2KSxf.png', 'b819024a-4fd2-4316-8697-411ad293bb71', 'Meowth', false, 'Member of Team Rocket.', 'Viridian City');

