import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvEditor = () => {
  const [data, setData] = useState([]);

  // CSVファイルを読み込む処理
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const parsedData = result.data
            .filter(row => row.length >= 2) // 不要な行を除外
            .map(row => ({ startTime: row[0], endTime: row[1] }));
          setData(parsedData);
        },
        header: false,
        skipEmptyLines: true,
      });
    }
  };

  // データを編集する処理
  const handleEdit = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  // 編集したデータをCSVとしてダウンロードする処理
  const handleDownload = () => {
    const csv = Papa.unparse(data.map(row => [row.startTime, row.endTime]));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'edited_data.csv');
    link.click();
  };
};

export default CsvEditor;
