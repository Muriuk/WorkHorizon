// app/components/ClientLoginForm.tsx
'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Toast notification component
interface ToastProps {
    message: string
    type: 'success' | 'error'
    onClose: () => void
}

function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 5000) // Auto-close after 5 seconds

        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div
            className={`fixed top-4 right-4 z-50 max-w-sm w-full sm:max-w-xs animate-slide-in-right
                ${type === 'success' 
                    ? 'bg-green-500 border-green-600' 
                    : 'bg-red-500 border-red-600'
                } 
                text-white p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 ease-in-out`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {type === 'success' ? (
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    )}
                    <span className="text-sm font-medium">{message}</span>
                </div>
                <button
                    onClick={onClose}
                    className="ml-2 text-white hover:text-gray-200 transition-colors duration-200"
                    aria-label="Close notification"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default function ClientLoginForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    
    // State to handle show password toggle
    const [showPassword, setShowPassword] = useState(false)
    
    // State to handle remember me option
    const [rememberMe, setRememberMe] = useState(false)

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type })
    }

    const closeToast = () => {
        setToast(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    
    const handleRememberMeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/client/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    remember: rememberMe
                }),
            })

            if (!res.ok) {
                const result = await res.json()
                showToast(result.message || 'Invalid email or password.', 'error')
            } else {
                showToast('Login successful! Redirecting...', 'success')
                
                // Redirect to dashboard after successful login
                setTimeout(() => {
                    router.push('/dashboard')
                }, 1500)
            }
        } catch {
            showToast('Network error. Please check your connection.', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Toast notifications */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}
    
            <div className="container mx-auto w-full px-4 sm:px-6 min-h-screen flex flex-col items-center justify-top py-6 sm:py-10">
                <div className="w-full max-w-md">
                    <Image
                        src={'/assets/login-anime.png'}
                        className="w-full h-auto mb-6 sm:mb-8"
                        width={3000}
                        height={1000}
                        alt="Kazibase - Client Login"
                        priority
                    />

                    <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold capitalize text-sky-900 border-b border-orange-500 px-1 pb-1 text-center'>
                        Client Login
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col border border-gray-300 rounded-lg mt-4 shadow-md p-4 sm:p-6 w-full">
                        <label className="text-md sm:text-lg font-medium mb-1">Email:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                        />

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Password:</label>
                        <div className="relative">
                            <input
                                className="bg-gray-200 px-3 py-2 rounded-lg shadow-md w-full"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                required
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                {showPassword ? (
                                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 4a6 6 0 00-6 6c0 2.867 1.867 5.334 4.5 7.037L10 18l1.5-4.963A6.002 6.002 0 0010 4zM10 10a4 4 0 01-4-4c0-1.5.75-2.833 1.957-3.85L10 8l2.043-5.85C13.25 6.167 14 7.833 14 10a4 4 0 01-4 4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 4a6 6 0 00-6 6c0 2.867 1.867 5.334 4.5 7.037L10 18l1.5-4.963A6.002 6.002 0 0010 4zM10 10a4 4 0 01-4-4c0-1.5.75-2.833 1.957-3.85L10 8l2.043-5.85C13.25 6.167 14 7.833 14 10a4 4 0 01-4 4z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={handleRememberMeToggle}
                                    className="mr-2"
                                />
                                <label htmlFor="rememberMe" className="text-sm">
                                    Remember me
                                </label>
                            </div>
                            <a href="/forgot-password" className="text-sm text-sky-700 hover:text-sky-900">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            className={`text-md sm:text-lg font-semibold mt-6 px-6 py-2 rounded-lg tracking-wide
                            ${loading ? 'bg-gray-300 text-gray-700' : 'bg-sky-900 text-white hover:bg-sky-800'}`}
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        
                        <p className="text-center mt-4 text-sm text-gray-600">
                            Don&apos;t have an account? <a href="/clientregister" className="text-sky-700 hover:text-sky-900">Register here</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
