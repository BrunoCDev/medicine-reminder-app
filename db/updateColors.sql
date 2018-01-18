UPDATE colors
SET first = $1, second = $2, third = $3, button = $4, card = $5, textcolor = $6
WHERE user_id = $7;

SELECT * FROM colors WHERE user_id = $7;