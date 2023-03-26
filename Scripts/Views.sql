/*--------------------------———————------------------------------
----------------------------| VIEW |-----------------------------
----------------------------———————----------------------------*/

-------------------- Info user --------------------
CREATE OR REPLACE VIEW all_info_user AS
SELECT Users.user_id, user_name, user_img, user_email, user_password, user_date_of_birth, Role.role_name
FROM Users
JOIN Role ON Users.user_role_id = Role.role_id
DROP VIEW all_info_user;

-------------------- Info track --------------------
CREATE OR REPLACE VIEW all_info_track AS
SELECT t.track_id, t.track_title, t.track_date,
g.genre_name, t.track_image, t.track_content,
average_rating(t.track_id) AS avg_rating
FROM Track t
JOIN Genre g ON t.genre_id = g.genre_id;

SELECT * FROM all_info_track
drop view all_info_track
SELECT * FROM all_info_track WHERE track_id = 4;

-------------------- Playlist --------------------
CREATE VIEW playlist_tracks_info AS
SELECT t.track_id, t.track_title, t.track_date,
g.genre_name, t.track_image, t.track_content,
average_rating(t.track_id) AS avg_rating, pt.playlist_id
FROM Playlist_tracks pt
JOIN Track t ON pt.track_id = t.track_id
JOIN Genre g ON t.genre_id = g.genre_id;

SELECT *
FROM playlist_tracks_info
WHERE playlist_id = 8

