/*--------------------------———————------------------------------
----------------------------| VIEW |-----------------------------
----------------------------———————----------------------------*/

-------------------- Info user --------------------
CREATE VIEW all_info_user AS
SELECT Users.user_id, user_name, user_img, user_email, user_password, user_date_of_birth, Role.role_name
FROM Users
LEFT JOIN Role ON Users.user_role_id = Role.role_id;

drop view all_info_user
SELECT * FROM all_info_user WHERE user_id = 1;

-------------------- Info track --------------------
CREATE VIEW all_info_track AS
SELECT t.track_id, t.track_title, t.track_date, u.user_name, u.user_id,
g.genre_name, t.track_image, t.track_content,
average_rating(t.track_id) AS avg_rating
FROM Track t
JOIN Users u ON t.user_id = u.user_id
JOIN Genre g ON t.genre_id = g.genre_id;


drop view all_info_track
SELECT * FROM all_info_track WHERE track_id = 4;
select * from rating

-------------------- Playlist --------------------
CREATE VIEW playlist_tracks_info AS
SELECT t.track_id, t.track_title, t.track_date, u.user_name, u.user_id,
g.genre_name, t.track_image, t.track_content,
average_rating(t.track_id) AS avg_rating, pt.playlist_id
FROM Playlist_tracks pt
JOIN Track t ON pt.track_id = t.track_id
JOIN Users u ON t.user_id = u.user_id
JOIN Genre g ON t.genre_id = g.genre_id;

SELECT *
FROM playlist_tracks_info
WHERE playlist_id = 1


