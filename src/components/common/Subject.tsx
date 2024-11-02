interface Subject {
  class_name: string;
  dayofweek: string;
  begin_time: string;
  end_time: string;
}

type ScheduleData = Subject[][];

export type { Subject, ScheduleData };
