----------------------------------------
------------- TRIGGERS -----------------
----------------------------------------


---------------- USER ------------------


CREATE OR REPLACE FUNCTION check_date_of_birth() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.user_date_of_birth >= CURRENT_DATE THEN
        RAISE EXCEPTION 'Invalid date of birth';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_date_of_birth
BEFORE INSERT OR UPDATE ON Users
FOR EACH ROW
EXECUTE FUNCTION check_date_of_birth();



CREATE FUNCTION check_password_length() RETURNS trigger AS $$
BEGIN
  IF CHAR_LENGTH(NEW.user_password) < 6 THEN
    RAISE EXCEPTION 'Password must be at least 6 characters long';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_password_length
  BEFORE INSERT OR UPDATE ON Users
  FOR EACH ROW
  EXECUTE FUNCTION check_password_length();


---------------- TRACK ------------------
CREATE FUNCTION check_track_date() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.track_date > CURRENT_DATE THEN
        RAISE EXCEPTION 'The track date cannot be in the future.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_track_date
BEFORE INSERT OR UPDATE ON Track
FOR EACH ROW
EXECUTE FUNCTION check_track_date();

---------------- RATING ------------------
CREATE OR REPLACE FUNCTION check_rating_range() 
RETURNS TRIGGER AS $$ 
BEGIN 
    IF NEW.rate < 1 OR NEW.rate > 10 THEN 
        RAISE EXCEPTION 'Rating value must be between 1 and 10'; 
    END IF; 
    RETURN NEW; 
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_rating_range 
BEFORE INSERT OR UPDATE ON Rating 
FOR EACH ROW 
EXECUTE FUNCTION check_rating_range();
