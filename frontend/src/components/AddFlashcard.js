import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../flashcard.css';

function AddFlashcard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFlashcard = { question, answer };
    fetch('https://flashcard-5ds0.onrender.com/api/flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFlashcard),
    })
      .then(response => {
        if (response.ok) {
          alert('Flashcard added successfully!');
          navigate('/');
        } else {
          alert('Failed to add flashcard.');
        }
      })
      .catch(error => console.error('Error adding flashcard:', error));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group  mb-3">
        <h2>Add Flashcard</h2>

          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="answer">Answer</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Flashcard</button>
      </form>
    </div>
  );
}

export default AddFlashcard;
