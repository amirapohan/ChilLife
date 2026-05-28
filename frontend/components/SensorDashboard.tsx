import { SensorReading } from "../lib/sensor-types";
import { SensorCard } from "./SensorCard";

interface Props {
  latestReading: SensorReading | null;
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function SensorDashboard({
  latestReading,
  isLoading,
  error,
  onRefresh,
}: Props) {
  return (
    <main className="min-h-screen bg-emerald-50 p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-4 py-1 text-sm font-medium">
                Smart irrigation dashboard
              </span>

              <h1 className="text-5xl font-bold text-slate-900 mt-5">
                ChiliLife Sensor Dashboard
              </h1>

              <p className="text-gray-500 mt-3">
                Dashboard monitoring untuk menampilkan kondisi tanah berdasarkan pembacaan sensor IoT
              </p>
            </div>

            <button
              onClick={onRefresh}
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl"
            >
              Refresh data
            </button>
          </div>
        </section>

        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-emerald-100">
          <p className="text-gray-500 text-sm">
            Latest device
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-2">
            {isLoading
              ? "Loading..."
              : latestReading
              ? "Sensor connected"
              : "Waiting for sensor data"}
          </h2>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-500 rounded-2xl px-4 py-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            <SensorCard
              title="Soil Moisture"
              value={
                latestReading?.soil_moisture ?? "--"
              }
              unit="%"
              description="Target ideal untuk irigasi otomatis."
            />

            <SensorCard
              title="Soil pH"
              value={
                latestReading?.soil_ph ?? "--"
              }
              description="Menunjukkan kondisi asam-basa tanah."
            />

            <SensorCard
              title="Nitrogen"
              value={
                latestReading?.soil_n ?? "--"
              }
              unit="ppm"
              description="Nutrisi untuk pertumbuhan daun dan batang."
            />

            <SensorCard
              title="Phosphorus"
              value={
                latestReading?.soil_p ?? "--"
              }
              unit="ppm"
              description="Membantu akar dan pembungaan tanaman."
            />

            <SensorCard
              title="Potassium"
              value={
                latestReading?.soil_k ?? "--"
              }
              unit="ppm"
              description="Mendukung ketahanan dan kualitas tanaman."
            />
          </div>
        </section>
      </div>
    </main>
  );
}