'use client'

import JobsPage from '@/app/ui/jobspage/form';
import { signOut } from "next-auth/react"

export default function DashboardBody() {
    return (
        <div className='relative bg-gray-50 min-h-screen'>
            {/* Mobile-only Sign Out Button */}
            <button  
                onClick={() => signOut({ callbackUrl: '/portal' })} 
                className="block lg:hidden absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md z-50 transition-all duration-200 font-medium"
            >
                Sign Out
            </button>
            
            {/* Main Dashboard Container */}
            <div className='container mx-auto px-4 pt-8 pb-20'>
                {/* Welcome Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome Back, Worker!
                    </h1>
                    <p className="text-gray-600">Find your next opportunity</p>
                </div>
                
                {/* Worker Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-8a2 2 0 00-2 2v2m12 0H8m8 0l-1.5 6-1.5-6H8m8 0a2 2 0 002 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h8z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-600">Applied Jobs</h3>
                                <p className="text-2xl font-semibold text-gray-900">7</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6 border">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-600">Interviews</h3>
                                <p className="text-2xl font-semibold text-gray-900">3</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6 border">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-600">Messages</h3>
                                <p className="text-2xl font-semibold text-gray-900">12</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Quick Actions for Workers */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                            <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="text-gray-600 font-medium">Search Jobs</span>
                        </button>
                        
                        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                            <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <span className="text-gray-600 font-medium">My Applications</span>
                        </button>
                        
                        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                            <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600 font-medium">Upcoming Interviews</span>
                        </button>
                        
                        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                            <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-gray-600 font-medium">Update Profile</span>
                        </button>
                    </div>
                </div>
                
                {/* Available Jobs - JobsPage Component */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Available Jobs</h2>
                        <p className="text-gray-600 mt-1">Browse and apply to open positions</p>
                    </div>
                    <div className="p-6">
                        <JobsPage />
                    </div>
                </div>
                
                {/* Recent Activity for Workers */}
                <div className="mt-8 bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Your Recent Activity</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-gray-900 font-medium">Applied to Software Engineer position</p>
                                    <p className="text-gray-600 text-sm">2 hours ago at Tech Corp</p>
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Applied</span>
                            </div>
                            
                            <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-gray-900 font-medium">Interview scheduled for Product Manager role</p>
                                    <p className="text-gray-600 text-sm">Tomorrow at 2:00 PM with StartupX</p>
                                </div>
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Interview</span>
                            </div>
                            
                            <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-gray-900 font-medium">Message from HR at InnovateCorp</p>
                                    <p className="text-gray-600 text-sm">3 days ago - Thank you for your application</p>
                                </div>
                                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Message</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
