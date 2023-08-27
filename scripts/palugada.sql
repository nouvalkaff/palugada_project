CREATE TABLE IF NOT EXISTS shrinkurl (
    id SERIAL PRIMARY KEY,
    originalLink varchar(2048) NOT NULL,
    uniqueChar varchar(255) NOT NULL,
    hit integer DEFAULT 0,
    createdAt timestamptz DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamptz NULL
);

CREATE INDEX UNIQCHAR_REFF ON shrinkurl (uniqueChar);

CREATE TABLE IF NOT EXISTS user_fidyah (
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_num VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);