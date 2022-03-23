const express = require('express')
const path = require('path')
const Sequelize = require('sequelize');
const { STRING } = Sequelize.DataTypes;

const db = new Sequelize('postgres://localhost/demo_db');

const User = db.define('user', {
  name: STRING,
});

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    
    await Promise.all(Array(5).fill().map((_, index) => User.create({ name: `user ${index}` })));
  } catch (error) {
    console.log(error);
  }
};

const app = express()

// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}); 

app.get('/api/users', async (req, res) => {
  res.send(await User.findAll());
});

app.get('/api/users/:id', async (req, res) => {
  res.send(await User.findByPk(req.params.id));
});

app.post('/api/users', async (req, res, next) => {
  res.send(await User.create({ name: req.body.name }));
});

module.exports = {
  app,
  syncAndSeed,
};

