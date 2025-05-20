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

// New component for email verification message
function EmailVerificationMessage({ email }: { email: string }) {
    return (
        <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-green-500">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                                    <p className="text-gray-600 mb-6">
                    We&apos;ve sent a verification link to <span className="font-semibold">{email}</span>. 
                    Please check your inbox and click the link to verify your account.
                </p>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-md w-full mb-6">
                    <p className="text-sm text-blue-800">
                        <span className="font-medium">Note:</span> You need to verify your email before you can post a job.
                    </p>
                </div>
                <div className="text-gray-600 text-sm">
                    <p>Didn't receive the email? Check your spam folder or</p>
                    <button className="text-sky-700 hover:text-sky-900 font-medium mt-2">
                        Resend verification email
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function ClientRegisterForm() {
    const router = useRouter() // We'll keep this for potential future navigation needs
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        whatsappNumber: '',
        county: '',
        subcounty: '',
        location: '',
    })
    
    // States to handle show password toggle
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    // State to handle whatsapp same as phone
    const [whatsappSameAsPhone, setWhatsappSameAsPhone] = useState(false)
    
    // State to track whether registration is complete and we should show verification message
    const [registrationComplete, setRegistrationComplete] = useState(false)

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type })
    }

    const closeToast = () => {
        setToast(null)
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        
        // If whatsapp is set to same as phone, update it when phone changes
        if (name === 'phone' && whatsappSameAsPhone) {
            setFormData(prev => ({ ...prev, whatsappNumber: value }))
        }
    }
    
    const handleWhatsappToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked
        setWhatsappSameAsPhone(isChecked)
        
        if (isChecked) {
            setFormData(prev => ({ ...prev, whatsappNumber: prev.phone }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Password validation
        if (!passwordRegex.test(formData.password)) {
            showToast('Password must be at least 6 characters long, include uppercase, lowercase, a number, and a special character.', 'error')
            setLoading(false)
            return
        }

        if (formData.password !== formData.confirmPassword) {
            showToast('Passwords do not match.', 'error')
            setLoading(false)
            return
        }

        // Create payload for client registration
        const payload = {
            full_name: formData.name,
            email: formData.email,
            phone_number: formData.phone,
            whatsapp_number: formData.whatsappNumber,
            password: formData.password,
            county: formData.county,
            subcounty: formData.subcounty,
            location: formData.location
        }

        try {
            const res = await fetch('/api/client/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const result = await res.json()
                showToast(result.message || 'Something went wrong.', 'error')
            } else {
                showToast('Account created successfully! Please verify your email.', 'success')
                
                // Instead of redirecting, set registration complete to true
                setRegistrationComplete(true)
            }
        } catch {
            showToast('Network error. Please check your connection.', 'error')
        } finally {
            setLoading(false)
        }
    }

    if (registrationComplete) {
        return (
            <div className="container mx-auto w-full px-4 sm:px-6 min-h-screen flex flex-col items-center justify-center py-6 sm:py-10">
                <EmailVerificationMessage email={formData.email} />
            </div>
        )
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
                        alt="Kazibase - Client Registration"
                        priority
                    />

                    <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold capitalize text-sky-900 border-b border-orange-500 px-1 pb-1 text-center'>
                        Client Registration
                    </h2>
                    {/* Safety Disclaimer */}
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="text-sm font-semibold text-yellow-800 mb-2">Create account to post your job</h4>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col border border-gray-300 rounded-lg mt-4 shadow-md p-4 sm:p-6 w-full">
                        <label className="text-md sm:text-lg font-medium mb-1">Full Name:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your full name"
                            value={formData.name}
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
                            value={formData.email}
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
                            value={formData.phone}
                            required
                            onChange={handleChange}
                        />
                        
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                id="whatsappSameAsPhone"
                                checked={whatsappSameAsPhone}
                                onChange={handleWhatsappToggle}
                                className="mr-2"
                            />
                            <label htmlFor="whatsappSameAsPhone" className="text-sm">
                                WhatsApp number is same as phone number
                            </label>
                        </div>

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">WhatsApp Number:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="tel"
                            name="whatsappNumber"
                            id="whatsappNumber"
                            placeholder="Enter your WhatsApp number"
                            value={formData.whatsappNumber}
                            required
                            onChange={handleChange}
                            disabled={whatsappSameAsPhone}
                        />

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">County:</label>
                        <select
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            name="county"
                            id="county"
                            value={formData.county}
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

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Sub-County:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="text"
                            name="subcounty"
                            id="subcounty"
                            placeholder="Enter your sub-county"
                            value={formData.subcounty}
                            required
                            onChange={handleChange}
                        />

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Location/Area:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Enter your specific location/area"
                            value={formData.location}
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
                                placeholder="Create a password"
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
                        <p className="text-xs text-gray-600 mt-1">
                            Password must contain at least 6 characters, including uppercase, lowercase, a number, and a special character.
                        </p>

                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Confirm Password:</label>
                        <div className="relative">
                            <input
                                className="bg-gray-200 px-3 py-2 rounded-lg shadow-md w-full"
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
                            >
                                {showConfirmPassword ? (
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

                        <button
                            className={`text-md sm:text-lg font-semibold mt-6 px-6 py-2 rounded-lg tracking-wide
                            ${loading ? 'bg-gray-300 text-gray-700' : 'bg-sky-900 text-white hover:bg-sky-800'}`}
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? 'Registering...' : 'Register as Client'}
                        </button>
                        
                        <p className="text-center mt-4 text-sm text-gray-600">
                            Already have an account? <a href="/clientlogin" className="text-sky-700 hover:text-sky-900">Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
