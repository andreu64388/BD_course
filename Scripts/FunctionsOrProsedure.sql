/*--------------------------——————————----------------------------
----------------------------| CREATE |----------------------------
----------------------------——————————--------------------------*/


-------------------- Register user --------------------
CREATE OR REPLACE FUNCTION Register(
    in_user_name VARCHAR(255),
    in_user_email VARCHAR(255),
    in_user_password TEXT,
    in_user_date_of_birth DATE,
    in_user_role_id INTEGER,
    in_user_img BYTEA 
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    encrypted_password TEXT := encrypt_password(in_user_password);
    user_id INTEGER;
BEGIN
    INSERT INTO Users(user_name, user_email, user_password, user_date_of_birth, user_role_id, user_img)
    VALUES (in_user_name, in_user_email, encrypted_password, in_user_date_of_birth, in_user_role_id, in_user_img)
    RETURNING Users.user_id INTO user_id;
    RETURN user_id;
END;
$$;


SELECT Register('admin', 'admin', 'admin', '1995-01-01', 1, '\x1234567890ABCDEF');
select *from users

SELECT Register('ans', 'ans', 'ans', '1995-01-01', 2, '\x1234567890ABCDEF');
--------------------- Login user---------------------
CREATE OR REPLACE FUNCTION Login(in_user_email VARCHAR(255), in_user_password TEXT)
RETURNS BOOLEAN
AS $$
DECLARE
    stored_password TEXT;
BEGIN
    SELECT user_password INTO stored_password FROM Users WHERE user_email = in_user_email;
    
    IF stored_password IS NULL THEN
        RETURN FALSE;
    END IF;
    RETURN stored_password = encrypt_password(in_user_password);
END;
$$ LANGUAGE plpgsql;

SELECT Login('admin', 'admin');

select * from users


-------------------- Add Track --------------------
CREATE OR REPLACE FUNCTION AddTrack(
    in_track_title VARCHAR(255),
    in_track_date DATE,
    in_track_image BYTEA,
    in_track_content BYTEA,
    in_genre_id INTEGER
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    track_id INTEGER;
BEGIN
    INSERT INTO Track(track_title, track_date, track_image, track_content, genre_id)
    VALUES (in_track_title, in_track_date, in_track_image, in_track_content, in_genre_id)
    RETURNING Track.track_id INTO track_id;
   
    RETURN track_id;
END;
$$;



select AddTrack('Название трека', '2023-03-15', NULL, 'содержимое трека', 1);
CALL AddTrack('Название трека', '2023-03-15', NULL, 'содержимое трека', 1);
call AddUserTrack(3,1)

-------------------- Add Track user --------------------
CREATE OR REPLACE PROCEDURE AddUserTrack(
    in_user_id INTEGER,
    in_track_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO User_Track(user_id, track_id)
     VALUES (in_user_id, in_track_id);
END;
$$;
select * from user_track
-------------------- Add rating --------------------
CREATE OR REPLACE PROCEDURE add_rating(
    in_user_id INTEGER,
    in_track_id INTEGER,
    in_rate INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
  
    IF NOT EXISTS (SELECT 1 FROM Users WHERE user_id = in_user_id) THEN
        RAISE EXCEPTION 'User with id % does not exist', in_user_id;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM Track WHERE track_id = in_track_id) THEN
        RAISE EXCEPTION 'Track with id % does not exist', in_track_id;
    END IF;
    

    INSERT INTO Rating(user_id, track_id, rate)
    VALUES (in_user_id, in_track_id, in_rate);
END;
$$;


CALL add_rating(1, 4, 5);

delete from Rating;
select * from Rating;

-------------------- Create playlist --------------------
CREATE OR REPLACE FUNCTION CreatePlaylist(
    in_user_id INTEGER,
    in_title VARCHAR(255)
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    playlist_id INTEGER;
BEGIN
    INSERT INTO Playlist(user_id, title)
    VALUES (in_user_id, in_title)
    RETURNING Playlist.playlist_id INTO playlist_id;
    
    RETURN playlist_id;
END;
$$;
select CreatePlaylist(43,'mu list')
select createPlaylist(1, 'My Playlist');


select * from Playlist;

-------------------- Add track in playlist --------------------
CREATE OR REPLACE PROCEDURE add_track_to_playlist(
    in_track_id INTEGER,
    in_playlist_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Playlist_tracks(track_id, playlist_id)
    VALUES (in_track_id, in_playlist_id);
END;
$$;

CALL add_track_to_playlist(2,1);

select * from Playlist_tracks;

-------------------- Add track in library --------------------
CREATE OR REPLACE PROCEDURE add_track_to_library(
    in_user_id INTEGER,
    in_track_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Library_user(user_id, track_id) VALUES (in_user_id, in_track_id);
    
END;
$$;
call  add_track_to_library(1,1)
drop PROCEDURE add_track_to_library
select * from Library_user;


/*--------------------------——————————----------------------------
----------------------------| UPDATE |----------------------------
----------------------------——————————--------------------------*/

-------------------- Update user --------------------
CREATE OR REPLACE PROCEDURE update_user(in_user_id INTEGER,
										in_user_name VARCHAR(255), 
										in_user_date_of_birth DATE, 
										in_user_img BYTEA) 
										LANGUAGE plpgsql AS $$
BEGIN
    IF in_user_img IS NOT NULL THEN
        UPDATE Users
        SET user_name = in_user_name,
            user_date_of_birth = in_user_date_of_birth,
            user_img = in_user_img
        WHERE user_id = in_user_id;
    ELSE
        UPDATE Users
        SET user_name = in_user_name,
            user_date_of_birth = in_user_date_of_birth
        WHERE user_id = in_user_id;
    END IF;
END;
$$;


-------------------- Update user password --------------------

CREATE OR REPLACE PROCEDURE update_user_password(in_user_id INTEGER, in_user_password TEXT) LANGUAGE plpgsql AS $$
DECLARE
    encrypted_password TEXT := encrypt_password(in_user_password);
BEGIN
    UPDATE Users
    SET user_password = encrypted_password
    WHERE user_id = in_user_id;

END;
$$;



-------------------- Update track --------------------
CREATE OR REPLACE PROCEDURE update_track(
  in_track_id INTEGER,
  in_track_title VARCHAR(255),
  in_track_image BYTEA,
  in_genre_id INTEGER
) LANGUAGE plpgsql AS $$
BEGIN
 
  IF in_track_title IS NOT NULL THEN
    UPDATE Track
    SET
      track_title = in_track_title
    WHERE Track.track_id = in_track_id;
  END IF;

  IF in_track_image IS NOT NULL THEN
    UPDATE Track
    SET
      track_image = in_track_image
    WHERE Track.track_id = in_track_id;
  END IF;

  IF in_genre_id IS NOT NULL THEN
    UPDATE Track
    SET
      genre_id = in_genre_id
    WHERE Track.track_id = in_track_id;
  END IF;
  
END;
$$;

select * from track where track_id = 2
CALL update_track(2, NULL,NULL,NULL);

-------------------- Update track title --------------------
CREATE OR REPLACE PROCEDURE update_track_title(
  in_track_id INTEGER,
  in_track_title VARCHAR(255))
 LANGUAGE plpgsql AS $$
BEGIN
    UPDATE Track
    SET
      track_title = in_track_title
    WHERE Track.track_id = in_track_id;
END;
$$;
call update_track_title(4,'tst')
select * from track WHERE track.track_id =4
select user_id,title from playlist where playlist_id = 4
select *
from track CALL update_track(4, 'New Title', '2022-01-01', 1, NULL, 'new content', 3);

-------------------- Update playlist title --------------------
CREATE OR REPLACE PROCEDURE update_playlist
(in_playlist_id INTEGER,
 in_title VARCHAR(255)) 
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE Playlist SET title = in_title WHERE playlist_id = in_playlist_id;
END;
$$;

select * from playlist
/*--------------------------——————————----------------------------
----------------------------| DELETE |----------------------------
----------------------------——————————--------------------------*/

-------------------- Delete user --------------------
select * from 
track 

delete from track 
call delete_user(6)

CREATE OR REPLACE PROCEDURE delete_user(in_user_id INTEGER) LANGUAGE plpgsql AS $$
BEGIN


    DELETE FROM Rating WHERE user_id = in_user_id;
    DELETE FROM Library_user WHERE user_id = in_user_id;
    delete  from user_track where user_id = in_user_id;
    DELETE FROM Playlist_tracks WHERE playlist_id IN (SELECT playlist_id FROM Playlist WHERE user_id = in_user_id);
    DELETE FROM Playlist WHERE user_id = in_user_id;

    DELETE FROM Users WHERE user_id = in_user_id;
END;
$$;


select *
from users CALL delete_user(5);

-------------------- Delete track --------------------
CREATE OR REPLACE PROCEDURE delete_track( in_track_id INTEGER) LANGUAGE plpgsql AS $$
BEGIN

    DELETE FROM library_user WHERE track_id = in_track_id;
    DELETE FROM Rating WHERE track_id = in_track_id;

    DELETE FROM playlist_tracks WHERE track_id = in_track_id;
       delete  from user_track where track_id = in_track_id;
    DELETE FROM Track WHERE track_id = in_track_id;

END;
$$;
call delete_track(12)
SELECT * from track

-------------------- Delete track from playlist --------------------
CREATE OR REPLACE PROCEDURE remove_track_from_playlist
( in_playlist_id INTEGER, in_track_id INTEGER) 
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM playlist_tracks WHERE playlist_id = in_playlist_id AND track_id = in_track_id;
END;
$$;
call remove_track_from_playlist(11,4)

SELECT * FROM playlist_tracks
-------------------- Delete playlist --------------------
CREATE OR REPLACE PROCEDURE delete_playlist( in_playlist_id INTEGER) LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM Playlist_tracks WHERE playlist_id = in_playlist_id;

    DELETE FROM Playlist WHERE playlist_id = in_playlist_id;
END;
$$;
CALL delete_playlist(24)
select * from playlist
-------------------- Delete track from library --------------------
CREATE OR REPLACE PROCEDURE delete_track_from_library( user_id_param INTEGER, track_id_param INTEGER) AS $$
BEGIN
    DELETE FROM Library_user
    WHERE user_id = user_id_param AND track_id = track_id_param;
END;
$$ LANGUAGE plpgsql;
--------------------------------------------
CREATE OR REPLACE FUNCTION AddTracksToPlaylistHome(
    in_genre_name VARCHAR(255),
    in_user_id INTEGER,
    in_title VARCHAR(255)
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE

    playlistid INTEGER;
    track_info RECORD;
    trackid INTEGER;
    i INTEGER;
BEGIN
    -- Создать новый плейлист
    INSERT INTO Playlist(user_id, title)
    VALUES (in_user_id, in_title)
    RETURNING Playlist.playlist_id INTO playlistid;

    -- Добавить в него 10 лучших треков заданного жанра
    FOR track_info IN (
        SELECT *
        FROM all_info_track
        WHERE all_info_track.genre_name = in_genre_name
        ORDER BY all_info_track.avg_rating DESC
        LIMIT 10
    ) LOOP
        SELECT track_info.track_id INTO trackid;
        call add_track_to_playlist(trackid, playlistid);
    END LOOP;

    RETURN playlistid;
END;
$$;
select * from genre
SELECT AddTracksToPlaylistHome('Hip-Hop', 5, 'Car') AS playlist_id;

SELECT AddTracksToPlaylist(playlist_id, 'genre_name', user_id);