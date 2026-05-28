interface SensorCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description: string;
}

export function SensorCard({
  title,
  value,
  unit,
  description,
}: SensorCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <div className="mt-3 flex items-end gap-2">
        <span className="text-4xl font-bold text-slate-900">
          {value}
        </span>

        {unit && (
          <span className="text-gray-400 mb-1">
            {unit}
          </span>
        )}
      </div>

      <p className="text-gray-400 text-sm mt-4">
        {description}
      </p>
    </div>
  );
}