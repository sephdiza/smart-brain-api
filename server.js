const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const database = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send(db.users) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, database, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, database, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, database)})
app.put('/image', (req, res) => { image.handleImage(req, res, database)})
app.post('/imageurl', (req,res) => { image.handleApiCall(req, res)})

app.listen(3001, () => {
  console.log('app is running on port 3001');
})
