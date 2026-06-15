import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { SoilMoistureReading } from "../types/sensor";

const selectFields = "adc, kelembapan, kondisi, pompa, created_at";

const formatLatestReading = (
  data: SoilMoistureReading[] | null
) => data?.[0] ?? null;

export const getLatestSensorData = async (
  req: Request,
  res: Response
) => {
  try {
    const { data, error } = await supabase
      .from("soil_moisture_readings")
      .select(selectFields)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: formatLatestReading(data),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getSensorHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const { data, error } = await supabase
      .from("soil_moisture_readings")
      .select(selectFields)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: data ?? [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};