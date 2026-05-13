import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const register = useRegister();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		register.mutate({ email, password });
	}

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">Create aAccount</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Email
					</label>
					<input 
						type="email" 
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="you@example.com"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Password
					</label>
					<input 
						type="password"
						value={password}
						onChange ={(e) => setPassword(e.target.value)}
						className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
						placeholder="••••••••"
						required
					/>
				</div>

				{register.isError && (
					<p className="text-red-500 text-sm">Email already in use</p>
				)}

				<button 
					type="submit"
					disabled={register.isPending}
					className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
					>
						{register.isPending ? 'Creating account...' : 'Create account'}
					</button>
				</form>

				<p className="mt-4 text-sm text-gray-500 text-center">
					Already have an account?{' '}
					<Link to="/login" className="text-blue-600 hover:underline">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	)
}