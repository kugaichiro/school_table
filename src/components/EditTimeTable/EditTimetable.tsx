import React, { useState, useCallback } from 'react';
import '../../styles/App.css';
import updateSchedule from './EditScheduleform';
import { ScheduleData, Subject } from '../common/Subject';

function generateUniqueKey(prefix: string): React.Key {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

const InputForm = function (
  cell: Subject,
  classesArray: ScheduleData,
  setClassesArray: React.Dispatch<React.SetStateAction<ScheduleData>>,
  rowIndex: number,
  colIndex: number,
) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setClassesArray(
        updateSchedule(
          classesArray,
          {
            class_name: e.target.value,
            dayofweek: '',
            begin_time: '',
            end_time: '',
          },
          rowIndex,
          colIndex,
        ),
      );
    },
    [classesArray, rowIndex, colIndex, setClassesArray],
  );

  return (
    <input
      className="class_name"
      key={`cell_${rowIndex}_${colIndex}`}
      value={cell?.class_name}
      onChange={handleChange}
    />
  );
};

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

  const [classesArray, setClassesArray] = useState<ScheduleData>(
    Array.from({ length: numOfClass }, () =>
      Array.from(
        { length: numOfDayOfWeek + 1 },
        () =>
          ({
            class_name: '',
            dayofweek: '',
            begin_time: '',
            end_time: '',
          }) as Subject,
      ),
    ),
  );

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
            {classesArray.map((classTime, rowIndex) => (
              <tr key={generateUniqueKey('class')}>
                {classTime.map((cell: Subject, colIndex: number) => (
                  <td key={generateUniqueKey('subject')}>
                    {InputForm(
                      cell,
                      classesArray,
                      setClassesArray,
                      rowIndex,
                      colIndex,
                    )}
                  </td>
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
