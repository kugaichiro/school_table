import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/App.css';
import Timetable from '../components/Timetable'; // Timetable コンポーネントのインポート
import EditTimetable from '../components/EditTimeTable/EditTimetable'; // EditTimetable コンポーネントのインポート



// 通常の関数宣言に変更
const App: React.FC = function () {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">時間割</Link> | <Link to="/edit">編集</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Timetable />
              </div>
            }
          />
          <Route path="/edit" element={<EditTimetable />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
