import React from "react";

interface Subject {
  day: string;
  name: string;
  time: string;
}

interface TimetableProps {
  subjects: Subject[];
}

const Timetable: React.FC<TimetableProps> = ({ subjects }) => {
  const days = ["月", "火", "水", "木", "金"];

  return (
    <div className="timetable">
      {days.map((day) => (
        <div key={day} className="day">
          <h2>{day}曜日</h2>
          {subjects
            .filter((subject) => subject.day === day)
            .map((subject, index) => (
              <div key={index} className="subject">
                <p>{subject.time} - {subject.name}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Timetable;
