// app/components/RegisterForm.tsx
'use client'

import Image from "next/image"
import { useState, useEffect } from "react"

import Link from "next/link"

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

export default function RegisterForm() {
   
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
    
    // States to handle show password toggle
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type })
    }

    const closeToast = () => {
        setToast(null)
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Ensure phone number starts with +254 and has correct format
        let value = e.target.value
        if (!value.startsWith('+254') && value.length > 0) {
            if (value.startsWith('0')) {
                value = '+254' + value.substring(1)
            } else if (value.startsWith('254')) {
                value = '+' + value
            } else if (value.startsWith('7')) {
                value = '+254' + value
            }
        }
        setFormData({ ...formData, phone: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Validate phone number format
        const phoneRegex = /^\+254[17]\d{8}$/
        if (!phoneRegex.test(formData.phone)) {
            showToast('Please enter a valid Kenyan phone number starting with +254 followed by 9 digits', 'error')
            setLoading(false)
            return
        }

        // Password validation
        if (!passwordRegex.test(formData.password)) {
            showToast('Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.', 'error')
            setLoading(false)
            return
        }

        if (formData.password !== formData.confirmPassword) {
            showToast('Passwords do not match.', 'error')
            setLoading(false)
            return
        }

        if (!acceptedTerms || !acceptedPrivacy) {
            showToast('You must accept both Terms of Service and Privacy Policy to register.', 'error')
            setLoading(false)
            return
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: formData.name,
                    email: formData.email,
                    phone_number: formData.phone,
                    password: formData.password,
                    work_category: formData.category,
                    county: formData.county,
                }),
            })

            if (!res.ok) {
                const result = await res.json()
                showToast(result.message || 'Something went wrong.', 'error')
            } else {
                showToast('Account created successfully! Redirecting to login...', 'success')
                
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

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push('/login')
                }, 3000)
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
                        alt="Kazibase - Registration page"
                        priority
                    />

                    <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold capitalize text-sky-900 border-b border-orange-500 px-1 pb-1 text-center'>
                        Create Your Account
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col border border-gray-300 rounded-lg mt-6 shadow-md p-4 sm:p-6 w-full">
                        <label className="text-md sm:text-lg font-medium mb-1">Full Name:</label>
                        <input
                            className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your full name"
                            required
                            onChange={handleChange}
                            value={formData.name}
                        />

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Email:</label>
                        <input
                            className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            onChange={handleChange}
                            value={formData.email}
                        />

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Phone Number:</label>
                        <div className="relative">
                            <input
                                className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all w-full"
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="+254XXXXXXXXX"
                                required
                                onChange={handlePhoneChange}
                                value={formData.phone}
                                pattern="^\+254[17]\d{8}$"
                                title="Enter a valid Kenyan phone number starting with +254"
                            />
                            {formData.phone && !formData.phone.startsWith('+254') && (
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-red-500">
                                    Format: +254...
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Enter your active Kenyan phone number starting with +254</p>

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Work Category:</label>
                        <select
                            className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            name="category"
                            id="category"
                            required
                            onChange={handleChange}
                            value={formData.category}
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
                            className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            name="county"
                            id="county"
                            required
                            onChange={handleChange}
                            value={formData.county}
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
                        <div className="relative">
                            <input
                                className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all w-full"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Create a password"
                                value={formData.password}
                                required
                                onChange={handleChange}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                        {passwordFocused && (
                            <div className="mt-2 p-2 bg-gray-50 rounded-lg text-sm text-gray-600">
                                <p className="font-medium">Password Requirements:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li className={formData.password.length >= 8 ? 'text-green-500' : ''}>
                                        Minimum 8 characters
                                    </li>
                                    <li className={/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}>
                                        At least one uppercase letter
                                    </li>
                                    <li className={/[a-z]/.test(formData.password) ? 'text-green-500' : ''}>
                                        At least one lowercase letter
                                    </li>
                                    <li className={/\d/.test(formData.password) ? 'text-green-500' : ''}>
                                        At least one number
                                    </li>
                                    <li className={/[@$!%*?&]/.test(formData.password) ? 'text-green-500' : ''}>
                                        At least one special character (@$!%*?&)
                                    </li>
                                </ul>
                            </div>
                        )}

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Confirm Password:</label>
                        <div className="relative">
                            <input
                                className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all w-full"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                required
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? (
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                                        checked={acceptedTerms}
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-medium text-gray-700">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-sky-600 hover:text-sky-500">
                                            Terms of Service
                                        </Link>
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="privacy"
                                        name="privacy"
                                        type="checkbox"
                                        className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                                        checked={acceptedPrivacy}
                                        onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="privacy" className="font-medium text-gray-700">
                                        I agree to the{' '}
                                        <Link href="/privacy" className="text-sky-600 hover:text-sky-500">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            className={`text-md sm:text-lg font-semibold mt-6 px-6 py-3 rounded-lg tracking-wide transition-colors duration-300
                                ${loading 
                                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
                                    : 'bg-sky-700 text-white hover:bg-sky-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                }`}
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <div className="mt-4 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-sky-600 hover:text-sky-500">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
