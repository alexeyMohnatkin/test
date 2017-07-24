Clone this repo and run `yarn` then `yarn start`

App uses port 3000 and 3001 for hot reload. You can change ports with env variables PORT and HOT_PORT

Database config is in `/server/config.js`
To add admin type `db.users.insertOne({name: 'admin', email: 'admin@example.com', password: 'password', role: 'admin'})` in mongo console

`yarn run build` to build app
