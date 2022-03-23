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
    
    await Promise.all(Array(50).fill().map((_, index) => User.create({ name: `user ${index}` })));
  } catch (error) {
    console.log(error);
  }
};

const app = express()

// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}); 

module.exports = {
  app,
  syncAndSeed,
};

