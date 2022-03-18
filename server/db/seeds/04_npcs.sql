-- seeds/04_npcs.sql
-- NPCs seeds
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES (1, null, 1, 'Merla Brushgather', true, 'A Halfling farmer looking for her lost goat, Morty.', 'Town1');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES (2, null, 1, 'Morty', true, 'A goat belonging to Merla Brushgather.', 'Town1');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES (3, null, 1, 'Orsik Ironfist', true, 'Local blacksmith, favours the drink too much.', 'Town1');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES (4, null, 1, 'Eryn Tharivol', true, 'Owner of Green Dragon Inn.', 'Town1, secretly part of Illuminati');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES (5, null, 3, 'Ash Ketchum', true, `Aiming to be the world's best Pokemon trainer!`, 'Pallet Town');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES (6, null, 3, 'Jesse', true, `Member of Team Rocket.`, 'Viridian City');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES (7, null, 3, 'James', true, `Member of Team Rocket.`, 'Viridian City');
INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details) 
  VALUES (8, null, 3, 'Meowth', true, `Member of Team Rocket.`, 'Viridian City');

