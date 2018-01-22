INSERT INTO alarm (medicine_id, user_id, interval, start_date) VALUES ($1, $2, $3, $4);
SELECT * FROM alarm WHERE medicine_id = $1 AND user_id = $2;