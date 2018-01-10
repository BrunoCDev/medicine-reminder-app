INSERT INTO medicine_users (email, password) VALUES ($1, $2);
SELECT * FROM medicine_users WHERE email = $1 AND password = $2;