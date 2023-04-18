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
    role_name VARCHAR(255)
)
AS $$
BEGIN
   RETURN QUERY SELECT *
                 FROM all_info_user
				 order by all_info_user.user_id;
END;
$$ LANGUAGE plpgsql;

SELECT * from GetUsers();

-------------------- Get user --------------------
CREATE OR REPLACE FUNCTION GetUserById(userId INTEGER)
RETURNS TABLE (
    user_id INTEGER,
    user_name VARCHAR(255),
    user_img BYTEA,
    user_email VARCHAR(255),
    user_password VARCHAR(255),
    user_date_of_birth DATE,
    role_name VARCHAR(255)
)
AS $$
BEGIN
    RETURN QUERY SELECT *
                 FROM all_info_user
                 WHERE all_info_user.user_id = userId;
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
	user_img BYTEA,
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC
	
)
AS $$
BEGIN
    RETURN QUERY SELECT *
                 FROM all_info_track
				 order by all_info_track.track_id;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM GetTracks();

-------------------- Get tracks user_name  --------------------
CREATE OR REPLACE FUNCTION get_users_from_track(track_id_in INTEGER)
RETURNS TABLE (
    user_id INTEGER,
    user_name VARCHAR(255),
    user_img BYTEA,
    user_email VARCHAR(255),
    user_password VARCHAR(255),
    user_date_of_birth DATE,
    role_name VARCHAR(255)
)
AS $$
DECLARE
    user_ids INTEGER[];
BEGIN
    SELECT array_agg(User_Track.user_id) INTO user_ids FROM User_Track WHERE User_Track.track_id = track_id_in;
    RETURN QUERY SELECT * FROM ALL_INFO_USER WHERE ALL_INFO_USER.USER_ID = ANY(user_ids);
END;
$$ LANGUAGE plpgsql;

-------------------- Get tracks user --------------------
CREATE OR REPLACE FUNCTION GetTracksUser(userid INTEGER)
RETURNS TABLE (
    track_id INTEGER,
    track_title VARCHAR(255),
    track_date DATE,
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC
	
)
AS $$
DECLARE
   tracks_id INTEGER[];
BEGIN
    SELECT array_agg(User_Track.track_id) INTO tracks_id FROM User_Track WHERE User_Track.user_id = userid;
    RETURN QUERY SELECT * FROM ALL_INFO_TRACK WHERE ALL_INFO_TRACK.TRACK_ID = ANY(TRACKS_id);
END;
$$ LANGUAGE plpgsql;
select * from  GetTracksUser(5)

-------------------- Get track --------------------
	CREATE OR REPLACE FUNCTION GetTrackById(trackId INTEGER)
	RETURNS TABLE (
    track_id INTEGER,
    track_title VARCHAR(255),
    track_date DATE,
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC
	)
	AS $$
	BEGIN
		RETURN QUERY SELECT  *
			FROM all_info_track WHERE all_info_track.track_id = trackId;
	END;
	$$ LANGUAGE plpgsql;
select * from get_recent_tracks(4)
SELECT * FROM GetPlaylistTracksByID(1);

-------------------- Get Playlist Tracks By ID --------------------
CREATE OR REPLACE FUNCTION GetPlaylistTracksByID(playlistId INTEGER)
RETURNS TABLE (
    track_id INTEGER,
    track_title VARCHAR(255),
    track_date DATE,
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC
)
AS $$
DECLARE
    track_ids INTEGER[];
BEGIN
    SELECT array_agg(Playlist_tracks.track_id) INTO track_ids
    FROM Playlist_tracks WHERE Playlist_tracks.playlist_id = playlistId;
    
    RETURN QUERY SELECT *
        FROM all_info_track
        WHERE all_info_track.track_id = ANY(track_ids);
END;
$$ LANGUAGE plpgsql;


select * from playlist_tracks
select * from GetPlaylistTracksByID(1)

-------------------- Get Playlist  By ID user --------------------
CREATE OR REPLACE FUNCTION GetAllPlayListByUserId(userId INTEGER)
RETURNS TABLE (
    playlist_id INTEGER, 
    user_id INTEGER,
    title VARCHAR(255)
)
AS $$
BEGIN
    RETURN QUERY SELECT *
                 FROM Playlist
                 WHERE Playlist.user_id = userId;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM GetAllPlayListByUserId(44);
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
CREATE OR REPLACE FUNCTION GetTrackFromLibraryByUserID(userid INTEGER)
RETURNS TABLE (
    track_id INTEGER,
    track_title VARCHAR(255),
    track_date DATE,
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC
	
)
AS $$
DECLARE
   tracks_id INTEGER[];
BEGIN
    SELECT array_agg(Library_user.track_id) INTO tracks_id FROM Library_user WHERE Library_user.user_id = userid;
    RETURN QUERY SELECT * FROM ALL_INFO_TRACK WHERE ALL_INFO_TRACK.TRACK_ID = ANY(TRACKS_id);
END;
$$ LANGUAGE plpgsql;

select * from GetTrackFromLibraryByUserID(1)

select * from rating

-------------------- Get Rating Users --------------------
CREATE OR REPLACE FUNCTION GetRatingUsers(trackid INTEGER) 
RETURNS TABLE (user_id INTEGER) AS $$
BEGIN
  RETURN QUERY SELECT Rating.user_id FROM Rating WHERE Rating.track_id = trackid;
END;
$$ LANGUAGE plpgsql;
select * from  rating

-------------------- Get genres --------------------
CREATE OR REPLACE FUNCTION create_genre_playlist( in_user_id INTEGER, in_title VARCHAR(255), in_genre VARCHAR(255)) RETURNS INTEGER LANGUAGE plpgsql AS $$
DECLARE
    playlist_id INTEGER;
BEGIN
    -- Создаем новый плейлист
    INSERT INTO Playlist(user_id, title)
    VALUES (in_user_id, in_title)
    RETURNING Playlist.playlist_id INTO playlist_id;

    -- Добавляем 10 песен в плейлист по заданному жанру и рейтингу
    INSERT INTO Playlist_tracks(track_id, playlist_id)
    SELECT t.track_id, playlist_id
    FROM (
        SELECT track_id, genre, rating
        FROM Track
        WHERE Track.genre_name = in_genre
        ORDER BY rating DESC
        LIMIT 10
    ) t;

    RETURN playlist_id;
END;
$$;


select *
from users
SELECT *
FROM GetAllPlayListByUserId(1)

-------------------- Get new tracks --------------------
CREATE OR REPLACE FUNCTION get_recent_tracks(num_tracks INTEGER)
RETURNS TABLE (
    track_id INTEGER,
    track_title VARCHAR(255),
    track_date DATE,
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC
)
AS $$
BEGIN
  RETURN QUERY SELECT *
FROM all_info_track
ORDER BY all_info_track.track_date DESC, all_info_track.track_id DESC
          LIMIT num_tracks;
END;
$$ LANGUAGE plpgsql;



select * from playlist
select * from get_recent_tracks(5)
--------------------------------------------------------
--------------------------------------------------------
--------------------------------------------------------