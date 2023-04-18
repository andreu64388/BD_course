/*---------------------————————————————---------------------
-----------------------| INSERT TABLES |--------------------
------------------------————————————————-------------------*/
INSERT INTO Role (role_name) VALUES ('user');
INSERT INTO Role (role_name) VALUES ('admin');


/*Роль "user" предназначена для обычных пользователей, которые могут
добавлять и просматривать музыкальные треки, создавать плейлисты и
использовать другие функции системы, предоставленные для обычных
пользователей.
Роль "admin" предназначена для администраторов системы,
которые имеют более широкие права доступа и могут управлять пользователями, 
треками, плейлистами и другими функциями системы.*/

INSERT INTO Genre (genre_name) VALUES
('Rock'),
('Pop'),
('Hip-Hop'),
('Jazz'),
('Electronic'),
('Classical'),
('Folk'),
('R&B'),
('Country'),
('Reggae');
--------------- INSERT 100000 --------------- 
CREATE OR REPLACE FUNCTION INSERT_GENRES()
RETURNS VOID AS $$
DECLARE
    I INTEGER := 1;
BEGIN
    WHILE I <= 100000 LOOP
        INSERT INTO GENRE (GENRE_NAME) VALUES ('GENRE ' || I);
        I := I + 1;
    END LOOP;
END;
$$ LANGUAGE PLPGSQL;

SELECT INSERT_GENRES();
SELECT * FROM GENRE
