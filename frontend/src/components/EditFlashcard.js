import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../flashcard.css';

function EditFlashcard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/flashcards/${id}`)
      .then(response => response.json())
      .then(data => {
        setQuestion(data.question);
        setAnswer(data.answer);
      })
      .catch(error => console.error('Error fetching flashcard:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFlashcard = { question, answer };
    fetch(`http://localhost:5000/api/flashcards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFlashcard),
    })
      .then(response => {
        if (response.ok) {
          alert('Flashcard updated successfully!');
          navigate('/');
        } else {
          alert('Failed to update flashcard.');
        }
      })
      .catch(error => console.error('Error updating flashcard:', error));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
        <h2>Edit Flashcard</h2>

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
        <button type="submit" className="btn btn-primary">Update Flashcard</button>
      </form>
    </div>
  );
}

export default EditFlashcard;
