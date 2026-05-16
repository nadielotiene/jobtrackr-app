import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplications, useDeleteApplication } from '../hooks/useApplications';
import StatusBadge from '../components/StatusBadge';
import ApplicationForm from '../components/ApplicationForm'
import type { Application } from '../types';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: applications, isLoading } = useApplications();
  const deleteApp = useDeleteApplication();

  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState<Application | undefined>();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">JobTrackr</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setEditing(undefined); setShowForm(true) }}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Application
          </button>
          <button 
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* mx-auto = center horizontally | max-w-5xl = cap the width */}

        {isLoading && (
          <p className="text-gray-400 text-sm">Loading...</p>
        )}

        {!isLoading && applications?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No applications yet</p>
            <p className="text-gray-300 text-sm mt-1">Click "Add Application" to get started</p>
          </div>
        )}

        {/* Applications table */}
        {applications && applications.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Company</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Role</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Applied</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Notes</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* divide-y = adds a border between each row */}
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{app.company}</td>
                    <td className="px-4 py3 text-gray-600">{app.role}</td>
                    <td className="px-4 py3">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-400 max-w-xs-truncate">
                      {/* truncate = cuts off long text with "..." */}
                      {app.notes ?? '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-end">
                        <button 
                          onClick={() => { setEditing(app); setShowForm(true) }}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => { 
                            if (confirm(`Delete ${app.company}?`)) {
                              deleteApp.mutate(app.id)
                            }
                          }}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {showForm && (
        <ApplicationForm
          existing={editing}
          onClose={() => { setShowForm(false); setEditing(undefined) }}
        />
      )}
    </div>
  )
}