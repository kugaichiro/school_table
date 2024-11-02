import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Timetable from '../components/Timetable';
import EditTimetable from '../components/EditTimeTable/EditTimetable';
import '../styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">時間割</Link> | <Link to="/edit">編集</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Timetable subjects={[]} />} />
          <Route
            path="/edit"
            element={<EditTimetable subjects={[]} addSubject={() => {}} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
