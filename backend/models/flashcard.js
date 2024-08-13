const connection = require('../config/db');

const Flashcard = {
  
  getAll: (callback) => {
    connection.query('SELECT * FROM flashcards', callback);
  },
  getById: (id, callback) => {
    connection.query('SELECT * FROM flashcards WHERE id = ?', [id], callback);
  },
  create: (flashcard, callback) => {
    connection.query('INSERT INTO flashcards SET ?', flashcard, callback);
  },
  update: (id, flashcard, callback) => {
    connection.query('UPDATE flashcards SET ? WHERE id = ?', [flashcard, id], callback);
  },
  delete: (id, callback) => {
    //connection.query('DELETE FROM flashcards WHERE id = ?', [id], callback);
    const query = 'DELETE FROM flashcards WHERE id = ?';

    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.affectedRows === 0) {
        return callback(new Error('Flashcard not found'));
      }
      callback(null);
    });

  },
};

module.exports = Flashcard;
