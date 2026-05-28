export interface SensorReading {
  id?: number;

  soil_moisture: number;
  soil_ph: number;

  soil_n: number;
  soil_p: number;
  soil_k: number;

  timestamp?: string;
}