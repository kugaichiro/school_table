const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');
const timetableBody = document.getElementById('timetable-body');

// 保存ボタンのクリックイベント
saveBtn.addEventListener('click', () => {
  const data = [];
  timetableBody.querySelectorAll('tr').forEach((row) => {
    const rowData = [];
    row.querySelectorAll('td').forEach((cell) => {
      rowData.push(cell.innerText);
    });
    data.push(rowData);
  });

  const filePath = path.join(__dirname, 'timetable.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  alert('時間割を保存しました！');
});

// ロードボタンのクリックイベント
loadBtn.addEventListener('click', () => {
  const filePath = path.join(__dirname, 'timetable.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath));
    data.forEach((rowData, rowIndex) => {
      rowData.forEach((cellData, cellIndex) => {
        timetableBody.rows[rowIndex].cells[cellIndex].innerText = cellData;
      });
    });
    alert('時間割をロードしました！');
  } else {
    alert('保存された時間割がありません。');
  }
});
