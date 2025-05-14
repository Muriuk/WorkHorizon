'use client'
import Link from 'next/link';

export default function HomeHead() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-20 pb-8 lg:pb-16">
                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-16 items-center">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
                                <span className="text-sm font-semibold uppercase tracking-wide">
                                    <span className="text-sky-900">Kazi</span>
                                    <span className="text-orange-500">base</span>
                                </span>
                                <span className="text-xs text-gray-600 ml-1">- Work, Get Paid, Happy Life</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-sky-900 mb-8 leading-tight">
                                Manual Jobs Made Easy in Kenya
                            </h1>
                            
                            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                                <span className="font-bold text-sky-900">Kazibase</span> ni njia rahisi kwa Wakenya kupata kazi ndogo kama mama fua, fundi, bodaboda, cleaner – au kuajiri mtu wa kusaidia haraka. Unaweka{' '}
                                <span className="text-orange-500 font-semibold">kazi</span>, hustler anaiona, anakupigia ama anakuchat{' '}
                                <span className="text-orange-500 font-semibold">WhatsApp</span> – kazi inaanza!
                            </p>
                        </div>
                        
                        <div className="lg:pl-12">
                            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                                Wafanyakazi wote{' '}
                                <span className="text-orange-500 font-semibold">wanathibitisha (they verify)</span>{' '}
                                ujuzi wao. Hii inamaanisha unaweza kuwa na{' '}
                                <span className="text-orange-500 font-semibold">imani</span>{' '}
                                na kazi yao.{' '}
                                <span className="font-bold text-sky-900">Kazibase</span> inalenga{' '}
                                <span className="text-orange-500 font-semibold">kila mtaa</span>,{' '}
                                kijiji na jiji – iwe Nairobi, Kisumu, Eldoret, Nakuru, Meru, Kiambu, Mombasa, Garissa na kila mahali katika taifa letu la Kenya.
                            </p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 mt-12">
                        <Link href="/postjob">
                            <button className="group bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Post a Job
                                </div>
                                <svg className="h-6 w-6 text-white transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 12l3-3 3 3v7l-3-3-3 3v-7zm3-9v4l-2-2zM6 14l3 3-3 3V14zm12 6l-3-3 3-3v6zM12 2l-2 2 2 2 2-2-2-2z"/>
                                </svg>
                            </button>
                        </Link>
                        
                        <Link href="/login">
                            <button className="group bg-sky-900 hover:bg-sky-800 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
