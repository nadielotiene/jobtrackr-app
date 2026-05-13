import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const login = useLogin();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login.mutate({ email, password });
	}

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			{/* min-h-screen = height: 100vh | flex + items-center + justify-center = perfect centering */}
			<div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome back</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
				{/* space-y-4 = adds vertical gap between children */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Email
					</label>
					<input 
						type="text" 
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

				{login.isError && (
					<p className="text-red-500 text-sm">Invalid email or password</p>
				)}

				<button 
					type="submit"
					disabled={login.isPending}
					className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          // disabled:opacity-50 = dims button while loading
          // transition-colors = smooth hover animation
					>
						{login.isPending ? 'Signing in...' : 'Sign in'}
					</button>
				</form>

				<p className="mt-4 text-sm text-gray-500 text-center">
					No account?{' '}
					<Link to="/register" className="text-blue-600 hover:underline">
						Register
					</Link>
				</p>
			</div>
		</div>
	)
}