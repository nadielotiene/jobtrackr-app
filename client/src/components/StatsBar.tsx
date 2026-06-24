interface StatCardProps {
  label: string
  value: string | number
  color: string
}

const StatCard = ({ label, value, color }: StatCardProps) => (
  <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 flex flex-col gap-1">
    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
      {label}
    </span>
    <span className={`text-3xl font-bold ${color}`}>
      {value}
    </span>
  </div>
)

interface Props {
  total: number
  responseRate: number
  interviews: number
  offers: number
}

export default function StatsBar({ total, responseRate, interviews, offers }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <StatCard label="Total Applied"     value={total}              color="text-gray-800" />
      <StatCard label="Response Rate"     value={`${responseRate}%`} color="text-blue-600" />
      <StatCard label="Active Interviews" value={interviews}         color="text-yellow-500" />
      <StatCard label="Offers"            value={offers}             color="text-green-500" />
    </div>
  )
}
