export interface Photo {
  id: string;
  url: string;
  caption?: string;
  date?: string;
}

export interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
