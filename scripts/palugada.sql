CREATE TABLE IF NOT EXISTS shrinkurl (
    id SERIAL PRIMARY KEY,
    originalLink varchar(2048) NOT NULL,
    uniqueChar varchar(255) NOT NULL,
    hit integer DEFAULT 0,
    createdAt timestamptz DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamptz NULL
);