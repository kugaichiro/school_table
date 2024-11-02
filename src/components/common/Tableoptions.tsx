interface TableOptions {
  numOfDayOfWeek: string;
  numOfClass: string;
  time: string;
}

interface EditTimetableProps {
  addOpitions: (subject: TableOptions) => void;
}

export { TableOptions, EditTimetableProps };
