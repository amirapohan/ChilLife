import axios from "axios";

import { SensorApiResponse, SensorReading } from "./sensor-types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

async function fetchSensorData<T>(path: string): Promise<T> {
  const response = await axios.get<SensorApiResponse<T>>(
    `${API_BASE_URL}${path}`
  );

  if (!response.data.success) {
    throw new Error(response.data.message ?? "Failed to load sensor data");
  }

  return response.data.data;
}

export async function getLatestSensorData():
  Promise<SensorReading | null> {
  return fetchSensorData<SensorReading | null>(
    "/api/moisture/latest"
  );
}

export async function getSensorHistory(): Promise<SensorReading[]> {
  return fetchSensorData<SensorReading[]>(
    "/api/moisture/history"
  );
}