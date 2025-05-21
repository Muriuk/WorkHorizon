'use client';

import Link from 'next/link';

export default function HomeHead() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-7xl">
            <div className="mx-auto w-full pt-8 xl:pt-16 2xl:pt-24 pb-12 lg:pb-16 xl:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left Column */}
                <div className="space-y-8 lg:pr-8 xl:pr-12 2xl:pr-16">
                    <div className="inline-block bg-gradient-to-r from-sky-900/10 to-orange-400/10 backdrop-blur-sm rounded-xl p-px shadow-[0_4px_24px_rgba(34,197,94,0.15)]">
                        <div className="bg-white/90 rounded-lg px-4 py-2.5">
                            <h3 className="text-lg font-medium bg-gradient-to-r from-sky-900 to-orange-500 bg-clip-text text-transparent">
                                <span className="font-bold">Kazibase</span> • Work • Get Paid • Happy Life
                            </h3>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-sky-900 to-sky-800 bg-clip-text text-transparent leading-tight">
                        Manual Jobs Made Easy in Kenya
                    </h1>

                    <p className="text-xl text-gray-700 leading-relaxed">
                        <span className="font-semibold bg-gradient-to-r from-sky-900 to-orange-500 bg-clip-text text-transparent">
                            Kazibase
                        </span> connects you with verified professionals through instant WhatsApp communication. 
                        Post your requirement and get responses within minutes!
                    </p>

                    {/* Buttons Container */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <Link href="/clientregister">
                            <button className="relative w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                <span className="flex items-center gap-3 justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    Post a Job
                                </span>
                            </button>
                        </Link>

                        <Link href="/login">
                            <button className="relative w-full sm:w-auto bg-gradient-to-r from-sky-900 to-sky-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                <span className="flex items-center gap-3 justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    Join as Worker
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:pl-8 xl:pl-12 2xl:pl-16 pt-0">
                    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100/50 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Verified Professionals Across Kenya
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our platform ensures every worker is skill-verified and background-checked. 
                            Available nationwide from Nairobi to Mombasa, Kisumu to Garissa - bringing 
                            quality service to your doorstep.
                        </p>
                        
                        {/* Interactive Map Preview */}
                        <div className="mt-8 relative bg-gradient-to-br from-sky-100 to-orange-50 rounded-2xl p-1 overflow-hidden">
                            <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
                            <div className="absolute inset-0 bg-[url('/map-pattern.svg')] opacity-10" />
                        </div>
                    </div>
                </div>

                {/* Jobs Section */}
                <div className="lg:col-span-2 mt-12">
                    <div className="relative bg-gradient-to-br from-sky-50 to-orange-50 rounded-[2.5rem] p-12 lg:p-16 shadow-2xl border border-gray-100/50 backdrop-blur-sm overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                        <div className="relative z-10 text-center">
                            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-900 to-orange-500 bg-clip-text text-transparent mb-8">
                                Immediate Job Opportunities
                            </h2>

                            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                                Explore hundreds of verified job listings across multiple sectors. 
                                Quick applications through WhatsApp direct chat.
                            </p>

                            <Link href="/jobspage">
                                <button className="group relative bg-gradient-to-r from-sky-900 to-orange-500 text-white px-12 py-5 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="flex items-center gap-4 justify-center">
                                        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                        Browse All Jobs
                                        <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                        </svg>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Background Elements */}
            <div className="fixed -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-sky-100 to-orange-100 rounded-full opacity-30 blur-3xl animate-float" />
            <div className="fixed top-1/2 right-0 w-64 h-64 bg-gradient-to-r from-orange-100 to-sky-100 rounded-full opacity-20 blur-3xl animate-float-delayed" />
        </div>
    );
}
