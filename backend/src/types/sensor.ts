export interface SoilMoisturePayload {
  adc: number;
  kelembapan: number;
  kondisi: string;
  pompa: string;
}

export interface SoilMoistureReading extends SoilMoisturePayload {
  id?: number;
  created_at: string;
}