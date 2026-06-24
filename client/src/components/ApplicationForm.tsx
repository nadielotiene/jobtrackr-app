import React, { useState } from 'react';
import type { Application, CreateApplicationInput, Status } from '../types';
import { useCreateApplication, useUpdateApplication } from '../hooks/useApplications';

interface Props {
	onClose: () => void
	existing?: Application // if passed, we're editing instead of creating
}

export default function ApplicationForm({ onClose, existing }: Props) {
	const [company, setCompany]          = useState(existing?.company ?? '');
	const [role, setRole]                = useState(existing?.role ?? '');
	const [status, setStatus]            = useState<Status>(existing?.status ?? 'applied');
	const [jobUrl, setJobUrl]            = useState(existing?.jobUrl ?? '');
	const [appliedDate, setAppliedDate]  = useState(
		existing?.appliedDate?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)
		// slice(0,10) trims the ISO string to just YYYY-MM-DD for the date input
	);
	const [notes, setNotes]              = useState(existing?.notes ?? '');
	const [contactName, setContactName]  = useState(existing?.contactName ?? '');

	const create = useCreateApplication();
	const update = useUpdateApplication();
	const isPending = create.isPending || update.isPending;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const data: CreateApplicationInput = {
			company, role, status, appliedDate,
			jobUrl: jobUrl || undefined,
			notes: notes || undefined,
			contactName: contactName || undefined,
		};

		if (existing) {
			update.mutate({ id: existing.id, data}, { onSuccess: onClose });
		} else {
			create.mutate(data, { onSuccess: onClose });
		}
	}

	return (
		// Backdrop
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
			{/* inset-0 = covers full screen | bg-black/40 = 40% opacity black overlay */}
			<div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
				<h2 className="text-lg font-semibold text-gray-800 mb-4">
					{existing ? 'Edit Application' : 'Add Application'}
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						{/* grid-cols-2 = two columns side by side */}
						<div>
							<label className="block text-sm font-mediium text-gray-700 mb-1">Company *</label>
							<input 
								value={company}
								onChange={(e) => setCompany(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
								required
								/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
							<input 
								value={role}
								onChange={(e) => setRole(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
								required
								/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value as Status)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="applied">Applied</option>
								<option value="interview">Interview</option>
								<option value="offer">Offer</option>
								<option value="rejected">Rejected</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Applied Date *</label>
							<input 
								type="date"
								value={appliedDate}
								onChange={(e) => setAppliedDate(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
								required
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Job URL</label>
						<input 
							type="url" 
							value={jobUrl}
							onChange={(e) => setJobUrl(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
							placeholder="https://..."
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
						<input 
							value={contactName}
							onChange={(e) => setContactName(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
							placeholder="Recruiter or hiring manager"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
						<textarea 
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							rows={3}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
							placeholder="Any notes about this application..."
						/>
					</div>

					<div className="flex justify-end gap-3 pt-2">
						<button 
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-xsm text-gray-600 hover:text-gray-800"
						>
							Cancel
						</button>
						<button 
							type="submit"
							disabled={isPending}
							className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
						>
							{isPending ? 'Saving...' : existing ? 'Save Changes' : 'Add Application'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
