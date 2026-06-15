import { SensorReading } from "../lib/sensor-types";
import { SensorCard } from "./SensorCard";

interface Props {
  latestReading: SensorReading | null;
  historyReadings: SensorReading[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function SensorDashboard({
  latestReading,
  historyReadings,
  isLoading,
  error,
  onRefresh,
}: Props) {
  const hasReading = Boolean(latestReading);
  const conditionState = getConditionState(latestReading?.kondisi);
  const pumpState = getPumpState(latestReading?.pompa);

  const lastUpdatedLabel = latestReading?.created_at
    ? formatTimestamp(latestReading.created_at)
    : "Belum tersedia";

  const statusState = error
    ? {
        label: "Koneksi bermasalah",
        tone: "border-rose-200 bg-rose-50 text-rose-700",
        dot: "bg-rose-500",
      }
    : isLoading && !hasReading
    ? {
        label: "Memuat data sensor",
        tone: "border-amber-200 bg-amber-50 text-amber-700",
        dot: "bg-amber-500",
      }
    : isLoading
    ? {
        label: "Menyegarkan data",
        tone: "border-emerald-200 bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500 animate-pulse",
      }
    : hasReading
    ? {
        label: "Sensor kelembapan aktif",
        tone: "border-emerald-200 bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500",
      }
    : {
        label: "Menunggu data",
        tone: "border-slate-200 bg-slate-50 text-slate-600",
        dot: "bg-slate-400",
      };

  const futureSensorCards = [
    {
      title: "Soil pH",
      description: "Sensor belum tersedia.",
      icon: <PhIcon />,
    },
    {
      title: "Nitrogen",
      description: "Sensor belum tersedia.",
      icon: <NutriIcon />,
    },
    {
      title: "Phosphorus",
      description: "Sensor belum tersedia.",
      icon: <NutriIcon />,
    },
    {
      title: "Potassium",
      description: "Sensor belum tersedia.",
      icon: <NutriIcon />,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_38%),linear-gradient(180deg,#effdf5_0%,#f8fffb_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle,rgba(110,231,183,0.22),transparent_65%)] opacity-80" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-4xl border border-emerald-100 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Smart irrigation dashboard
              </span>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  ChilLife Sensor Dashboard
                </h1>

                <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Dashboard monitoring untuk sensor kelembapan tanah, status pompa,
                  dan riwayat pembacaan terbaru dari ESP32.
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

              {isLoading && !hasReading
                ? "Memuat..."
                : isLoading
                ? "Menyegarkan..."
                : "Refresh data"}
            </button>
          </div>
        </section>

        <section className="rounded-4xl border border-emerald-100 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700/70">
                Latest moisture reading
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {isLoading && !hasReading
                  ? "Loading moisture data"
                  : hasReading
                  ? "Sensor kelembapan terhubung"
                  : "Waiting for moisture data"}
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

          {!error && (
            <div className="mt-8 space-y-8">
              <section className={`overflow-hidden rounded-[36px] border bg-linear-to-br p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7 lg:p-8 ${conditionState.cardClass}`}>
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${statusState.tone}`}>
                        <span className={`h-2.5 w-2.5 rounded-full ${statusState.dot}`} />
                        {statusState.label}
                      </span>

                      <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
                        <span className={`h-2.5 w-2.5 rounded-full ${conditionState.dot}`} />
                        Kondisi {latestReading?.kondisi ?? "--"}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500/80">
                        Soil moisture
                      </p>

                      {latestReading ? (
                        <div className="mt-4 flex items-end gap-3">
                          <span className="text-6xl font-semibold tracking-tight text-slate-900 sm:text-7xl">
                            {latestReading.kelembapan}
                          </span>
                          <span className="pb-3 text-xl font-medium text-slate-500">
                            %
                          </span>
                        </div>
                      ) : (
                        <div className="mt-4 flex items-end gap-3">
                          <div className="h-16 w-36 animate-pulse rounded-[20px] bg-white/70" />
                          <span className="pb-3 text-xl font-medium text-slate-500">
                            %
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                      {latestReading
                        ? getConditionDescription(latestReading.kondisi)
                        : "Menunggu pembacaan sensor kelembapan tanah dari ESP32."}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${conditionState.badgeClass}`}>
                        <span className={`h-2 w-2 rounded-full ${conditionState.dot}`} />
                        {latestReading?.kondisi ?? "Kondisi belum tersedia"}
                      </span>

                      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${pumpState.badgeClass}`}>
                        <span className={`h-2 w-2 rounded-full ${pumpState.dot}`} />
                        Pompa {latestReading?.pompa ?? "--"}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500/80">
                          ADC value
                        </p>
                        <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                          {latestReading?.adc ?? "--"}
                        </p>
                      </div>

                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${conditionState.iconBg}`}>
                        <MoistureIcon />
                      </div>
                    </div>

                    <dl className="mt-6 space-y-4 text-sm text-slate-600">
                      <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                        <dt className="font-medium text-slate-500">Last update</dt>
                        <dd className="font-semibold text-slate-900">{lastUpdatedLabel}</dd>
                      </div>

                      <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                        <dt className="font-medium text-slate-500">Condition tone</dt>
                        <dd className="font-semibold text-slate-900">{conditionState.label}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700/70">
                    Future Sensor Monitoring
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    Sensor belum tersedia
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {futureSensorCards.map((card) => (
                    <SensorCard
                      key={card.title}
                      title={card.title}
                      value="--"
                      description={card.description}
                      icon={card.icon}
                      variant="placeholder"
                    />
                  ))}
                </div>
              </section>

              <section className="space-y-4 rounded-4xl border border-emerald-100 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8 lg:p-10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700/70">
                      History sensor
                    </p>

                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                      Riwayat pembacaan terbaru
                    </h3>
                  </div>

                  <p className="text-sm text-slate-500">
                    Menampilkan {Math.min(historyReadings.length, 5)} data terakhir.
                  </p>
                </div>

                {historyReadings.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {historyReadings.slice(0, 5).map((reading) => {
                      const readingConditionState = getConditionState(reading.kondisi);
                      const readingPumpState = getPumpState(reading.pompa);

                      return (
                        <div
                          key={`${reading.created_at}-${reading.adc}`}
                          className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-slate-50/80 px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-semibold text-slate-900">
                                {formatTimestamp(reading.created_at)}
                              </span>

                              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${readingConditionState.badgeClass}`}>
                                <span className={`h-2 w-2 rounded-full ${readingConditionState.dot}`} />
                                {reading.kondisi}
                              </span>

                              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${readingPumpState.badgeClass}`}>
                                <span className={`h-2 w-2 rounded-full ${readingPumpState.dot}`} />
                                Pompa {reading.pompa}
                              </span>
                            </div>

                            <p className="text-sm text-slate-500">
                              ADC {reading.adc} • Kelembapan {reading.kelembapan}%
                            </p>
                          </div>

                          <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
                              {reading.kelembapan}%
                            </span>
                            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
                              ADC {reading.adc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-[28px] border border-dashed border-emerald-200 bg-emerald-50/60 p-8 text-center text-slate-600">
                    <p className="text-lg font-semibold text-slate-900">
                      Belum ada riwayat pembacaan
                    </p>

                    <p className="mx-auto mt-2 max-w-xl text-sm leading-6">
                      Riwayat akan muncul setelah backend menerima payload sensor terbaru.
                    </p>
                  </div>
                )}
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function formatTimestamp(timestamp: string) {
  const normalizedTimestamp = /(?:Z|[+-]\d\d:?\d\d)$/i.test(timestamp)
    ? timestamp
    : `${timestamp}Z`;

  const date = new Date(normalizedTimestamp);

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

  return `${day} ${month} ${year}, ${hour}:${minute}`;
}

function getConditionState(condition?: string) {
  const normalizedCondition = condition?.trim().toUpperCase();

  if (normalizedCondition === "KERING") {
    return {
      label: "Kering",
      dot: "bg-rose-500",
      badgeClass: "bg-rose-50 text-rose-700",
      cardClass: "border-rose-100 from-rose-50 via-white to-orange-50",
      iconBg: "bg-rose-100 text-rose-700",
    };
  }

  if (normalizedCondition === "LEMBAB") {
    return {
      label: "Lembab",
      dot: "bg-amber-500",
      badgeClass: "bg-amber-50 text-amber-700",
      cardClass: "border-amber-100 from-amber-50 via-white to-emerald-50",
      iconBg: "bg-amber-100 text-amber-700",
    };
  }

  if (normalizedCondition === "BASAH") {
    return {
      label: "Basah",
      dot: "bg-emerald-500",
      badgeClass: "bg-emerald-50 text-emerald-700",
      cardClass: "border-emerald-100 from-emerald-50 via-white to-cyan-50",
      iconBg: "bg-emerald-100 text-emerald-700",
    };
  }

  return {
    label: normalizedCondition ?? "Tidak diketahui",
    dot: "bg-slate-400",
    badgeClass: "bg-slate-100 text-slate-600",
    cardClass: "border-slate-100 from-slate-50 via-white to-emerald-50",
    iconBg: "bg-slate-100 text-slate-600",
  };
}

function getPumpState(pump?: string) {
  const normalizedPump = pump?.trim().toUpperCase();

  if (normalizedPump === "ON") {
    return {
      label: "ON",
      dot: "bg-emerald-500",
      badgeClass: "bg-emerald-50 text-emerald-700",
    };
  }

  if (normalizedPump === "OFF") {
    return {
      label: "OFF",
      dot: "bg-slate-400",
      badgeClass: "bg-slate-100 text-slate-600",
    };
  }

  return {
    label: normalizedPump ?? "--",
    dot: "bg-slate-400",
    badgeClass: "bg-slate-100 text-slate-600",
  };
}

function getConditionDescription(condition?: string) {
  const normalizedCondition = condition?.trim().toUpperCase();

  if (normalizedCondition === "KERING") {
    return "Kondisi tanah kering. Pompa aktif untuk menjaga kelembapan tetap sesuai kebutuhan tanaman.";
  }

  if (normalizedCondition === "LEMBAB") {
    return "Kondisi tanah lembab. Sistem berada pada zona aman untuk pertumbuhan tanaman.";
  }

  if (normalizedCondition === "BASAH") {
    return "Kondisi tanah basah. Pompa dapat tetap nonaktif agar media tidak berlebihan air.";
  }

  return "Kondisi tanah belum dikenali dari payload sensor terbaru.";
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