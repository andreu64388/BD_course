/*--------------------------——————————----------------------------
----------------------------| SEARCH |----------------------------
----------------------------——————————--------------------------*/

-------------------- Get search tracks --------------------
CREATE OR REPLACE FUNCTION search_track_by_title_or_user_name(query_text VARCHAR) RETURNS TABLE( track_id INTEGER, track_title VARCHAR, track_date DATE, genre_name VARCHAR, track_image BYTEA, track_content BYTEA, avg_rating NUMERIC) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.track_id,
        t.track_title,
        t.track_date,
        g.genre_name,
        t.track_image,
        t.track_content,
        average_rating(t.track_id) AS avg_rating
    FROM
        Track t
        JOIN Genre g ON t.genre_id = g.genre_id
        LEFT JOIN User_Track ut ON t.track_id = ut.track_id
        LEFT JOIN Users u ON ut.user_id = u.user_id
    WHERE
        t.track_title ILIKE '%' || query_text || '%'
        OR u.user_name ILIKE '%' || query_text || '%';
END;
$$ LANGUAGE plpgsql;
select *
from search_track_by_title_or_user_name('i')
-------------------- Get search tracks by title --------------------
CREATE OR REPLACE FUNCTION GetPlaylistByTitle(title_query TEXT)
RETURNS TABLE(playlist_id INTEGER, user_id INTEGER, title VARCHAR(255))
AS $$
BEGIN
    RETURN QUERY 
    SELECT Playlist.playlist_id, Playlist.user_id, Playlist.title 
    FROM Playlist 
    WHERE Playlist.title ILIKE '%' || title_query|| '%' 
    AND EXISTS (
        SELECT 1 FROM playlist_tracks WHERE playlist_tracks.playlist_id = Playlist.playlist_id
    );
END;
$$ LANGUAGE plpgsql;

-------------------- Get search search user name --------------------
CREATE OR REPLACE FUNCTION search_user_name(query_text VARCHAR)
RETURNS TABLE(
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
    RETURN QUERY
    SELECT
      *
    FROM all_info_user
    WHERE all_info_user.user_name ILIKE '%' || query_text || '%';
END;
$$ LANGUAGE plpgsql;
/*--------------------------——————————---------------------------
-----------------------------| SORT |----------------------------
----------------------------——————————--------------------------*/


-------------------- Sort by date desc --------------------
CREATE OR REPLACE FUNCTION SortTrackByDateDesc()
RETURNS TABLE(
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
        ORDER BY all_info_track.track_date DESC;
END;
$$ LANGUAGE plpgsql;

-------------------- Sort top tracks --------------------
SELECT* FROM  GetTrackByRaiting(5)
CREATE OR REPLACE FUNCTION GetTrackByRaiting(limit_track integer)
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
        ORDER BY avg_rating DESC
		LIMIT limit_track;
END;
$$ LANGUAGE plpgsql;


-------------------- INDEXES --------------------
CREATE INDEX idx_user_name on users(user_name);
CREATE INDEX IDX_TITLE ON TRACK(track_title);
CREATE INDEX idx_user_id ON Users(user_id);
CREATE INDEX idx_genre_id ON Genre(genre_id);
CREATE INDEX idx_playlist_user_id ON Playlist(user_id);
CREATE INDEX idx_library_user_id ON Library_user(user_id);
CREATE INDEX idx_library_track_id ON Library_user(track_id);
CREATE INDEX idx_user_track_user_id ON User_Track(user_id);
CREATE INDEX idx_user_track_track_id ON User_Track(track_id);
CREATE INDEX idx_rating_user_id ON Rating(user_id);
CREATE INDEX idx_rating_track_id ON Rating(track_id);
CREATE INDEX idx_playlist_tracks_track_id ON Playlist_tracks(track_id);
CREATE INDEX idx_playlist_tracks_playlist_id ON Playlist_tracks(playlist_id);
-------------------------------------------------