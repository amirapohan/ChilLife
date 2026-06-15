import type { ReactNode } from "react";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description: string;
  icon?: ReactNode;
  variant?: "default" | "placeholder";
}

export function SensorCard({
  title,
  value,
  unit,
  description,
  icon,
  variant = "default",
}: SensorCardProps) {
  const isPlaceholder = variant === "placeholder";

  return (
    <div className={`group rounded-[28px] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-300 ${isPlaceholder ? "border border-dashed border-slate-200 bg-slate-50/80 hover:shadow-[0_14px_32px_rgba(15,23,42,0.05)]" : "border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/70 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,185,129,0.12)]"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isPlaceholder ? "text-slate-500/70" : "text-emerald-700/70"}`}>
            {title}
          </p>
        </div>

        {icon && (
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${isPlaceholder ? "bg-slate-100 text-slate-400" : "bg-emerald-100 text-emerald-700"}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className={`text-4xl font-semibold tracking-tight ${isPlaceholder ? "text-slate-400" : "text-slate-900"}`}>
          {value}
        </span>

        {unit && (
          <span className={`pb-1 text-sm font-medium ${isPlaceholder ? "text-slate-300" : "text-slate-400"}`}>
            {unit}
          </span>
        )}
      </div>

      <p className={`mt-4 text-sm leading-6 ${isPlaceholder ? "text-slate-400" : "text-slate-500"}`}>
        {description}
      </p>
    </div>
  );
}