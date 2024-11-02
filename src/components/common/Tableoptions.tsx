interface Time {
  startTime: string;
  endTime: string;
}

interface TableOptions {
  numOfDayOfWeek: string;
  numOfClass: string;
  time: Time[];
}

interface EditTimetableProps {
  addOpitions: (subject: TableOptions) => void;
}

export { Time, TableOptions, EditTimetableProps };
