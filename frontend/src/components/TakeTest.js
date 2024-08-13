import React, { useState, useEffect } from 'react';
import '../flashcard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function TakeTest() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch('https://flashcard-5ds0.onrender.com/api/flashcards')
      .then(response => response.json())
      .then(data => setFlashcards(data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleSubmitAnswer = () => {
    if (answer.trim().toLowerCase() === flashcards[currentIndex].answer.trim().toLowerCase()) {
      setScore(score + 1);
    }
    setAnswer('');
    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartTest = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
  };

  if (flashcards.length === 0) return <p>Loading flashcards...</p>;

  return (
    <div className="container mt-5">

      {showResult ? (
        <div className="result mt-4">
          <p>Your score is: {score}/{flashcards.length}</p>
          <button onClick={handleRestartTest} className="btn btn-primary">Restart Test</button>
        </div>
      ) : (
        <div className="flashcard-test">
                <h2>Take the Test</h2>

          <div className="flashcard-question p-4 mb-4 border rounded">
            {flashcards[currentIndex].question}
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              placeholder="Enter your answer"
            />
          </div>
          <button onClick={handleSubmitAnswer} className="btn btn-info">
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
}

export default TakeTest;
