/*---------------------------——————————----------------------------
----------------------------| FUNCTIONS |-------------------------
-----------------------------——————————--------------------------*/

----------------------- encrypt password -----------------------
CREATE OR REPLACE FUNCTION encrypt_password(password TEXT)
RETURNS TEXT
AS $$
DECLARE
    i INTEGER := 1;
    key TEXT := '323232'; --key 
    key_length INTEGER := LENGTH(key);
    encrypted_password TEXT := '';
BEGIN
    IF password IS NULL THEN
        RETURN NULL;
    END IF;
    FOR i IN 1..LENGTH(password) LOOP
       encrypted_password := encrypted_password || CHR(ASCII(SUBSTRING(password, i, 1)) # ASCII(SUBSTRING(key, i % key_length + 1, 1)));
    END LOOP;
    RETURN encrypted_password;
END;
$$ LANGUAGE plpgsql;


----------------------- decrypt password -----------------------
CREATE OR REPLACE FUNCTION decrypt_password(encrypted_password TEXT)
RETURNS TEXT
AS $$
DECLARE
    i INTEGER := 1;
    key TEXT := '323232';
    key_length INTEGER := LENGTH(key);
    password TEXT := '';
BEGIN
    IF encrypted_password IS NULL THEN
        RETURN NULL;
    END IF;
    FOR i IN 1..LENGTH(encrypted_password) LOOP
       password := password || CHR(ASCII(SUBSTRING(encrypted_password, i, 1)) # ASCII(SUBSTRING(key, i % key_length + 1, 1)));
    END LOOP;
    RETURN password;
END;
$$ LANGUAGE plpgsql;


----------------------- average rating -----------------------
CREATE OR REPLACE FUNCTION average_rating(track_id INTEGER) RETURNS NUMERIC AS $$
DECLARE
  total_rating INTEGER;
  num_ratings INTEGER;
BEGIN
  SELECT SUM(rate), COUNT(*) INTO total_rating, num_ratings
  FROM Rating
  WHERE Rating.track_id = $1;

  IF num_ratings = 0 THEN
    RETURN 0;
  END IF;

  RETURN total_rating::NUMERIC / num_ratings;
END;
$$ LANGUAGE plpgsql;