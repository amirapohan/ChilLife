"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getLatestSensorData,
  getSensorHistory,
} from "../lib/sensor-api";
import { SensorReading } from "../lib/sensor-types";

import { SensorDashboard } from "../components/SensorDashboard";

export default function HomePage() {
  const [latestReading, setLatestReading] =
    useState<SensorReading | null>(null);

  const [historyReadings, setHistoryReadings] =
    useState<SensorReading[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [latest, history] = await Promise.all([
        getLatestSensorData(),
        getSensorHistory(),
      ]);

      setLatestReading(latest);
      setHistoryReadings(history);
    } catch (loadError) {
      setLatestReading(null);
      setHistoryReadings([]);
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
    },500);

    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <SensorDashboard
      latestReading={latestReading}
      historyReadings={historyReadings}
      isLoading={isLoading}
      error={error}
      onRefresh={() => {
        void loadData();
      }}
    />
  );
}