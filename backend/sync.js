// backend/sync.js
const sequelize = require('./config/database');
const Flashcard = require('./models/flashcard');

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
}).catch(err => {
  console.error('Unable to create table:', err);
});
