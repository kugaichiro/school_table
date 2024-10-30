import React, { useState } from "react";

interface Subject {
  day: string;
  name: string;
  time: string;
}

interface SubjectFormProps {
  addSubject: (subject: Subject) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ addSubject }) => {
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
  );
};

export default SubjectForm;
