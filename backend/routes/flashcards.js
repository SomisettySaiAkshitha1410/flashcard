const express = require('express');
const router = express.Router();
const Flashcard = require('../models/flashcard');

// Get all flashcards
router.get('/', (req, res) => {
  Flashcard.getAll((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Get flashcard by id
router.get('/:id', (req, res) => {
  Flashcard.getById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('Flashcard not found');
    }
    res.json(results[0]);
  });
});

// Create a new flashcard
router.post('/', (req, res) => {
  const newFlashcard = req.body;
  Flashcard.create(newFlashcard, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: results.insertId });
  });
});

// Update a flashcard
router.put('/:id', (req, res) => {
  const updatedFlashcard = req.body;
  Flashcard.update(req.params.id, updatedFlashcard, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(204);
  });
});

// Delete a flashcard
router.delete('/:id', (req, res) => {
  Flashcard.delete(req.params.id, (err) => {
    if (err) {
      console.error('Error deleting flashcard:', err);
      return res.status(500).json({ error: 'Failed to delete flashcard. Please try again.' });
    }
    res.sendStatus(204);
  });
});


module.exports = router;
