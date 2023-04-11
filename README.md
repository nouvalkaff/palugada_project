# Palugada Project

PALUGADA = aPALu maU Gua ADA

Sebuah proyek dari Mohamad Nouval Abdel Alkaf. Proyek ini mempunyai empat fitur andalan:

    1. Link Shrinker (penyingkat Link).
    2. Random Number Generator (Membuat satu set angka acak)
    3. Random Animal Generator (Membuat satu set nama hewan acak)
    4. Git Commit Maker (Pesan Git commit semudah copas)

## Authors

- [@nouvalkaff](https://github.com/nouvalkaff)

## Documentation

[Postman: Palugada Project](https://documenter.getpostman.com/view/23758510/2s8YKGifv5)

## Run Locally

Clone Palugada Project

```bash
  git clone https://github.com/nouvalkaff/palugada_project.git
```

Masuk ke direktori proyek

```bash
  cd palugada_project
```

Install dependencies

```bash
  npm install
```

Start server

```bash
  npm start
```

(Penggunaan fitur Link Shrinker) Eksekusi semua Postgres SQL query yang ada di palugada.sql di pgAdmin

```bash
  CREATE TABLE IF NOT EXISTS shrinkurl (
    id SERIAL PRIMARY KEY,
    originalLink varchar(2048) NOT NULL,
    uniqueChar varchar(255) NOT NULL,
    hit integer DEFAULT 0,
    createdAt timestamptz DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamptz NULL
);

CREATE INDEX UNIQCHAR_REFF ON shrinkurl (uniqueChar);
```
