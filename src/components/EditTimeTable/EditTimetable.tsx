import React, { useState } from 'react';

interface Subject {
  numOfDayOfWeek: string;
  numOfClass: string;
  time: string;
}

interface EditTimetableProps {
  subjects: Subject[];
  addSubject: (subject: Subject) => void;
}

const EditTimetable: React.FC<EditTimetableProps> = ({ subjects, addSubject }) => {
  const [ numOfDayOfWeek, setDay] = useState<string>('5');
  const [numOfClass, setClass] = useState<string>('5');
  const [time, setTime] = useState<string>('');
  const subject = subjects;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubject({ numOfDayOfWeek, numOfClass, time });
    setDay('');
    setClass('');
    setTime('');
  };

  const days = ['', '月', '火', '水', '木', '金', '土', '日'];
  const numDays = parseInt(numOfDayOfWeek, 10) || 0;
  const displayDays = days.slice(0, numDays + 1);
  const numClasses = parseInt(numOfClass, 10) || 0;
  const classesArray = Array.from({ length: numClasses }, () =>
    Array.from({ length: numDays + 1 }, (_, index) =>
      index === 0 ? '' : '空きマス',)
  ),

  return (
    <div>
      <h1>時間割の編集</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="必要な曜日数"
          value={numOfDayOfWeek}
          onChange={(e) => setDay(e.target.value)}
          required
          min="1"
          max="7"
        />
        <input
          type="number"
          placeholder="必要な時間数"
          value={numOfClass}
          onChange={(e) => setClass(e.target.value)}
          required
          min="1"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">追加</button>
      </form>
      <div>
        <h2>現在の科目</h2>
        <table
          border={1}
          style={{
            width: '100%',
            tableLayout: 'fixed',
            height: '100%',
          }}
        >
          <thead>
            <tr>
              {displayDays.map((day) => (
                <th key={generateUniqueKey("day")}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classesArray.map((classTime) => (
              <tr key={generateUniqueKey("class")}>
                {classTime.map((subject) => (
                  <td key={generateUniqueKey("subject")}>{subject}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditTimetable;
