import React, { useState } from 'react';

// 関数コンポーネントを通常の関数宣言に変更
const EditTimetable: React.FC = function () {
  const [numOfDayOfWeek, setDay] = useState<number>(5);
  const [numOfClass, setClass] = useState<number>(5);
  const [time, setTime] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTime('');
  };

  const days = ['', '月', '火', '水', '木', '金', '土', '日'];
  const displayDays = days.slice(0, numOfDayOfWeek + 1);

  const classesArray = Array.from({ length: numOfClass }, () =>
    Array.from({ length: numOfDayOfWeek + 1 }, (_, index) =>
      index === 0 ? '' : '空きマス',
    ),
  );

  function generateUniqueKey(prefix: string): React.Key {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
  }
  return (
    <div>
      <h1>時間割の編集</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="必要な曜日数"
          value={numOfDayOfWeek}
          onChange={(e) => setDay(Number(e.target.value))}
          required
          min="1"
          max="7"
        />
        <input
          type="number"
          placeholder="必要な時間数"
          value={numOfClass}
          onChange={(e) => setClass(Number(e.target.value))}
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
          style={{ width: '100%', tableLayout: 'fixed', height: '100%' }}
        >
          <thead>
            <tr>
              {displayDays.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classesArray.map((classTime) => (
              <tr key={generateUniqueKey('class')}>
                {classTime.map((subject) => (
                  <td key={generateUniqueKey('subject')}>{subject}</td>
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
