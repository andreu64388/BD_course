--------------------- Tablespace ---------------------------
CREATE TABLESPACE TS_USER LOCATION 'E:/POSTGRESQL/14/DATA/DBS/TS_USER';
CREATE TABLESPACE TS_TRACK LOCATION 'E:/POSTGRESQL/14/DATA/DBS/TS_TRACK';
CREATE TABLESPACE TS_PLAYLIST LOCATION 'E:/POSTGRESQL/14/DATA/DBS/TS_PLAYLIST';
CREATE TABLESPACE TS_LIBRARY LOCATION 'E:/POSTGRESQL/14/DATA/DBS/TS_LIBRARY';

/*---------------------————————————————---------------------
-----------------------| CREATE TABLES |--------------------
------------------------————————————————-------------------*/

--------------------- Table Role ----------------------
CREATE TABLE Role (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
) TABLESPACE ts_user;

--------------------- Table Users ----------------------
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_img BYTEA,
    user_email VARCHAR(255) UNIQUE NOT NULL,    
    user_password VARCHAR(255) NOT NULL,
    user_date_of_birth DATE,
    user_role_id INTEGER,
    CONSTRAINT fk_user_role FOREIGN KEY (user_role_id) REFERENCES Role (role_id)
) TABLESPACE ts_user;

--------------------- Table Genre ----------------------
CREATE TABLE Genre (
    genre_id SERIAL PRIMARY KEY,
    genre_name VARCHAR(255) NOT NULL
) TABLESPACE ts_track;

--------------------- Table Track ----------------------
CREATE TABLE Track (
    track_id SERIAL PRIMARY KEY,
    track_title VARCHAR(255) NOT NULL,
    track_date DATE NOT NULL,
    track_image BYTEA,
    track_content BYTEA NOT NULL,
    genre_id INTEGER NOT NULL,
    CONSTRAINT fk_track_genre FOREIGN KEY (genre_id) REFERENCES Genre (genre_id)
) TABLESPACE ts_track;
--------------------- Table User_track ----------------------
CREATE TABLE User_Track (
    user_id INTEGER NOT NULL,
    track_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, track_id),
    CONSTRAINT fk_user_track_user FOREIGN KEY (user_id) REFERENCES Users (user_id),
    CONSTRAINT fk_user_track_track FOREIGN KEY (track_id) REFERENCES Track (track_id)
) TABLESPACE ts_track;
--------------------- Table Rating----------------------
CREATE TABLE Rating (
    rating_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    track_id INTEGER NOT NULL,
    rate INTEGER NOT NULL,
    CONSTRAINT fk_rating_user FOREIGN KEY (user_id) REFERENCES Users (user_id),
    CONSTRAINT fk_rating_track FOREIGN KEY (track_id) REFERENCES Track (track_id)
) TABLESPACE ts_track;

--------------------- Table Playlist ----------------------
CREATE TABLE Playlist (
    playlist_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    CONSTRAINT fk_playlist_user FOREIGN KEY (user_id) REFERENCES Users (user_id)
) TABLESPACE ts_playlist;

--------------------- Table Playlist_tracks ----------------------
CREATE TABLE Playlist_tracks (
    id SERIAL PRIMARY KEY,
    track_id INTEGER NOT NULL,
    playlist_id INTEGER NOT NULL,
    CONSTRAINT fk_playlist_tracks_track FOREIGN KEY (track_id) REFERENCES Track (track_id),
    CONSTRAINT fk_playlist_tracks_playlist FOREIGN KEY (playlist_id) REFERENCES Playlist (playlist_id)
) TABLESPACE ts_playlist;

--------------------- Table Library_user ----------------------
CREATE TABLE Library_user (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    track_id INTEGER NOT NULL,
    CONSTRAINT fk_library_track_user FOREIGN KEY (user_id) REFERENCES Users (user_id),
    CONSTRAINT fk_library_track_track FOREIGN KEY (track_id) REFERENCES Track (track_id)
) TABLESPACE ts_library;
--------------------- End ----------------------