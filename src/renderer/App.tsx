import React, { useState } from 'react';
import Timetable from '../components/Timetable';
import SubjectForm from '../components/SubjectForm';
import '../styles/App.css';

interface Subject {
  day: string;
  name: string;
  time: string;
}

const App: React.FC = function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const addSubject = (subject: Subject) => {
    setSubjects([...subjects, subject]);
  };

  return (
    <div className="App">
      <h1>時間割アプリ</h1>
      <SubjectForm addSubject={addSubject} />
      <Timetable subjects={subjects} />
    </div>
  );
};

export default App;
