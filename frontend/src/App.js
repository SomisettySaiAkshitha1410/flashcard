import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlashcardList from './components/FlashcardList';
import AddFlashcard from './components/AddFlashcard';
import EditFlashcard from './components/EditFlashcard';
import TakeTest from './components/TakeTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlashcardList />} />
        <Route path="/add" element={<AddFlashcard />} />
        <Route path="/edit/:id" element={<EditFlashcard />} />
        <Route path="/taketest" element={<TakeTest />} />
      </Routes>
    </Router>
  );
}

export default App;
