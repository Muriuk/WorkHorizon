// app/components/LoginForm.tsx
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

export default function LoginForm() {
    const router = useRouter()
    const [tab, setTab] = useState<'login' | 'register'>('login')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        category: '',
        county: '',
    })

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type })
    }

    const closeToast = () => {
        setToast(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (tab === 'register' && formData.password !== formData.confirmPassword) {
            showToast('Passwords do not match.', 'error')
            setLoading(false)
            return
        }

        const endpoint = tab === 'login' ? '/api/login' : '/api/register'

        const payload = tab === 'login'
            ? { email: formData.email, password: formData.password }
            : {
                full_name: formData.name,
                email: formData.email,
                phone_number: formData.phone,
                password: formData.password,
                work_category: formData.category,
                county: formData.county,
            }

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const result = await res.json()
                showToast(result.message || 'Something went wrong.', 'error')
            } else {
                const successMessage = tab === 'login' ? 'Login successful!' : 'Account created successfully!'
                showToast(successMessage, 'success')
                
                if (tab === 'login') {
                    // Delay navigation slightly to show the toast
                    setTimeout(() => {
                        router.push('/portal/dashboard')
                    }, 1000)
                } else {
                    setTab('login')
                    // Clear form data after successful registration
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        phone: '',
                        category: '',
                        county: '',
                    })
                }
            }
        } catch {
            showToast('Network error. Please check your connection.', 'error')
        } finally {
            setLoading(false)
        }
    }
    
    return (
        
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
                    alt="Kazibase - Login page"
                    priority
                />

                <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold capitalize text-sky-900 border-b border-orange-500 px-1 pb-1 text-center'>
                    {`Welcome to Kazibase Portal`}
                </h2>

                <div className="mt-4 flex gap-2 justify-center">
                    <button
                        onClick={() => setTab('login')}
                        className={`px-4 py-2 rounded-t-lg ${tab === 'login' ? 'bg-sky-900 text-white' : 'bg-gray-200'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setTab('register')}
                        className={`px-4 py-2 rounded-t-lg ${tab === 'register' ? 'bg-sky-900 text-white' : 'bg-gray-200'}`}
                    >
                        Create Account
                    </button>
                </div>

                {tab === 'login' ? (
                    <form onSubmit={handleSubmit} className="flex flex-col border border-gray-300 rounded-lg mt-2 shadow-md p-4 sm:p-6 w-full">
                        <label className="text-md sm:text-lg font-medium mb-1">Email:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            onChange={handleChange}
                        />

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Password:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                            onChange={handleChange}
                        />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                            <button
                                className={`text-md sm:text-lg font-semibold px-6 py-2 rounded-lg tracking-wide
                                ${loading ? 'bg-gray-300 text-gray-700' : 'bg-sky-900 text-white hover:bg-sky-800'}`}
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? 'Logging In...' : 'Login'}
                            </button>

                            <a href="#" className="text-sky-700 hover:text-sky-900 mt-3 sm:mt-0 text-sm">Forgot password?</a>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col border border-gray-300 rounded-lg mt-2 shadow-md p-4 sm:p-6 w-full">
                        <label className="text-md sm:text-lg font-medium mb-1">Full Name:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your full name"
                            required
                            onChange={handleChange}
                        />

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Email:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            onChange={handleChange}
                        />

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Phone Number:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="Enter your phone number"
                            required
                            onChange={handleChange}
                        />

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Work Category:</label>
                        <select
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            name="category"
                            id="category"
                            required
                            onChange={handleChange}
                        >
                            <option value="">-- Select work you can do --</option>
                            <option value="construction">Construction Worker</option>
                            <option value="plumbing">Plumber</option>
                            <option value="electrical">Electrician</option>
                            <option value="carpentry">Carpenter</option>
                            <option value="painting">Painter</option>
                            <option value="cleaning">Cleaner</option>
                            <option value="gardening">Gardener</option>
                            <option value="driving">Driver</option>
                            <option value="delivery">Delivery Personnel</option>
                            <option value="mechanic">Mechanic</option>
                            <option value="cooking">Cook/Chef</option>
                            <option value="tailoring">Tailor</option>
                            <option value="welding">Welder</option>
                            <option value="hair_beauty">Hair & Beauty</option>
                            <option value="security">Security Guard</option>
                            <option value="farming">Farm Worker</option>
                        </select>

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">County:</label>
                        <select
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            name="county"
                            id="county"
                            required
                            onChange={handleChange}
                        >
                            <option value="">-- Select your county --</option>
                            <option value="Baringo">Baringo</option>
                            <option value="Bomet">Bomet</option>
                            <option value="Bungoma">Bungoma</option>
                            <option value="Busia">Busia</option>
                            <option value="Elgeyo-Marakwet">Elgeyo-Marakwet</option>
                            <option value="Embu">Embu</option>
                            <option value="Garissa">Garissa</option>
                            <option value="Homa Bay">Homa Bay</option>
                            <option value="Isiolo">Isiolo</option>
                            <option value="Kajiado">Kajiado</option>
                            <option value="Kakamega">Kakamega</option>
                            <option value="Kericho">Kericho</option>
                            <option value="Kiambu">Kiambu</option>
                            <option value="Kilifi">Kilifi</option>
                            <option value="Kirinyaga">Kirinyaga</option>
                            <option value="Kisii">Kisii</option>
                            <option value="Kisumu">Kisumu</option>
                            <option value="Kitui">Kitui</option>
                            <option value="Kwale">Kwale</option>
                            <option value="Laikipia">Laikipia</option>
                            <option value="Lamu">Lamu</option>
                            <option value="Machakos">Machakos</option>
                            <option value="Makueni">Makueni</option>
                            <option value="Mandera">Mandera</option>
                            <option value="Marsabit">Marsabit</option>
                            <option value="Meru">Meru</option>
                            <option value="Migori">Migori</option>
                            <option value="Mombasa">Mombasa</option>
                            <option value="Muranga">Muranga</option>
                            <option value="Nairobi">Nairobi</option>
                            <option value="Nakuru">Nakuru</option>
                            <option value="Nandi">Nandi</option>
                            <option value="Narok">Narok</option>
                            <option value="Nyamira">Nyamira</option>
                            <option value="Nyandarua">Nyandarua</option>
                            <option value="Nyeri">Nyeri</option>
                            <option value="Samburu">Samburu</option>
                            <option value="Siaya">Siaya</option>
                            <option value="Taita-Taveta">Taita-Taveta</option>
                            <option value="Tana River">Tana River</option>
                            <option value="Tharaka-Nithi">Tharaka-Nithi</option>
                            <option value="Trans Nzoia">Trans Nzoia</option>
                            <option value="Turkana">Turkana</option>
                            <option value="Uasin Gishu">Uasin Gishu</option>
                            <option value="Vihiga">Vihiga</option>
                            <option value="Wajir">Wajir</option>
                            <option value="West Pokot">West Pokot</option>
                        </select>

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Password:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Create a password"
                            required
                            onChange={handleChange}
                        />

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Confirm Password:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            required
                            onChange={handleChange}
                        />

                        <button
                            className="text-md sm:text-lg font-semibold mt-6 px-6 py-2 rounded-lg tracking-wide bg-sky-900 text-white hover:bg-sky-800"
                            type="submit"
                        >
                            Create Account
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
