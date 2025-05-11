'use client'

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const router = useRouter()
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    category: '',
    county: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register'

    // Basic validation
    if (tab === 'register' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.')
      setLoading(false)
      return
    }

    // Strip unused fields
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

      const result = await res.json()
      if (!res.ok) {
        alert(result.message || 'Something went wrong.')
      } else {
        alert(tab === 'login' ? 'Login successful!' : 'Account created!')
        if (tab === 'login') router.push('/portal/dashboard')
        else setTab('login')
      }
    } catch {
      alert('Network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto w-full px-4 sm:px-6 min-h-screen flex flex-col items-center justify-top py-6 sm:py-10">
      <div className="w-full max-w-md">
        <Image
          src="/assets/login-anime.png"
          width={3000}
          height={1000}
          alt="Kazibase - Login page"
          className="w-full h-auto mb-6 sm:mb-8"
          priority
        />

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold capitalize text-sky-900 border-b border-orange-500 px-1 pb-1 text-center">
         <h2>Welcome to Kazibase&apos;s Portal</h2>
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

        {/* Login Form */}
        {tab === 'login' ? (
          <form onSubmit={handleSubmit} className="flex flex-col border border-gray-300 rounded-lg mt-2 shadow-md p-4 sm:p-6 w-full">
            <label className="text-md sm:text-lg font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
              required
              onChange={handleChange}
            />

            <label className="text-md sm:text-lg font-medium mb-1 mt-4">Password:</label>
            <input
              type="password"
              name="password"
              className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
              required
              onChange={handleChange}
            />

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`text-md sm:text-lg font-semibold px-6 py-2 rounded-lg tracking-wide ${
                  loading ? 'bg-gray-300 text-gray-700' : 'bg-sky-900 text-white hover:bg-sky-800'
                }`}
              >
                {loading ? 'Logging In...' : 'Login'}
              </button>
              <a href="#" className="text-sky-700 hover:text-sky-900 mt-3 sm:mt-0 text-sm">Forgot password?</a>
            </div>
          </form>
        ) : (
          // Register Form
          <form onSubmit={handleSubmit} className="flex flex-col border border-gray-300 rounded-lg mt-2 shadow-md p-4 sm:p-6 w-full">
            <label className="text-md sm:text-lg font-medium mb-1">Full Name:</label>
            <input type="text" name="name" required onChange={handleChange} className="bg-gray-200 px-3 py-2 rounded-lg shadow-md" />

            <label className="mt-4 text-md sm:text-lg font-medium mb-1">Email:</label>
            <input type="email" name="email" required onChange={handleChange} className="bg-gray-200 px-3 py-2 rounded-lg shadow-md" />

            <label className="mt-4 text-md sm:text-lg font-medium mb-1">Phone Number:</label>
            <input type="tel" name="phone" required onChange={handleChange} className="bg-gray-200 px-3 py-2 rounded-lg shadow-md" />

            <label className="mt-4 text-md sm:text-lg font-medium mb-1">Work Category:</label>
            <select name="category" required onChange={handleChange} className="bg-gray-200 px-3 py-2 rounded-lg shadow-md">
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

            <label className="mt-4 text-md sm:text-lg font-medium mb-1">County:</label>
            <select name="county" required onChange={handleChange} className="bg-gray-200 px-3 py-2 rounded-lg shadow-md">
              <option value="">-- Select your county --</option>
              <option value="Murang&#39;a">Murang'a</option>
              {/* All other counties here as you've already listed */}
            </select>

            <label className="mt-4 text-md sm:text-lg font-medium mb-1">Password:</label>
            <input type="password" name="password" required onChange={handleChange} className="bg-gray-200 px-3 py-2 rounded-lg shadow-md" />

            <label className="mt-4 text-md sm:text-lg font-medium mb-1">Confirm Password:</label>
            <input type="password" name="confirmPassword" required onChange={handleChange} className="bg-gray-200 px-3 py-2 rounded-lg shadow-md" />

            <button type="submit" className="text-md sm:text-lg font-semibold mt-6 px-6 py-2 rounded-lg tracking-wide bg-sky-900 text-white hover:bg-sky-800">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
