DROP TABLE IF EXISTS txns;

CREATE TABLE IF NOT EXISTS txns (
    id SERIAL PRIMARY KEY,
    from_ens TEXT NOT NULL,
    to_ens TEXT NOT NULL,
    bubble_amount INTEGER NOT NULL CHECK (bubble_amount > 0),
    usd_amount NUMERIC(12, 2) NOT NULL CHECK (usd_amount > 0),
    message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);