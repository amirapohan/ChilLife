"use client";

import { useCallback, useEffect, useState } from "react";

import { getLatestSensorData } from "../lib/sensor-api";
import { SensorReading } from "../lib/sensor-types";

import { SensorDashboard } from "../components/SensorDashboard";

export default function HomePage() {
  const [latestReading, setLatestReading] =
    useState<SensorReading | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const latest =
        await getLatestSensorData();

      setLatestReading(latest);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load sensor data"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();

    const interval = setInterval(() => {
      void loadData();
    }, 5000);

    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <SensorDashboard
      latestReading={latestReading}
      isLoading={isLoading}
      error={error}
      onRefresh={() => {
        void loadData();
      }}
    />
  );
}