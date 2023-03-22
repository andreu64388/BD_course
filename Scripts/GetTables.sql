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

select *from track 
where user_id = 44
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



SELECT * FROM getUserById(5);



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

-------------------- Get tracks user --------------------
CREATE OR REPLACE FUNCTION GetTracksUser(userid INTEGER)
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
                 WHERE all_info_track.user_id = userid;
END;
$$ LANGUAGE plpgsql;

-------------------- Get track --------------------

	CREATE OR REPLACE FUNCTION GetTrackById(trackId INTEGER)
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
			FROM all_info_track WHERE all_info_track.track_id = trackId;
	END;
	$$ LANGUAGE plpgsql;

SELECT * FROM GetTrackById(12);
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
        FROM playlist_tracks_info WHERE playlist_tracks_info.playlist_id = playlistId;
END;
$$ LANGUAGE plpgsql;


select * from playlist_tracks
select * from GetPlaylistTracksByID(2)
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
    user_name VARCHAR(255),
    genre_name VARCHAR(255),
    track_image BYTEA,
    track_content BYTEA,
    avg_rating NUMERIC,
	user_id INTEGER
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
        ait.avg_rating,
			ait.user_id
    FROM Library_user AS lit
    JOIN all_info_track AS ait
        ON lit.track_id = ait.track_id
    WHERE lit.user_id = userid;
END;
$$ LANGUAGE plpgsql;

select * from GetTrackFromLibraryByUserID(46)

select * from rating

-------------------- Get Rating Users --------------------
CREATE OR REPLACE FUNCTION GetRatingUsers(trackid INTEGER) 
RETURNS TABLE (user_id INTEGER) AS $$
BEGIN
  RETURN QUERY SELECT Rating.user_id FROM Rating WHERE Rating.track_id = trackid;
END;
$$ LANGUAGE plpgsql;
-------------------- Get genres --------------------
CREATE OR REPLACE FUNCTION GetTracksByGenre(genre VARCHAR(255))
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
                 WHERE all_info_track.genre_name = genre
                 ORDER BY all_info_track.avg_rating DESC
                 LIMIT 10;
END;
$$ LANGUAGE plpgsql;
select * from  GetTracksByGenre('Folk')

select * from GetRatingUsers(19)



select * from GetRatingUsers(19)


CREATE OR REPLACE FUNCTION create_genre_playlist(
    in_user_id INTEGER,
    in_title VARCHAR(255),
    in_genre VARCHAR(255)
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
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

select * from users
-------------------- Get new tracks --------------------
CREATE OR REPLACE FUNCTION get_recent_tracks(num_tracks INTEGER)
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
) AS $$
BEGIN
    RETURN QUERY SELECT *
        FROM all_info_track
        ORDER BY track_date DESC
        LIMIT num_tracks;
END;
$$ LANGUAGE plpgsql;


select * from get_recent_tracks(10)