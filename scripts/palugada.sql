CREATE TABLE IF NOT EXISTS shrinkurl (
    originalLink varchar(2048) NOT NULL,
    uniqueChar varchar(255) NOT NULL,
    hit integer DEFAULT 0,
    createdAt timestamp DEFAULT GETDATE(),
    updatedAt timestamp NULL
);