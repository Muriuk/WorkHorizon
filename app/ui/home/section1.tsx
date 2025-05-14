'use client'
import Link from 'next/link';

export default function HomeHead() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
            {/* Subtle decorative background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl"></div>
                <div className="absolute top-40 right-20 w-48 h-48 bg-sky-100 rounded-full mix-blend-multiply filter blur-2xl"></div>
                <div className="absolute bottom-20 left-20 w-40 h-40 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-12 pb-8 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-16">
                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-[55%_45%] gap-6 lg:gap-16 items-center">
                        <div className="text-center lg:text-left">
                            {/* Brand Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200/70 rounded-full px-4 py-2 mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
                                <span className="text-sm font-bold uppercase tracking-wide">
                                    <span className="text-sky-900">Kazi</span>
                                    <span className="text-orange-500">base</span>
                                </span>
                                <span className="text-xs text-gray-600 ml-1">- Work, Get Paid, Happy Life</span>
                            </div>
                            
                            {/* Main Heading - Fixed sizes */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-sky-900 mb-6 sm:mb-8 leading-tight">
                                Manual Jobs Made Easy in Kenya
                            </h1>
                            
                            {/* Description */}
                            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
                                <span className="font-bold text-sky-900">Kazibase</span> ni njia rahisi kwa Wakenya kupata kazi ndogo kama mama fua, fundi, bodaboda, cleaner – au kuajiri mtu wa kusaidia haraka. Unaweka{' '}
                                <span className="text-orange-500 font-semibold px-2 py-1 bg-orange-50 rounded-lg">kazi</span>, hustler anaiona, anakupigia ama anakuchat{' '}
                                <span className="text-orange-500 font-semibold px-2 py-1 bg-orange-50 rounded-lg">WhatsApp</span> – kazi inaanza!
                            </p>
                        </div>
                        
                        <div className="lg:pl-8">
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100/70 hover:shadow-2xl transition-all duration-300">
                                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                                    Wafanyakazi wote{' '}
                                    <span className="text-orange-500 font-semibold px-2 py-1 bg-orange-50 rounded-lg">wanathibitisha (they verify)</span>{' '}
                                    ujuzi wao. Hii inamaanisha unaweza kuwa na{' '}
                                    <span className="text-orange-500 font-semibold px-2 py-1 bg-orange-50 rounded-lg">imani</span>{' '}
                                    na kazi yao.{' '}
                                    <span className="font-bold text-sky-900">Kazibase</span> inalenga{' '}
                                    <span className="text-orange-500 font-semibold px-2 py-1 bg-orange-50 rounded-lg">kila mtaa</span>,{' '}
                                    kijiji na jiji – iwe Nairobi, Kisumu, Eldoret, Nakuru, Meru, Kiambu, Mombasa, Garissa na kila mahali katika taifa letu la Kenya.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons - Fixed responsive layout */}
                    <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 sm:gap-6 mt-10 sm:mt-12">
                        <Link href="/postjob">
                            <button className="group w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 sm:px-10 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg flex items-center justify-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Post a Job
                            </button>
                        </Link>
                        
                        <Link href="/login">
                            <button className="group w-full sm:w-auto bg-gradient-to-r from-sky-900 to-sky-800 hover:from-sky-800 hover:to-sky-700 text-white font-bold py-4 px-8 sm:px-10 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg flex items-center justify-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Join as a Worker
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
