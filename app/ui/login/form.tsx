"use client"
import { authentication } from "@/app/lib/authenticate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const router = useRouter();
    const [errors, setErrors] = useState<boolean>(false);
    const [checking, setChecking] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(true);
    
    const formAction = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setChecking(true);
        const formData = new FormData(e.currentTarget)
        const result = await authentication(formData);
        console.log("Result from Authentication => ", result);
        if (result?.success) {
            router.push("/portal/dashboard");
            setChecking(false);
        } else {
            setErrors(true);
            setChecking(false);
        }
    };

    const handleGoogleLogin = () => {
        // Implement Google OAuth login here
        console.log("Google login clicked");
        // You'll need to integrate with a Google OAuth provider
    };

    // We no longer using this function since we have direct button onClick handlers
    // but keeping it commented in case needed for future reference
    // const toggleForm = () => {
    //     setShowLogin(!showLogin);
    //     setErrors(false);
    // };
    
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
                        onClick={() => setShowLogin(true)}
                        className={`px-4 py-2 rounded-t-lg ${showLogin ? 'bg-sky-900 text-white' : 'bg-gray-200'}`}
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => setShowLogin(false)}
                        className={`px-4 py-2 rounded-t-lg ${!showLogin ? 'bg-sky-900 text-white' : 'bg-gray-200'}`}
                    >
                        Create Account
                    </button>
                </div>
                
                {showLogin ? (
                    <form onSubmit={formAction} className="flex flex-col border border-gray-300 rounded-lg mt-2 shadow-md p-4 sm:p-6 w-full">
                        <label className="text-md sm:text-lg font-medium mb-1">Email:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="email"
                            name="admin_email"
                            id="admin_email"
                            placeholder="Enter your email"
                            required
                        />
                        
                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Password:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                        />
                        
                        {errors && <p className="text-sm text-red-700 mt-2 ml-1">Invalid user-id or password.</p>}
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                            <button 
                                className={`text-md sm:text-lg font-semibold px-6 py-2 rounded-lg tracking-wide
                                ${checking ? 'bg-gray-300 text-gray-700' : 'bg-sky-900 text-white hover:bg-sky-800'}`} 
                                aria-disabled={checking} 
                                disabled={checking} 
                                type="submit"
                            >
                                {checking ? 'Logging In...' : 'Login'}
                            </button>
                            
                            <a href="#" className="text-sky-700 hover:text-sky-900 mt-3 sm:mt-0 text-sm">Forgot password?</a>
                        </div>
                        
                        <div className="mt-6 flex items-center justify-between">
                            <div className="border-t border-gray-300 w-full"></div>
                            <span className="text-sm text-gray-500 mx-4">OR</span>
                            <div className="border-t border-gray-300 w-full"></div>
                        </div>
                        
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 mt-4 hover:bg-gray-50"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                                    <path d="M21.35,11.1H12v3.2h5.59c-0.56,2.23-2.25,3.88-4.77,3.88c-2.94,0-5.32-2.38-5.32-5.32s2.38-5.32,5.32-5.32 c1.36,0,2.59,0.52,3.54,1.36l2.14-2.14c-1.52-1.41-3.5-2.28-5.68-2.28c-4.56,0-8.25,3.69-8.25,8.25s3.69,8.25,8.25,8.25 c4.38,0,8.25-3.13,8.25-8.25C21.4,11.98,21.38,11.54,21.35,11.1z" fill="#4285F4"></path>
                                    <path d="M9.9,4.25v3.25H13c0.3-0.9,0.75-1.71,1.33-2.38c-1.36-0.65-2.9-1.01-4.43-1.01V4.25z" fill="#EA4335"></path>
                                    <path d="M13,7.5H9.9v3.25h3.18C13.71,9.52,13.54,8.39,13,7.5z" fill="#FBBC05"></path>
                                    <path d="M9.9,10.75v3.25c1.44,0,2.8-0.31,4.02-0.85C13.37,12.4,13,11.18,13,10.75H9.9z" fill="#34A853"></path>
                                </g>
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                    </form>
                ) : (
                    <form className="flex flex-col border border-gray-300 rounded-lg mt-2 shadow-md p-4 sm:p-6 w-full">
                        <label className="text-md sm:text-lg font-medium mb-1">Full Name:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="text"
                            name="full_name"
                            id="full_name"
                            placeholder="Enter your full name"
                            required
                        />
                        
                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Email:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                        />
                        
                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Phone Number:</label>
                        <div className="flex">
                           
                            <input
                                className="bg-gray-200 px-3 py-2 rounded-r-lg shadow-md flex-1"
                                type="tel"
                                name="phone_number"
                                id="phone_number"
                                placeholder="Enter your number"
                                pattern="[0-10]{10}"
                                title="Please enter a valid 9-digit Kenyan phone number without country code"
                                required
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Use your active number for clients to reach you</p>
                        
                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Work Category:</label>
                        <select
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            name="work_category"
                            id="work_category"
                            required
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
                            <option value="other">Other</option>
                        </select>
                        
                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">County:</label>
                        <select
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            name="county"
                            id="county"
                            required
                        >
                            <option value="">-- Select your county --</option>
                            <option value="baringo">Baringo</option>
                            <option value="bomet">Bomet</option>
                            <option value="bungoma">Bungoma</option>
                            <option value="busia">Busia</option>
                            <option value="elgeyo_marakwet">Elgeyo Marakwet</option>
                            <option value="embu">Embu</option>
                            <option value="garissa">Garissa</option>
                            <option value="homa_bay">Homa Bay</option>
                            <option value="isiolo">Isiolo</option>
                            <option value="kajiado">Kajiado</option>
                            <option value="kakamega">Kakamega</option>
                            <option value="kericho">Kericho</option>
                            <option value="kiambu">Kiambu</option>
                            <option value="kilifi">Kilifi</option>
                            <option value="kirinyaga">Kirinyaga</option>
                            <option value="kisii">Kisii</option>
                            <option value="kisumu">Kisumu</option>
                            <option value="kitui">Kitui</option>
                            <option value="kwale">Kwale</option>
                            <option value="laikipia">Laikipia</option>
                            <option value="lamu">Lamu</option>
                            <option value="machakos">Machakos</option>
                            <option value="makueni">Makueni</option>
                            <option value="mandera">Mandera</option>
                            <option value="marsabit">Marsabit</option>
                            <option value="meru">Meru</option>
                            <option value="migori">Migori</option>
                            <option value="mombasa">Mombasa</option>
                            <option value="muranga">Murang&apos;a</option>
                            <option value="nairobi">Nairobi</option>
                            <option value="nakuru">Nakuru</option>
                            <option value="nandi">Nandi</option>
                            <option value="narok">Narok</option>
                            <option value="nyamira">Nyamira</option>
                            <option value="nyandarua">Nyandarua</option>
                            <option value="nyeri">Nyeri</option>
                            <option value="samburu">Samburu</option>
                            <option value="siaya">Siaya</option>
                            <option value="taita_taveta">Taita Taveta</option>
                            <option value="tana_river">Tana River</option>
                            <option value="tharaka_nithi">Tharaka Nithi</option>
                            <option value="trans_nzoia">Trans Nzoia</option>
                            <option value="turkana">Turkana</option>
                            <option value="uasin_gishu">Uasin Gishu</option>
                            <option value="vihiga">Vihiga</option>
                            <option value="wajir">Wajir</option>
                            <option value="west_pokot">West Pokot</option>
                        </select>
                        
                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Password:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="password"
                            name="new_password"
                            id="new_password"
                            placeholder="Create a password"
                            required
                        />
                        
                        <label className="text-md sm:text-lg font-medium mb-1 mt-4">Confirm Password:</label>
                        <input
                            className="bg-gray-200 px-3 py-2 rounded-lg shadow-md"
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="Confirm your password"
                            required
                        />
                        
                        <div className="mt-4">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" required />
                                <span className="text-sm">I agree to the Terms of Service and Privacy Policy</span>
                            </label>
                        </div>
                        
                        <button 
                            className="text-md sm:text-lg font-semibold mt-6 px-6 py-2 rounded-lg tracking-wide bg-sky-900 text-white hover:bg-sky-800"
                            type="submit"
                        >
                            Create Account
                        </button>
                        
                        <div className="mt-6 flex items-center justify-between">
                            <div className="border-t border-gray-300 w-full"></div>
                            <span className="text-sm text-gray-500 mx-4">OR</span>
                            <div className="border-t border-gray-300 w-full"></div>
                        </div>
                        
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 mt-4 hover:bg-gray-50"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                                    <path d="M21.35,11.1H12v3.2h5.59c-0.56,2.23-2.25,3.88-4.77,3.88c-2.94,0-5.32-2.38-5.32-5.32s2.38-5.32,5.32-5.32 c1.36,0,2.59,0.52,3.54,1.36l2.14-2.14c-1.52-1.41-3.5-2.28-5.68-2.28c-4.56,0-8.25,3.69-8.25,8.25s3.69,8.25,8.25,8.25 c4.38,0,8.25-3.13,8.25-8.25C21.4,11.98,21.38,11.54,21.35,11.1z" fill="#4285F4"></path>
                                    <path d="M9.9,4.25v3.25H13c0.3-0.9,0.75-1.71,1.33-2.38c-1.36-0.65-2.9-1.01-4.43-1.01V4.25z" fill="#EA4335"></path>
                                    <path d="M13,7.5H9.9v3.25h3.18C13.71,9.52,13.54,8.39,13,7.5z" fill="#FBBC05"></path>
                                    <path d="M9.9,10.75v3.25c1.44,0,2.8-0.31,4.02-0.85C13.37,12.4,13,11.18,13,10.75H9.9z" fill="#34A853"></path>
                                </g>
                            </svg>
                            <span>Sign up with Google</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
