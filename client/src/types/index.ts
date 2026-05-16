export type Status = 'applied' | 'interview' | 'offer' | 'rejected'

export interface Application {
    id: string
    userId: string
    company: string
    role: string
    status: Status
    jobUrl: string | null
    appliedDate: string
    notes: string | null
    contactName: string |null
    followUpdate: string | null
    createdAt: string
}

export interface CreateApplicationInput {
    company: string
    role: string
    status: Status
    jobUrl?: string
    appliedDate: string
    notes?: string
    contactName?: string
    followUpDate?: string
}