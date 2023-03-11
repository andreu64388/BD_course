/*--------------------------——————----------------------------
----------------------------| GET |---------------------------
----------------------------——————--------------------------*/


-------------------- Get users --------------------
CREATE OR REPLACE FUNCTION GetUsers()
RETURNS TABLE (
    user_id INTEGER,
    user_name VARCHAR(255),
    user_img BYTEA,
    user_email VARCHAR(255),
    user_password VARCHAR(255),
    user_date_of_birth DATE,
    role_name VARCHAR(255),
    library_id INTEGER,
    playlist_id INTEGER,
    title VARCHAR(255)
)
AS $$
BEGIN
    RETURN QUERY SELECT *
                 FROM all_info_user;
END;
$$ LANGUAGE plpgsql;

SELECT * from GetUsers();

-------------------- Get user --------------------
CREATE OR REPLACE FUNCTION getUserById(userId INTEGER)
RETURNS TABLE (
    user_id INTEGER,
    user_name VARCHAR(255),
    user_img BYTEA,
    user_email VARCHAR(255),
    user_password VARCHAR(255),
    user_date_of_birth DATE,
    role_name VARCHAR(255),
    library_id INTEGER,
    playlist_id INTEGER,
    title VARCHAR(255)
)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM all_info_user
                 WHERE user_id = userId;
END;
$$ LANGUAGE plpgsql;
SELECT * FROM getUserById(1);

-------------------- Get tracks --------------------
CREATE OR REPLACE FUNCTION GetTracks()
RETURNS TABLE (
    track_id INTEGER,
    track_title VARCHAR(255),
    track_date DATE,
    user_name VARCHAR(255),
    user_id INTEGER,
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC
)
AS $$
BEGIN
    RETURN QUERY SELECT *
                 FROM all_info_track;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM GetTracks();
-------------------- Get track --------------------
CREATE OR REPLACE FUNCTION GetTrackById(trackId INTEGER)
RETURNS TABLE (
    track_id INTEGER,
    track_title VARCHAR(255),
    track_date DATE,
    user_name VARCHAR(255),
    user_id INTEGER,
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC
)
AS $$
BEGIN
    RETURN QUERY SELECT *
        FROM all_info_track WHERE track_id = trackId;
END;
$$ LANGUAGE plpgsql;


SELECT * FROM GetTrackById(4);
-------------------- Get Playlist Tracks By ID --------------------
CREATE OR REPLACE FUNCTION GetPlaylistTracksByID(playlistId INTEGER)
RETURNS TABLE (
    track_id INTEGER,
    track_title VARCHAR(255),
    track_date DATE,
    user_name VARCHAR(255),
    user_id INTEGER,
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC,
    playlist_id INTEGER
)
AS $$
BEGIN
    RETURN QUERY SELECT *
        FROM playlist_tracks_info WHERE playlist_id = playlistId;
END;
$$ LANGUAGE plpgsql;

-------------------- Get Playlist  By ID user --------------------
CREATE OR REPLACE FUNCTION GetAllPlayListByUserId(userId INTEGER)
RETURNS TABLE (
    playlist_id INTEGER, 
    user_id INTEGER,
    title VARCHAR(255)
)
AS $$
BEGIN
    RETURN QUERY SELECT playlist_id, user_id, title
                 FROM Playlist
                 WHERE user_id = userId;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM GetAllPlayListByUserId(4);
select * from playlist
-------------------- Get Playlists --------------------
CREATE OR REPLACE FUNCTION GetAllPlaylists()
RETURNS TABLE (
 playlist_id INTEGER,
    user_id INTEGER,
    title VARCHAR(255)
)
AS $$
BEGIN
    RETURN QUERY SELECT *
                 FROM Playlist;
                 
END;
$$ LANGUAGE plpgsql;

SELECT * FROM GetAllPlaylists();
-------------------- Get Track From Library By UserID --------------------
CREATE FUNCTION GetTrackFromLibraryByUserID(user_id INTEGER)
RETURNS TABLE (
    track_id INTEGER,
    track_title VARCHAR(255),
    track_date DATE,
    user_name VARCHAR(255),
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC
) AS $$
BEGIN
    RETURN QUERY SELECT 
        lit.track_id, 
        ait.track_title, 
        ait.track_date, 
        ait.user_name, 
        ait.genre_name, 
        ait.track_image, 
        ait.track_content, 
        ait.avg_rating
    FROM Library_user AS lit
    JOIN all_info_track AS ait
        ON lit.track_id = ait.track_id
    WHERE lit.user_id = user_id;
END;
$$ LANGUAGE plpgsql;