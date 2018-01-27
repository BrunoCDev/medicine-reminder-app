UPDATE colors
SET first = $1, second = $2, third = $3, button = $4, card = $5, textcolor = $6, footer_icon = $7
WHERE user_id = $8;

SELECT * FROM colors WHERE user_id = $8;