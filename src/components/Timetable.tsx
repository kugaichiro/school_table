import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

// Subjectインターフェースを定義
interface Subject {
  dayofweek: string;
  class_name: string;
  time: string;
}


// 通常の関数宣言に変更
const Timetable: React.FC = function () {
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const [data, setData] = useState<Subject[]>([]); // Subjectの型を指定

  useEffect(() => {
    // publicフォルダ内のCSVファイルを読み込む
    fetch('/time_table.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // テキストとしてレスポンスを取得
      })
      .then(csvText => {
        // CSVテキストをパースする
        Papa.parse<Subject>(csvText, {
          header: true, // ヘッダー行をオブジェクトのキーとして扱う
          dynamicTyping: true, // 数値を自動的に数値型に変換
          complete: (results) => {
            // 読み込んだデータをSubject型の配列に格納
            const parsedData: Subject[] = results.data as Subject[]; // 型キャスト
            setData(parsedData); // データをステートに設定
          },
          error: (error:any) => {
            console.error('Error parsing CSV:', error);
          },
        });
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  return (//もう少し綺麗に整えること
    <div className="timetable">
  {/* 曜日の表示 */}
  {days.map((day) => (
    <div key={day} className="day">
      <h2>{day}曜日</h2>
    </div>
  ))} 

  {/* テーブルの表示 */}
  <table>
    <thead>
      <tr>
        {data.length > 0 && Object.keys(data[0]).map((header) => (
          <th key={header} className='day'>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((value, i) => (
            <td key={i}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
    
  );
};

export default Timetable;
