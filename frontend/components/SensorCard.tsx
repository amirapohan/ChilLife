import type { ReactNode } from "react";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description: string;
  icon?: ReactNode;
}

export function SensorCard({
  title,
  value,
  unit,
  description,
  icon,
}: SensorCardProps) {
  return (
    <div className="group rounded-[28px] border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/70 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,185,129,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700/70">
            {title}
          </p>
        </div>

        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition-transform duration-300 group-hover:scale-105">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-4xl font-semibold tracking-tight text-slate-900">
          {value}
        </span>

        {unit && (
          <span className="pb-1 text-sm font-medium text-slate-400">
            {unit}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}