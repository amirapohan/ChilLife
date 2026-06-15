import mqtt from "mqtt";
import dotenv from "dotenv";
import { supabase } from "./supabase";
import { SoilMoisturePayload } from "../types/sensor";

dotenv.config();

const client = mqtt.connect(process.env.MQTT_BROKER!, {
  port: Number(process.env.MQTT_PORT),
  username: process.env.MQTT_USERNAME || "",
  password: process.env.MQTT_PASSWORD || "",
});

client.on("connect", () => {
  console.log("MQTT connected");

  client.subscribe(process.env.MQTT_TOPIC!, (err) => {
    if (err) {
      console.log("Subscribe failed:", err.message);
      return;
    }

    console.log(`Subscribed to ${process.env.MQTT_TOPIC}`);
  });
});

client.on("message", async (topic, message) => {
  try {
    console.log("Message received");

    const payload: unknown = JSON.parse(message.toString());

    const isValidPayload = (
      value: unknown
    ): value is SoilMoisturePayload => {
      if (!value || typeof value !== "object") {
        return false;
      }

      const data = value as Record<string, unknown>;

      return (
        typeof data.adc === "number" &&
        typeof data.kelembapan === "number" &&
        typeof data.kondisi === "string" &&
        typeof data.pompa === "string"
      );
    };

    if (!isValidPayload(payload)) {
      console.log("Invalid payload: missing or invalid fields");
      return;
    }

    console.log(payload);

    // Insert sensor reading
    const { error: insertError } = await supabase
      .from("soil_moisture_readings")
      .insert([
        {
          adc: payload.adc,
          kelembapan: payload.kelembapan,
          kondisi: payload.kondisi,
          pompa: payload.pompa,
        },
      ]);

    if (insertError) {
      console.log(
        "Insert failed:",
        insertError.message
      );
      return;
    }

    console.log("Insert success");
  } catch (error) {
    console.log("MQTT processing error:", error);
  }
});

export default client;