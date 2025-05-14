'use client'
import { useEffect, useState } from "react";
import Link from 'next/link';

function SlideShow() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            head: 'Post Kazi, Pata Hustler',
            desc: 'Weka kazi haraka – hustler anaiona papo hapo, anakuchat WhatsApp na kazi inaanza. Whether ni kusafisha nyumba, kubeba vitu au kuosha gari – help iko karibu na wewe, anytime.',
            highlight: 'Instant Connection',
            stats: '10,000+ Active Hustlers'
        },
        {
            head: 'Local Talent You Can Trust',
            desc: 'Hustlers wetu wameverify skills zao – mama fua, fundi wa umeme, dereva bodaboda, na wengineo. Hawa ni watu wa mtaa wako, wanaojali kazi safi na huduma ya kweli.',
            highlight: 'Verified Skills',
            stats: '98% Trust Rating'
        },
        {
            head: 'Jobs for Every Hustler',
            desc: 'Kazibase inafungua milango ya kazi ndogo ndogo kwa kila mkenya – fundi, mama fua, watchman, au jamaa wa mkokoteni. Kama ni kazi ya mikono, iko hapa. Post, connect, maliza kazi.',
            highlight: 'Every Skill Covered',
            stats: '50+ Job Categories'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-gray-900 to-sky-900 shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.1)_0%,rgba(139,92,246,0.1)_40%,rgba(34,197,94,0.1)_100%)]"></div>
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-500 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-green-500 blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10 p-8 md:p-12 lg:p-16 xl:p-20 h-[500px] md:h-[600px] flex flex-col justify-center">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center transition-all duration-1000 ease-in-out ${
                            currentSlide === index 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 translate-x-full'
                        }`}
                    >
                        <div className="text-center lg:text-left max-w-4xl">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-emerald-400 text-sm font-medium">{slide.highlight}</span>
                            </div>
                            
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                                {slide.head}
                            </h1>
                            
                            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                                {slide.desc}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                                <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-orange-600 hover:to-orange-700">
                                    <span className="relative z-10">Anza Sasa</span>
                                    <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                                </button>
                                
                                <div className="text-white/80 text-sm font-medium">
                                    {slide.stats}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                            idx === currentSlide 
                                ? 'bg-white scale-125 shadow-lg' 
                                : 'bg-white/40 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function HomeHead() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-12 md:pt-20 lg:pt-32 pb-16 lg:pb-20 xl:pb-32">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-6">
                            <span className="text-2xl font-black">
                                <span className="text-sky-900">Kazi</span>
                                <span className="text-orange-500">base</span>
                            </span>
                            <span className="text-sm text-gray-600 font-medium">- Work, Get Paid, Happy Life</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-sky-900 mb-6 leading-tight">
                            Manual Jobs Made 
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                Easy in Kenya
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                            <span className="font-bold text-sky-900">Kazibase</span> ni njia rahisi kwa Wakenya kupata kazi ndogo kama mama fua, fundi, bodaboda, cleaner – au kuajiri mtu wa kusaidia haraka. Unaweka{' '}
                            <span className="bg-orange-100 px-2 py-1 rounded-md text-orange-700 font-semibold">kazi</span>, hustler anaiona, anakupigia ama anakuchat{' '}
                            <span className="bg-green-100 px-2 py-1 rounded-md text-green-700 font-semibold">WhatsApp</span>{' '}
                            – kazi inaanza!
                        </p>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                Wafanyakazi wote{' '}
                                <span className="bg-emerald-100 px-2 py-1 rounded-md text-emerald-700 font-semibold">
                                    wanathibitisha (they verify)
                                </span>{' '}
                                ujuzi wao. Hii inamaanisha unaweza kuwa na{' '}
                                <span className="bg-blue-100 px-2 py-1 rounded-md text-blue-700 font-semibold">imani</span>{' '}
                                na kazi yao.{' '}
                                <span className="font-bold text-sky-900">Kazibase</span> inalenga{' '}
                                <span className="bg-purple-100 px-2 py-1 rounded-md text-purple-700 font-semibold">kila mtaa</span>,{' '}
                                kijiji na jiji – iwe Nairobi, Kisumu, Eldoret, Nakuru, Meru, Kiambu, Mombasa, Garissa na kila mahali katika taifa letu la Kenya.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 mb-20">
                    <Link href="/postjob">
                        <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg">
                            <span className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Post a Job
                            </span>
                            <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                        </button>
                    </Link>
                    
                    <Link href="/login">
                        <button className="group relative overflow-hidden bg-gradient-to-r from-sky-800 to-sky-900 hover:from-sky-900 hover:to-sky-950 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg">
                            <span className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Join as a Worker
                            </span>
                            <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                        </button>
                    </Link>
                </div>

                {/* SlideShow */}
                <div className="relative">
                    <SlideShow />
                    
                    {/* Premium Branding */}
                    <div className="absolute -top-12 -right-12 hidden lg:block transform rotate-12 hover:rotate-0 transition-transform duration-500 z-30">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg">
                            <span className="text-2xl font-black">Kazibase</span>
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl font-black text-orange-500 mb-2">10K+</div>
                        <div className="text-gray-600 font-medium">Active Workers</div>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl font-black text-sky-900 mb-2">98%</div>
                        <div className="text-gray-600 font-medium">Success Rate</div>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl font-black text-green-600 mb-2">47</div>
                        <div className="text-gray-600 font-medium">Counties</div>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl font-black text-purple-600 mb-2">5K+</div>
                        <div className="text-gray-600 font-medium">Jobs Daily</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
