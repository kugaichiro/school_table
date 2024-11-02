import React from 'react';

// 通常の関数宣言に変更
const Timetable: React.FC = function () {
  const days = ['月', '火', '水', '木', '金', '土', '日'];

  return (
    <div className="timetable">
      {days.map((day) => (
        <div key={day} className="day">
          <h2>{day}曜日</h2>
        </div>
      ))}
    </div>
  );
};

export default Timetable;
