import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvEditor = function () {
  // CSVファイルを読み込む処理
  interface CsvRow {
    startTime: string;
    endTime: string;
  }

  const [data, setData] = useState<CsvRow[]>([]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (result: Papa.ParseResult<string[]>) => {
          const parsedData: CsvRow[] = result.data
            .filter((row) => row.length >= 2) // 不要な行を除外
            .map((row) => ({ startTime: row[0], endTime: row[1] }));
          setData(parsedData);
        },
        header: false,
        skipEmptyLines: true,
      });
    }
  };

  // データを編集する処理
  const handleEdit = (index: number, field: keyof CsvRow, value: string) => {
    const newData = [...data];
    (newData[index] as CsvRow)[field] = value;
    setData(newData);
  };

  // 編集したデータをCSVとしてダウンロードする処理
  const handleDownload = () => {
    const csv = Papa.unparse(data.map((row) => [row.startTime, row.endTime]));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'edited_data.csv');
    link.click();
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button type="button" onClick={handleDownload}>
        Download CSV
      </button>
      <div>
        {data.map((row, index) => (
          <div key={`${row.startTime}-${row.endTime}`}>
            <input
              type="text"
              value={row.startTime}
              onChange={(e) => handleEdit(index, 'startTime', e.target.value)}
            />
            <input
              type="text"
              value={row.endTime}
              onChange={(e) => handleEdit(index, 'endTime', e.target.value)}
            />
          </div>
        ))}
      </div>
      {/* 他のUI要素や編集機能をここに追加 */}
    </div>
  );
};

export default CsvEditor;
