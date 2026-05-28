import express from "express";
import cors from "cors";
import sensorRoutes from "./routes/sensorRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/sensors", sensorRoutes);

export default app;