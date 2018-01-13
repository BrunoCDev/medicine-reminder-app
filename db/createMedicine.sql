INSERT INTO medicine (name, image, description, rxcuis, user_id) VALUES ($1, $2, $3, $4, $5);
SELECT * FROM medicine WHERE user_id = $5;