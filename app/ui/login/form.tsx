// app/components/LoginForm.tsx
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

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      const result = await res.json()
      alert(result.message || 'Something went wrong.')
    } else {
      alert(res.status === 200 ? (tab === 'login' ? 'Login successful!' : 'Account created!') : 'Something went wrong')
      if (tab === 'login') router.push('/portal/dashboard')
      else setTab('login')
    }
 } catch {
    alert('Network error.'); // No need to define 'err' here anymore
  } finally {
    setLoading(false);
  }
}

    
  return (
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
