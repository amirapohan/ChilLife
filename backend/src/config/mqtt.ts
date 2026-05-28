import mqtt from "mqtt";
import dotenv from "dotenv";
import { supabase } from "./supabase";
import { SensorPayload } from "../types/sensor";

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

    const payload: SensorPayload = JSON.parse(
        message.toString()
    );

    console.log(payload);

    if (!payload.device_id) {
        console.log(
            "Invalid payload: missing device_id"
        );
        return;
    }

    // Cari device berdasarkan device_code
    const { data: device, error: deviceError } =
      await supabase
        .from("devices")
        .select("id")
        .eq("device_code", payload.device_id)
        .single();

    if (deviceError || !device) {
      console.log(
        "Device not found:",
        payload.device_id
      );
      return;
    }

    // Insert sensor reading
    const { error: insertError } = await supabase
      .from("sensor_readings")
      .insert([
        {
          device_id: device.id,
          soil_moisture: payload.soil_moisture,
          soil_ph: payload.soil_ph,
          soil_n: payload.soil_n,
          soil_p: payload.soil_p,
          soil_k: payload.soil_k,
          temperature: payload.temperature,
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