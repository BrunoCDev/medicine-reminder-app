INSERT INTO colors (first, second, third, button, card, textcolor, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7);
SELECT * FROM colors WHERE user_id = $7;
