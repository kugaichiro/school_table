import React, { useState } from "react";

interface Subject {
  day: string;
  name: string;
  time: string;
}

interface EditTimetableProps {
  subjects: Subject[];
  addSubject: (subject: Subject) => void;
}

const EditTimetable: React.FC<EditTimetableProps> = ({ subjects, addSubject }) => {
  const [day, setDay] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubject({ day, name, time });
    setDay("");
    setName("");
    setTime("");
  };

  return (
    <div>
      <h1>時間割の編集</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="曜日"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="科目名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">追加</button>
      </form>
      <div>
        <h2>現在の科目</h2>
        {subjects.map((subject, index) => (
          <div key={index}>
            <p>{subject.day} - {subject.time} - {subject.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditTimetable;
