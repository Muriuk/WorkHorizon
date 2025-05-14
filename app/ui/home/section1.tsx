'use client'
import Link from 'next/link';
import React from 'react';

export default function HomeHead() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-56 h-56 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-16 pb-8 lg:pt-24 lg:pb-16">
                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-[55%_45%] xl:grid-cols-[60%_40%] gap-8 lg:gap-16 items-center">
                        <div className="text-center lg:text-left">
                            {/* Brand Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200/70 rounded-full px-5 py-3 mb-8 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer">
                                <div className="flex items-center">
                                    <span className="text-sm font-extrabold uppercase tracking-wider">
                                        <span className="text-sky-900 bg-gradient-to-r from-sky-900 to-sky-700 bg-clip-text text-transparent">Kazi</span>
                                        <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">base</span>
                                    </span>
                                    <div className="w-px h-4 bg-gray-300 mx-3"></div>
                                    <span className="text-xs text-gray-600 font-medium">Work, Get Paid, Happy Life</span>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-green-500 animate-pulse"></div>
                            </div>
                            
                            {/* Main Heading */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-sky-900 mb-8 leading-[0.9] tracking-tight">
                                <span className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 bg-clip-text text-transparent">
                                    Manual Jobs
                                </span>
                                <br />
                                <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                                    Made Easy
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 bg-clip-text text-transparent">
                                    in Kenya
                                </span>
                            </h1>
                            
                            {/* Description */}
                            <div className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 space-y-4">
                                <p>
                                    <span className="font-bold text-sky-900 bg-gradient-to-r from-sky-900 to-sky-700 bg-clip-text text-transparent">Kazibase</span> ni njia rahisi kwa Wakenya kupata kazi ndogo kama mama fua, fundi, bodaboda, cleaner – au kuajiri mtu wa kusaidia haraka.
                                </p>
                                <p>
                                    Unaweka <span className="text-orange-500 font-semibold px-2 py-1 bg-orange-50 rounded-lg">kazi</span>, hustler anaiona, anakupigia ama anakuchat <span className="text-orange-500 font-semibold px-2 py-1 bg-orange-50 rounded-lg">WhatsApp</span> – kazi inaanza!
                                </p>
                            </div>
                        </div>
                        
                        <div className="lg:pl-12">
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500">
                                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed space-y-4">
                                    <span>
                                        Wafanyakazi wote <span className="text-orange-500 font-semibold bg-orange-50 px-2 py-1 rounded-lg">wanathibitisha (they verify)</span> ujuzi wao. 
                                    </span>
                                    <br /><br />
                                    <span>
                                        Hii inamaanisha unaweza kuwa na <span className="text-orange-500 font-semibold bg-orange-50 px-2 py-1 rounded-lg">imani</span> na kazi yao.
                                    </span>
                                    <br /><br />
                                    <span>
                                        <span className="font-bold text-sky-900 bg-gradient-to-r from-sky-900 to-sky-700 bg-clip-text text-transparent">Kazibase</span> inalenga <span className="text-orange-500 font-semibold bg-orange-50 px-2 py-1 rounded-lg">kila mtaa</span>, kijiji na jiji – iwe Nairobi, Kisumu, Eldoret, Nakuru, Meru, Kiambu, Mombasa, Garissa na kila mahali katika taifa letu la Kenya.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 mt-16">
                        <Link href="/postjob">
                            <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold py-5 px-10 rounded-full shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 text-lg sm:text-xl flex items-center justify-center gap-4 min-w-full sm:min-w-64">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <div className="relative flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Post a Job</span>
                                </div>
                                <svg className="h-6 w-6 text-white/80 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 12l3-3 3 3v7l-3-3-3 3v-7zm3-9v4l-2-2zM6 14l3 3-3 3V14zm12 6l-3-3 3-3v6zM12 2l-2 2 2 2 2-2-2-2z"/>
                                </svg>
                            </button>
                        </Link>
                        
                        <Link href="/login">
                            <button className="group relative overflow-hidden bg-gradient-to-r from-sky-900 via-sky-900 to-sky-800 hover:from-sky-800 hover:to-sky-700 text-white font-bold py-5 px-10 rounded-full shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 text-lg sm:text-xl flex items-center gap-4 min-w-full sm:min-w-64">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <div className="relative flex items-center gap-3">
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                                    </div>
                                    <span>Join as a Worker</span>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
