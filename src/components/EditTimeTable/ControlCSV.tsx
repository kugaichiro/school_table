import { Subject } from '../common/Subject';
import { Time } from '../common/Tableoptions';

// 配列データをCSV形式に変換する関数
const arrayToTableCsv = (dataArray: Subject[][]) => {
  const header = '月,火,水,木,金,土,日';
  const rows = dataArray
    .map((row) =>
      row
        .slice(1)
        .map((subject) => subject.class_name)
        .join(','),
    ) // 各行をカンマで区切り
    .join('\n'); // 行ごとに改行
  return [header, rows].join('\n');
};

const arrayToScheduleCsv = (dataArray: Time[][]): string => {
  const header = 'starttime,endtime';
  const rows = dataArray.map((row) =>
    row[0] ? `${row[0].startTime},${row[0].endTime}` : '',
  );

  // ヘッダーとデータを結合し、行ごとに改行
  return [header, ...rows].join('\n');
};

// CSVダウンロード関数
const downloadCsv = (
  dataArray: Subject[][],
  relativePathTable = 'time_table.csv',
  relativePathSchedule = 'time_schedule.csv',
) => {
  const csvContentTable = arrayToTableCsv(dataArray);
  const blobTable = new Blob([csvContentTable], {
    type: 'text/csv;charset=utf-8;',
  });
  const link = document.createElement('a');

  // CSVファイルをダウンロードするリンクを作成
  if (link.download !== undefined) {
    // ブラウザのサポートを確認
    const url = URL.createObjectURL(blobTable);
    link.setAttribute('href', url);
    link.setAttribute('download', relativePathTable); // 相対パスをファイル名に指定
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const csvContentSchedule = arrayToScheduleCsv(
    dataArray as unknown as Time[][],
  );
  const blobSchedule = new Blob([csvContentSchedule], {
    type: 'text/csv;charset=utf-8;',
  });
  if (link.download !== undefined) {
    // ブラウザのサポートを確認
    const url = URL.createObjectURL(blobSchedule);
    link.setAttribute('href', url);
    link.setAttribute('download', relativePathSchedule); // 相対パスをファイル名に指定
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default downloadCsv;
