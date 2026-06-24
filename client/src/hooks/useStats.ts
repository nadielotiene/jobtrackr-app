import type { Application } from '../types'

export const useStats = (applications: Application[] = []) => {
  const total = applications.length

  const interviews = applications.filter((a) => a.status === 'interview').length

  const offers = applications.filter((a) => a.status === 'offer').length

  const responded = applications.filter(
    (a) => a.status !== 'applied'
  ).length

  const responseRate = total === 0 ? 0 : Math.round((responded / total) * 100)

  return { total, interviews, offers, responseRate }
}