import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../flashcard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch('http://localhost:5000/api/flashcards')
      .then(response => response.json())
      .then(data => setFlashcards(data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      fetch(`http://localhost:5000/api/flashcards/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
          alert('Flashcard deleted successfully!');
        })
        .catch(error => console.error('Error deleting flashcard:', error));
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleSelectFlashcard = (index) => {
    setSelectedFlashcard(index);
    setCurrentIndex(index);
    setFlipped(false);
  };

  const handleBackToGrid = () => {
    setSelectedFlashcard(null);
  };

  const handleEdit = () => {
    navigate(`/edit/${flashcards[currentIndex].id}`); // Navigate to the edit page with the flashcard ID
  };

  if (flashcards.length === 0) return <p>Loading flashcards...</p>;

  return (
    <>
          <h1 className="text-center mb-4">FlashCard Tool</h1> {/* Heading above the container */}


    
  

    <div className="container">
      <div className="sidebar">
        <Link to="/add" className="btn btn-primary d-block mb-3">
          <i className="fas fa-plus"></i> Add Flashcard
        </Link>

        <Link to="/taketest" className="btn btn-primary d-block mb-3">
          <i className="fas fa-pencil-alt"></i> Take Test
        </Link>
      </div>

      <div className="flashcard-grid">
        {selectedFlashcard === null ? (
          flashcards.map((flashcard, index) => (
            <div
              key={flashcard.id}
              className="flashcard-grid-item"
              onClick={() => handleSelectFlashcard(index)}
            >
              {flashcard.question}
            </div>
          ))
        ) : (
          <div className="flashcard">
            <button onClick={handleBackToGrid} className="btn btn-secondary mb-3">
              <i className="fas fa-arrow-left"></i> Back
            </button>
        <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
  {flashcards[currentIndex] && (
    <>
      <div className="flashcard-front">
        {flashcards[currentIndex].question}
      </div>
      <div className="flashcard-back">
        {flashcards[currentIndex].answer}
      </div>
    </>
  )}
</div>
            <div className="flashcard-buttons">
              <button onClick={handlePrevious} className="btn btn-secondary me-2">
                <i className="fas fa-arrow-left"></i> Previous
              </button>
              <button onClick={handleNext} className="btn btn-secondary">
                Next <i className="fas fa-arrow-right"></i>
              </button>
              <button
                onClick={() => handleDelete(flashcards[currentIndex].id)}
                className="btn btn-danger ms-2"
              >
                <i className="fas fa-trash"></i>
              </button>
              <button
                onClick={handleEdit}
                className="btn btn-secondary ms-2"
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default FlashcardList;
