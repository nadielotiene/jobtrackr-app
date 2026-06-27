import type { Status } from '../types';

interface Props {
  search: string 
  onSearchChange: (val: string) => void
  statusFilter: Status | 'all'
  onStatusChange: (val: Status | 'all') => void
  sortBy: 'date' | 'status'
  onSortChange: (val: 'date' | 'status') => void
}

export default function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
}: Props) {
  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      <input 
        type="text"
        placeholder="Search company or role..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-48 focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />

      <select 
        value={statusFilter} 
        onChange={(e) => onStatusChange(e.target.value as Status | 'all')}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
        >
        <option value="all">All Statuses</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as 'date' | 'status')}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
      >
        <option value="date">Sort by Date</option>
        <option value="status">Sort by Status</option>
      </select>
    </div>
  )
}
