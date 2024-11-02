import { Subject, ScheduleData } from '../common/Subject';

export default function updateSchedule(
  dataArray: ScheduleData, // ScheduleData は Subject[][] 型
  content: Subject, // 更新する Subject
  row: number, // 行番号
  column: number, // 列番号
): ScheduleData {
  // 行・列位置と入力内容を使用してデータ配列をディープコピーで更新
  const updatedData: ScheduleData = dataArray.map((rowData) =>
    Array.isArray(rowData) ? [...rowData] : [],
  ); // 各行をコピー

  // 行が存在しない場合、初期化
  if (!updatedData[row]) {
    updatedData[row] = []; // 新しい行を追加
  }

  // 列が存在しない場合、列を拡張
  if (updatedData[row].length <= column) {
    updatedData[row].length = column + 1; // 列を拡張
  }

  // 指定位置にコンテンツを代入
  updatedData[row][column] = content;

  return updatedData; // 更新されたデータを返す
}
