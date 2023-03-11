/*--------------------------——————————----------------------------
----------------------------| SEARCH |----------------------------
----------------------------——————————--------------------------*/

-------------------- Get search tracks --------------------
CREATE OR REPLACE FUNCTION SearchTrackByTitleOrUserName(query_text VARCHAR)
RETURNS TABLE(track_id INTEGER, track_title VARCHAR, track_date DATE, user_id INTEGER, user_name VARCHAR, genre_name VARCHAR, track_image BYTEA, track_content BYTEA, avg_rating NUMERIC) AS $$
BEGIN
    RETURN QUERY
    SELECT t.track_id, t.track_title, t.track_date, t.user_id, u.user_name, g.genre_name, t.track_image, t.track_content, average_rating(t.track_id) AS avg_rating
    FROM Track t
    JOIN Users u ON t.user_id = u.user_id
    JOIN Genre g ON t.genre_id = g.genre_id
    WHERE t.track_title ILIKE '%' || query_text || '%'
    OR u.user_name ILIKE '%' || query_text || '%';
END;
$$ LANGUAGE plpgsql;

-------------------- Get search tracks by title --------------------
CREATE OR REPLACE FUNCTION GetPlaylistByTitle(title_query TEXT)
RETURNS TABLE(playlist_id INTEGER, user_id INTEGER, title TEXT)
AS $$
BEGIN
    RETURN QUERY SELECT playlist_id, user_id, title FROM Playlist WHERE title ILIKE '%' || title_query|| '%';
END;
$$ LANGUAGE plpgsql;
SELECT * FROM GetPlaylistByTitle('relaxing');


-------------------- Get search tracks by genres --------------------
CREATE OR REPLACE FUNCTION Filter_tracks_by_category(category_name text)
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
        FROM all_info_track 
        WHERE genre_name = category_name;
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
        FROM all_info_track
        ORDER BY track_date DESC;
END;
$$ LANGUAGE plpgsql;

-------------------- Sort by date --------------------
CREATE OR REPLACE FUNCTION SortTrackByDate()
RETURNS TABLE(
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
        FROM all_info_track
        ORDER BY track_date asc;
END;
$$ LANGUAGE plpgsql;

-------------------- Sort top tracks --------------------
CREATE OR REPLACE FUNCTION GetTrackOrderByRaiting()
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
        FROM all_info_track
        ORDER BY avg_rating DESC;
END;
$$ LANGUAGE plpgsql;


-------------------- INDEXES --------------------
CREATE INDEX idx_user_id ON Users (user_id);
CREATE INDEX idx_genre_id ON Genre (genre_id);
CREATE INDEX idx_playlist_user_id ON Playlist (user_id);
CREATE INDEX idx_library_user_id ON Library_user (user_id);
CREATE INDEX idx_library_track_id ON Library_user (track_id);