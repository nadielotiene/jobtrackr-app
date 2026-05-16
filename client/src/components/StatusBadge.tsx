import type { Status } from '../types'

const styles: Record<Status, string> = {
	applied:   'bg-blue-100 text-blue-700',
	interview: 'bg-yellow-100 text-ywllow-700',
	offer:     'bg-blue-green text-green-700',
	rejected:  'bg-red-100 text-red-700',
}

const labels: Record<Status, string> = {
	applied:   'Applied',
	interview: 'Interview',
	offer:     'Offer',
	rejected:  'Rejected',
}

export default function StatusBadge({ status }: { status: Status }) {
	return (
		<span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
			{/* rounded-full = pill shape | text-xs = small text */}
			{labels[status]}
		</span>
	)
}
