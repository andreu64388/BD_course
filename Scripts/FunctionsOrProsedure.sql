/*--------------------------——————————----------------------------
----------------------------| CREATE |----------------------------
----------------------------——————————--------------------------*/

-------------------- Register user --------------------
CREATE OR REPLACE PROCEDURE Register(
    in_user_name VARCHAR(255),
    in_user_email VARCHAR(255),
    in_user_password TEXT,
    in_user_date_of_birth DATE,
    in_user_role_id INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    encrypted_password TEXT := encrypt_password(in_user_password);
    user_id INTEGER;
BEGIN
    INSERT INTO Users(user_name, user_email, user_password, user_date_of_birth, user_role_id)
    VALUES (in_user_name, in_user_email, encrypted_password, in_user_date_of_birth, in_user_role_id)
    RETURNING user_id INTO user_id;
END;
$$;

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

SELECT Login('andrysa.shev.133@gmail.com', 'mypassword');

select * from users;


-------------------- Add Track --------------------
CREATE OR REPLACE PROCEDURE AddTrack(
    in_track_title VARCHAR(255),
    in_track_date DATE,
    in_user_id INTEGER,
    in_track_image BYTEA,
    in_track_content BYTEA,
    in_genre_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Track(track_title, track_date, user_id, track_image, track_content, genre_id)
    VALUES (in_track_title, in_track_date, in_user_id, in_track_image, in_track_content, in_genre_id);
END;
$$;

CALL AddTrack('Название трека', '2023-03-15', 1, NULL, 'содержимое трека', 1);

select * from track
delete from track

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
CREATE OR REPLACE PROCEDURE createPlaylist(
    in_user_id INTEGER,
    in_title VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Playlist(user_id, title)
    VALUES (in_user_id, in_title);
END;
$$;

CALL createPlaylist(1, 'My Playlist');

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

CALL add_track_to_playlist(4,1);

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

drop PROCEDURE add_track_to_library
select * from Library_user ;


/*--------------------------——————————----------------------------
----------------------------| UPDATE |----------------------------
----------------------------——————————--------------------------*/

-------------------- Update user --------------------

CREATE OR REPLACE PROCEDURE update_user( in_user_id INTEGER, in_user_name VARCHAR(255), in_user_email VARCHAR(255), in_user_password TEXT, in_user_date_of_birth DATE, in_user_role_id INTEGER) LANGUAGE plpgsql AS $$
DECLARE
    encrypted_password TEXT := encrypt_password(in_user_password);
BEGIN
    UPDATE Users
    SET user_name = in_user_name,
        user_email = in_user_email,
        user_password = encrypted_password,
        user_date_of_birth = in_user_date_of_birth,
        user_role_id = in_user_role_id
    WHERE user_id = in_user_id;

END;
$$;


SELECT *
FROM USERS CALL update_user(1, 'John Doe', 'johndoe@example.com', 'newpassword', '1990-01-01', 1);


SELECT *
FROM USERS 

-------------------- Update track --------------------
CREATE OR REPLACE PROCEDURE update_track( in_track_id INTEGER, in_track_title VARCHAR(255), in_track_date DATE, in_user_id INTEGER, in_track_image BYTEA, in_track_content BYTEA, in_genre_id INTEGER) LANGUAGE plpgsql AS $$
BEGIN
    UPDATE Track
    SET
        track_title = in_track_title,
        track_date = in_track_date,
        user_id = in_user_id,
        track_image = in_track_image,
        track_content = in_track_content,
        genre_id = in_genre_id
    WHERE track_id = in_track_id;

END;
$$;


select *
from track CALL update_track(4, 'New Title', '2022-01-01', 1, NULL, 'new content', 3);

-------------------- Update playlist --------------------

CREATE OR REPLACE PROCEDURE update_playlist( in_playlist_id INTEGER, in_user_id INTEGER, in_title VARCHAR(255)) LANGUAGE plpgsql AS $$
BEGIN
    UPDATE Playlist SET title = in_title WHERE playlist_id = in_playlist_id AND user_id = in_user_id;
END;
$$;


select *
from playlist;


/*--------------------------——————————----------------------------
----------------------------| DELETE |----------------------------
----------------------------——————————--------------------------*/

-------------------- Delete user --------------------
CREATE OR REPLACE PROCEDURE delete_user( in_user_id INTEGER) LANGUAGE plpgsql AS $$
BEGIN

    DELETE FROM Rating WHERE user_id = in_user_id;

    DELETE FROM Track WHERE user_id = in_user_id;


    DELETE FROM Library_track WHERE library_id IN (SELECT library_id FROM Librarys WHERE user_id = in_user_id);
    DELETE FROM Librarys WHERE user_id = in_user_id;


    DELETE FROM Playlist_track WHERE playlist_id IN (SELECT playlist_id FROM Playlist WHERE user_id = in_user_id);
    DELETE FROM Playlist WHERE user_id = in_user_id;

    DELETE FROM Users WHERE user_id = in_user_id;
END;
$$;

CALL delete_user(123);

-------------------- Delete track --------------------
CREATE OR REPLACE PROCEDURE delete_track( in_track_id INTEGER) LANGUAGE plpgsql AS $$
BEGIN

    DELETE FROM Library_track WHERE track_id = in_track_id;


    DELETE FROM Rating WHERE track_id = in_track_id;

    DELETE FROM Track WHERE track_id = in_track_id;

END;
$$;

-------------------- Delete track from playlist --------------------
CREATE OR REPLACE PROCEDURE remove_track_from_playlist( in_playlist_id INTEGER, in_track_id INTEGER) LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM Playlist_track WHERE playlist_id = in_playlist_id AND track_id = in_track_id;
END;
$$;

-------------------- Delete playlist --------------------
CREATE OR REPLACE PROCEDURE delete_playlist( in_playlist_id INTEGER) LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM Playlist_track WHERE playlist_id = in_playlist_id;

    DELETE FROM Playlist WHERE playlist_id = in_playlist_id;
END;
$$;

-------------------- Delete track from library --------------------
CREATE OR REPLACE PROCEDURE delete_track_from_library( user_id_param INTEGER, track_id_param INTEGER) AS $$
BEGIN
    DELETE FROM Library_user
    WHERE user_id = user_id_param AND track_id = track_id_param;
END;
$$ LANGUAGE plpgsql;