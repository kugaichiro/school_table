import fs from 'fs';
import path from 'path';
import { Subject } from '../common/Subject';

// 配列データをCSV形式に変換する関数
const arrayToCsv = (dataArray: Subject[][]) => {
  return dataArray
    .map((row) => Object.values(row).join(',')) // 各行をカンマで区切り
    .join('\n'); // 行ごとに改行
};

// CSV保存関数
const saveCsv = (dataArray: Subject[][]) => {
  const csvContent = arrayToCsv(dataArray);
  const relativePath = '../../../public/timetable.csv';
  const absolutePath = path.resolve(relativePath);

  fs.writeFile(absolutePath, csvContent, 'utf8', (err) => {
    if (err) {
      console.error('CSVファイルの保存中にエラーが発生しました:', err);
    } else {
      console.log('CSVファイルが正常に保存されました:', absolutePath);
    }
  });
};

export default saveCsv;
