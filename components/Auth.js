"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const response = isLogin
            ? await login(email, password)
            : await signup(username, email, password);

        setLoading(false);

        if (!response.success) {
            setError(response.error || `An unknown error occurred during ${isLogin ? 'login' : 'signup'}.`);
        } else if (!isLogin) {
            // After successful signup, switch to login view with a success message
            setIsLogin(true);
            setError('Signup successful! Please log in.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex justify-center">
                     <Image src="/csway-logo.png" alt="CSway Logo" width={48} height={48} />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    {isLogin ? 'Welcome Back!' : 'Create an Account'}
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>

                    {error && <p className="text-sm text-center text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 font-bold text-white bg-csway-green rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-csway-green/50 disabled:bg-csway-green/40 flex items-center justify-center"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="ml-1 font-medium text-csway-orange hover:underline">
                        {isLogin ? 'Sign up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};