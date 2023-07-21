# Palugada Project

PALUGADA = aPALu maU Gua ADA

```
  NodeJS version 16.20.0 or up
```

An API project by Mohamad Nouval Abdel Alkaf. This API has seven features available:

    1. Link Shrinker (Shorten your really long link / URL to only three unique characters).
    2. Random Number Generator (Generate you a set of random number variation).
    3. Random Animal Generator (Generate you a set of random animal name variation).
    4. Git Commit Maker (Ease you in creating GIT commit message in list format).
    5. Username Generator (Generate you an unexpected username for social media or game in swift manner).
    6. Fidyah Calculator (Calculate your fidyah as easy as clicking a button).
    7. Title Fixer (Benerin judul karya ilmiahmu sesuai dengan PUEBI - Pedoman Umum Ejaan Bahasa Indonesia)

## Authors

- [M Nouval A Alkaf - LinkedIn](https://www.linkedin.com/in/nouvalkaff/)
- [@nouvalkaff - Github](https://github.com/nouvalkaff)
- [@nouvalkaf - Instagram](https://www.instagram.com/nouvalkaf/)

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

## API Reference

#### Link Shrinker

##### 1. Shrinker

```http
  GET /api/palugada/shrinker/doit
```

| Query    | Type     | Description                                     |
| :------- | :------- | :---------------------------------------------- |
| `simple` | `string` | **Required**. 0 = false & 1 = true              |
| `url`    | `string` | **Required**. Change 'XYZ' with really long URL |

##### 2. Redirect

```http
  GET /{shrinkedURL}
```

##### 3. Get All

```http
  GET /api/palugada/shrinker/all
```

| Params      | Type     | Description   |
| :---------- | :------- | :------------ |
| `secretKey` | `string` | **Required**. |

##### 4. Delete URL by ID

```http
  DELETE /api/palugada/shrinker/delete
```

| Params      | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `secretKey` | `string` | **Required**.                             |
| `id`        | `string` | **Required**. Use ',' as the ID separator |

#### Generate Random Set of Number

##### 1. Generate Number

```http
  GET /api/palugada/rgnum/generate
```

| Query         | Type     | Description                                                      |
| :------------ | :------- | :--------------------------------------------------------------- |
| `random`      | `string` | **Required**. 0 = in order, 1 = randomize                        |
| `arr`         | `string` | **Required**. 0 = string, 1 = with array                         |
| `withzero`    | `string` | **Required**. 0 = no zero, 1 = with zero                         |
| `maxnum`      | `string` | **Required**. max limit (maximum input 10,000)                   |
| `length`      | `string` | **Required**. n numbers for random process (maximum input 2,000) |
| `sort`        | `string` | **Required**. 0 = false, 1 = true                                |
| `sorttype`    | `string` | **Required**. ASC = go up, DESC = go down                        |
| `allowduplic` | `string` | **Required**. 0= not allow, 1 = allow                            |

#### Generate Random Set of Animal Name(s)

##### 1. Generate Animal

```http
  GET /api/palugada/rgani/generate
```

| Query         | Type     | Description                                       |
| :------------ | :------- | :------------------------------------------------ |
| `arr`         | `string` | **Required**. 0 = string, 1 = with array          |
| `language`    | `string` | **Required**. id = bahasa indonesia, en = english |
| `length`      | `string` | **Required**. n animal(s)                         |
| `letter`      | `string` | **Required**. caps, upper, lower                  |
| `sort`        | `string` | **Required**. 0 = false, 1 = true                 |
| `sorttype`    | `string` | **Required**. ASC = go up, DESC = go down         |
| `allowduplic` | `string` | **Required**. 0= not allow, 1 = allow             |

#### Git Commit Maker

##### 1. Create Git Commit

```http
  POST /api/palugada/commiter/make-git-commit
```

| Query      | Type     | Description                                                     |
| :--------- | :------- | :-------------------------------------------------------------- |
| `useStep`  | `string` | **Required**. 0 = false, 1 = true                               |
| `bullet`   | `string` | **Required**. number, arrowTail0, arrowTail1, arrowTail2, point |
| `oneLiner` | `string` | **Required**. 0 = false, 1 = true                               |

| Body            | Type     | Description                                                                                                                                          |
| :-------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `branch`        | `string` | **Required**. Pushed branch name                                                                                                                     |
| `commitMessage` | `object` | **Required**. Detail of commit message. Maximum is five. Example: { "message1": "", "message2": "", "message3": "", "message4": "", "message5": "" } |
| `headMessage`   | `string` | **Optional**. Set header message                                                                                                                     |

#### Username Generator

##### 1. Username Generator

```http
  GET /api/palugada/usergen/generate
```

| Query          | Type     | Description                                   |
| :------------- | :------- | :-------------------------------------------- |
| `preset`       | `string` | **Required**. string input as username preset |
| `useConnector` | `string` | **Required**. 0 = false, 1 = true             |
| `firstSet`     | `string` | **Required**. caps, upper, lower              |
| `simple`       | `string` | **Required**. 0 = false, 1 = true             |

#### Smart Commit Maker

##### 1. Smart Commit Maker

```http
  POST /api/palugada/commiter/make-smart-commit
```

| Query      | Type     | Description                                                     |
| :--------- | :------- | :-------------------------------------------------------------- |
| `useStep`  | `string` | **Required**. 0 = false, 1 = true                               |
| `bullet`   | `string` | **Required**. number, arrowTail0, arrowTail1, arrowTail2, point |
| `oneLiner` | `string` | **Required**. 0 = false, 1 = true                               |

| Body            | Type     | Description                                                                                                                                    |
| :-------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `branch`        | `string` | **Required**. Pushed branch name                                                                                                               |
| `headComment`   | `object` | **Required**. Detail of commit message. Maximum is five. Example: { "issueKey":[],"time":{"days":"","hours":"","minutes":""},"transition":"" } |
| `detailComment` | `string` | **Optional**. { "comment1":"Change three file names into camel case","comment2":"","comment3":"","comment4":"","comment5":"" }                 |

##### 1. Fidyah Calculator

```http
  POST /api/palugada/hitung-fidyah
```

| Query    | Type     | Description                                                                  |
| :------- | :------- | :--------------------------------------------------------------------------- |
| `oldill` | `string` | **Required**. 0 = false, 1 = true (1 Untuk perhitungan Orang tua atau Sakit) |

| Body   | Type              | Description   |
| :----- | :---------------- | :------------ |
| `year` | `object (number)` | **Required**. |
| `days` | `object (number)` | **Required**. |

##### 1. Title Fixer

```http
  GET /api/palugada/benerinjudul
```

| Query    | Type     | Description                                                 |
| :------- | :------- | :---------------------------------------------------------- |
| `judul`  | `string` | **Required**. Ubah 'XYZ' dengan judul yang ingin diperbaiki |
| `simple` | `string` | **Required**. 0 = false & 1 = true                          |
