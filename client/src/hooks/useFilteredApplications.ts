import { useMemo } from 'react'
import type { Application, Status } from '../types'
import { useApplications } from './useApplications';
import { useSearchParams } from 'react-router-dom';

interface Filters {
  search: string
  statusFilter: Status | 'all'
  sortBy: 'date' | 'status'
}

const STATUS_ORDER: Record<Status, number> = {
  interview: 0,
  offer:     1,
  applied:   2,
  rejected:  3,
}

export const useFilteredApplications = (
  applications: Application[] = [],
  { search, statusFilter, sortBy }: Filters
) => {
  return useMemo(() => {
    let filtered = [...applications]

    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (a) =>
          a.company.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q)
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((a) => a.status === statusFilter)
    }

    filtered.sort((a, b) => {
      if (sortBy === 'status') {
        return STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
      }
      return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    })

    return filtered
  }, [applications, search, statusFilter, sortBy])
}
