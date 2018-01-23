INSERT INTO alarm (medicine_id, user_id, interval, start_date, display_date, display_time) VALUES ($1, $2, $3, $4, $5, $6);
SELECT * FROM alarm WHERE medicine_id = $1 AND user_id = $2;