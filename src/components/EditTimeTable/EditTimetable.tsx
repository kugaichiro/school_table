import React, { useState } from 'react';
import CsvEditor from './Editcsv';

interface Subject {
  num_of_day_of_week: string;
  num_of_class: string;
  time: string;
}

interface EditTimetableProps {
  subjects: Subject[];
  addSubject: (subject: Subject) => void;
}

const EditTimetable: React.FC<EditTimetableProps> = ({ subjects, addSubject }) => {
  const [num_of_day_of_week, setDay] = useState<string>('5');
  const [num_of_class, setName] = useState<string>('5');
  const [time, setTime] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubject({ num_of_day_of_week, num_of_class, time });
    setDay('');
    setName('');
    setTime('');
  };

  const days = ['', '月', '火', '水', '木', '金', '土', '日'];

  // num_of_day_of_weekを整数に変換し、空の場合は0に設定
  const numDays = parseInt(num_of_day_of_week, 10) || 0;
  const displayDays = days.slice(0, numDays+1);

  // num_of_classを整数に変換し、空の場合は0に設定
  const numClasses = parseInt(num_of_class, 10) || 0;
  const classes_array = Array.from({ length: numClasses }, () => Array.from({ length: numDays + 1 }, (_, index) => (index === 0 ? '' : '空きマス')));

  return (
    <div>
      <h1>時間割の編集</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='必要な曜日数'
          value={num_of_day_of_week}
          onChange={(e) => setDay(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='必要な時間数'
          value={num_of_class}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type='submit'>追加</button>
      </form>
      <div>
        <h2>現在の科目</h2>
        <table border={1} style={{ width: '100%', tableLayout: 'fixed',   height: '100%'}}>
          <thead>
            <tr>
              {displayDays.map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {classes_array.map((class_time, index) => (
                <tr key={index} >
                  {class_time.map((subject, index) => (
                      <td key={index}>{subject}</td>
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


const Inputclass: React.FC<InputclassProps> = () => {

}
