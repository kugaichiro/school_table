interface Subject {
  dayofweek: string;
  class_name: string;
  time: string;
}

interface TimetableProps {
  addSubject: (subject: Subject) => void;
}

export { Subject, TimetableProps };
