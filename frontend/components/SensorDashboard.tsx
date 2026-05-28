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
  console.log("RAW TIMESTAMP:", latestReading?.timestamp);

  const hasReading = Boolean(latestReading);

  const lastUpdatedLabel = latestReading?.timestamp
    ? formatTimestamp(latestReading.timestamp)
    : "Belum tersedia";

  const statusState = error
    ? {
        label: "Koneksi bermasalah",
        tone:
          "border-rose-200 bg-rose-50 text-rose-700",
        dot: "bg-rose-500",
      }
    : isLoading && !hasReading
    ? {
        label: "Memuat data sensor",
        tone:
          "border-amber-200 bg-amber-50 text-amber-700",
        dot: "bg-amber-500",
      }
    : isLoading
    ? {
        label: "Menyegarkan data",
        tone:
          "border-emerald-200 bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500 animate-pulse",
      }
    : hasReading
    ? {
        label: "Sensor aktif",
        tone:
          "border-emerald-200 bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500",
      }
    : {
        label: "Menunggu data",
        tone:
          "border-slate-200 bg-slate-50 text-slate-600",
        dot: "bg-slate-400",
      };

  const sensorCards = [
    {
      title: "Soil Moisture",
      value: latestReading?.soil_moisture ?? "--",
      unit: "%",
      description: "Target ideal untuk irigasi otomatis.",
      icon: <MoistureIcon />,
    },
    {
      title: "Soil pH",
      value: latestReading?.soil_ph ?? "--",
      description: "Menunjukkan kondisi asam-basa tanah.",
      icon: <PhIcon />,
    },
    {
      title: "Nitrogen",
      value: latestReading?.soil_n ?? "--",
      unit: "ppm",
      description: "Nutrisi untuk pertumbuhan daun dan batang.",
      icon: <NutriIcon />,
    },
    {
      title: "Phosphorus",
      value: latestReading?.soil_p ?? "--",
      unit: "ppm",
      description: "Membantu akar dan pembungaan tanaman.",
      icon: <NutriIcon />,
    },
    {
      title: "Potassium",
      value: latestReading?.soil_k ?? "--",
      unit: "ppm",
      description: "Mendukung ketahanan dan kualitas tanaman.",
      icon: <NutriIcon />,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_38%),linear-gradient(180deg,#effdf5_0%,#f8fffb_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle,_rgba(110,231,183,0.22),_transparent_65%)] opacity-80" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-[32px] border border-emerald-100 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Smart irrigation dashboard
              </span>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  ChiliLife Sensor Dashboard
                </h1>

                <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Dashboard monitoring untuk menampilkan kondisi tanah berdasarkan
                  pembacaan sensor IoT secara real-time
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${statusState.tone}`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${statusState.dot}`} />
                  {statusState.label}
                </span>

                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
                  Last update: {lastUpdatedLabel}
                </span>
              </div>
            </div>

            <button
              onClick={onRefresh}
              aria-busy={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-progress disabled:opacity-90"
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <RefreshIcon />
              )}

              {isLoading && !hasReading ? "Memuat..." : isLoading ? "Menyegarkan..." : "Refresh data"}
            </button>
          </div>
        </section>

        <section className="rounded-[32px] border border-emerald-100 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700/70">
                Latest device
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {isLoading && !hasReading
                  ? "Loading sensor data"
                  : hasReading
                  ? "Sensor connected"
                  : "Waiting for sensor data"}
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              <span className={`h-2.5 w-2.5 rounded-full ${statusState.dot}`} />
              {statusState.label}
            </div>
          </div>

          {error && (
            <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-rose-200 bg-rose-50 px-4 py-4 text-rose-700 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">Gagal memuat data sensor</p>
                <p className="mt-1 text-sm leading-6 text-rose-600">{error}</p>
              </div>

              <button
                onClick={onRefresh}
                className="inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100"
              >
                Coba lagi
              </button>
            </div>
          )}

          {!error && isLoading && !hasReading ? (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
              {sensorCards.map((card) => (
                <SkeletonCard key={card.title} />
              ))}
            </div>
          ) : !error && !hasReading ? (
            <div className="mt-8 rounded-[28px] border border-dashed border-emerald-200 bg-emerald-50/70 p-8 text-center text-slate-600">
              <p className="text-lg font-semibold text-slate-900">
                Menunggu pembacaan sensor
              </p>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6">
                Data akan muncul otomatis setelah perangkat mengirimkan pembacaan terbaru.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
              {sensorCards.map((card) => (
                <SensorCard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  unit={card.unit}
                  description={card.description}
                  icon={card.icon}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function formatTimestamp(timestamp: string) {
  const date = new Date(
    timestamp.endsWith("Z") ? timestamp : `${timestamp}Z`
  );

  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }

  const parts = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const getPart = (type: Intl.DateTimeFormatPartTypes) => {
    return parts.find((part) => part.type === type)?.value ?? "";
  };

  const day = getPart("day");
  const month = getPart("month");
  const year = getPart("year");
  const hour = getPart("hour").padStart(2, "0");
  const minute = getPart("minute").padStart(2, "0");

  return `${day} ${month} ${year}, ${hour}.${minute}`;
}

function RefreshIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M3.75 10a6.25 6.25 0 0 1 10.52-4.52l1.23 1.23V4.25M16.25 10a6.25 6.25 0 0 1-10.52 4.52L4.5 13.29v2.46"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MoistureIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M10 2.5s4.5 5 4.5 8.25A4.5 4.5 0 1 1 5.5 10.75C5.5 7.5 10 2.5 10 2.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PhIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M6 6.5h8M9.5 4v12M8 16.5h3M13 4.5v11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function NutriIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M10 3.5v13M4.5 8h11M5.75 12.5h8.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/70 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div className="h-3 w-28 rounded-full bg-emerald-100/80" />
        <div className="h-11 w-11 rounded-2xl bg-emerald-100/80" />
      </div>

      <div className="mt-5 h-10 w-24 rounded-full bg-slate-100" />
      <div className="mt-4 h-4 w-4/5 rounded-full bg-slate-100" />
    </div>
  );
}