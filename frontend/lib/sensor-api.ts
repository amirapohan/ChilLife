import axios from "axios";

import { SensorReading } from "./sensor-types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export async function getLatestSensorData():
  Promise<SensorReading | null> {
  const response = await axios.get(
    `${API_URL}/sensors/latest`
  );

  return response.data.data?.[0] || null;
}