export interface AQIEntry {
  aqi: number;
  readonly time: number;
}

export interface AQIArchive {
  [cityName: string]: AQIEntry[];
}

export interface State {
  error: any;
  loading: boolean;
  aqiArchive: AQIArchive;
  addEntry: (entry: any, timeStamp: number) => void;
}
