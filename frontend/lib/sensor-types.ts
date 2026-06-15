export interface SensorReading {
  id?: number;
  adc: number;
  kelembapan: number;
  kondisi: string;
  pompa: string;
  created_at: string;
}

export interface SensorApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}