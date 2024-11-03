import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

// Subjectインターフェースを定義
interface Subject {
  dayofweek: string;
  class_name: string;
  time: string;
}

const Timetable: React.FC = function Timetable() {
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const [data, setData] = useState<Subject[]>([]); // Subjectの型を指定
  const [error, setError] = useState<string | null>(null); // エラーメッセージの状態を追加

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/time_table.csv');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const csvText = await response.text(); // テキストとしてレスポンスを取得

        // CSVテキストをパースする
        Papa.parse<Subject>(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const parsedData: Subject[] = results.data as Subject[];
            setData(parsedData);
          },
          error: (parseError: Error) => {

            // 引数の型をErrorに変更
            setError(`Error parsing CSV: ${parseError.message}`);
            
          },
        });
      } catch (fetchError) {
        // fetchErrorの型を明示的に設定
        if (fetchError instanceof Error) {
          setError(`Error fetching CSV: ${fetchError.message}`);
        } else {
          setError('Unknown error occurred while fetching CSV.');
        }
      }
    };

    fetchData(); // fetchData関数を呼び出す
  }, []);

  return (

    <div>
      {error && <div className="error">{error}</div>}
      <table className="timetable">
        <thead>
          <tr>
            {days.map((day) => (
              <th key={day} className="day">
                {day}曜日
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`${row.dayofweek}-${row.class_name}`}>
              {Object.entries(row).map(([key, value]) => (
                <td
                  key={`${row.dayofweek}-${row.class_name}-${key}`}
                  className="subject"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Timetable;
