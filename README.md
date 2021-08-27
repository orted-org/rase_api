# GOOD WEALTH BETA SERVER


## Run Locally

Must have postgres running with the following config:

`POSTGRES_USER = some-user`

`POSTGRES_PASSWORD = some-password`

`POSTGRES_DB = some-db`

Please ensure that the DB has the schema as mentioned in `schema.sql`

### Go to the project directory and install packages

```bash
  yarn
```
or

```bash
  npm install --production=false
```
### Get the firebase admin private key for auth
Get the firebase admin configuration file from firebase and name it to `firebaseAuthCredentials.json`. This file must be in the same level of the package.json file.


### Env variables 
`POSTGRES_USER = some-user`

`POSTGRES_PASSWORD = some-password`

`POSTGRES_DB = some-db`

`POSTGRES_HOST = postgres-host`

`POSTGRES_PORT = postgres-port`


### Start the server

```bash
  yarn run dev
```
or
```bash
  npm run dev
```


  