import React, { useState, useCallback } from 'react';
import '../../styles/App.css';
import updateSchedule from './EditScheduleform';
import { ScheduleData, Subject } from '../common/Subject';
import { Time } from '../common/Tableoptions';
//simport saveCsv from './ControlCSV';

function generateUniqueKey(prefix: string): React.Key {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

const InputForm: React.FC<{
  cell: Subject;
  classesArray: ScheduleData;
  setClassesArray: React.Dispatch<React.SetStateAction<ScheduleData>>;
  rowIndex: number;
  colIndex: number;
}> = function ({ cell, classesArray, setClassesArray, rowIndex, colIndex }) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setClassesArray(
        updateSchedule(
          classesArray,
          {
            class_name: e.target.value,
            dayofweek: '',
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
      value={cell?.class_name}
      onChange={handleChange}
    />
  );
};

// 関数コンポーネントを通常の関数宣言に変更
const EditTimetable: React.FC = function () {
  const [numOfDayOfWeek, setDay] = useState<number>(5);
  const [numOfClass, setClass] = useState<number>(5);

  const [classesArray, setClassesArray] = useState<ScheduleData>(
    Array.from({ length: numOfClass }, () =>
      Array.from({ length: numOfDayOfWeek + 1 }, (_, index) =>
        index === 0
          ? ({ startTime: '', endTime: '' } as Time)
          : ({
              class_name: '',
              dayofweek: '',
            } as Subject),
      ),
    ) as ScheduleData,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //saveCsv(classesArray);
  };

  const days = ['', '月', '火', '水', '木', '金', '土', '日'];
  const displayDays = days.slice(0, numOfDayOfWeek + 1);

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
        <button type="submit">追加</button>

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
                      {colIndex === 0 ? (
                        <>
                          <input
                            type="time"
                            value={(cell as unknown as Time).startTime || ''}
                            onChange={(e) => {
                              const newClassesArray = [...classesArray];
                              (newClassesArray[rowIndex][
                                colIndex
                              ] as unknown as Time) = {
                                startTime: e.target.value,
                                endTime: '',
                              };
                              setClassesArray(newClassesArray);
                            }}
                          />
                          <input
                            type="time"
                            value={(cell as unknown as Time).endTime || ''}
                            onChange={(e) => {
                              const newClassesArray = [...classesArray];
                              (newClassesArray[rowIndex][
                                colIndex
                              ] as unknown as Time) = {
                                startTime: (cell as unknown as Time).startTime,
                                endTime: e.target.value,
                              };
                              setClassesArray(newClassesArray);
                            }}
                          />
                        </>
                      ) : (
                        <InputForm
                          cell={cell}
                          classesArray={classesArray}
                          setClassesArray={setClassesArray}
                          rowIndex={rowIndex}
                          colIndex={colIndex}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default EditTimetable;
