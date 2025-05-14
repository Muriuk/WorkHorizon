'use client'
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

export default function HomeHead() {
    const heroRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            },
            { threshold: 0.1 }
        );
        
        if (heroRef.current) {
            observer.observe(heroRef.current);
        }
        
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-950">
            {/* Dynamic Background with Mesh Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-slate-950 to-slate-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent"></div>
            
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '50px 50px',
                    animation: 'grid-move 20s linear infinite'
                }}></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-orange-500/10 to-orange-600/5 blur-3xl animate-float-slow"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-sky-500/10 to-sky-600/5 blur-3xl animate-float-slower"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-3xl animate-float"></div>
            </div>
            
            <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0 translate-y-8 transition-all duration-1000">
                <div className="pt-20 pb-16 lg:pt-32 lg:pb-24">
                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-[60%_40%] gap-12 lg:gap-20 items-center">
                        <div className="text-center lg:text-left space-y-8">
                            {/* Brand Badge with Glow */}
                            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 shadow-2xl transition-all duration-700 hover:shadow-orange-500/20 hover:shadow-2xl group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg font-black tracking-wider text-white">
                                                <span className="bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">Kazi</span>
                                                <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">base</span>
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-400 font-medium">Work • Get Paid • Happy Life</div>
                                    </div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            </div>
                            
                            {/* Main Heading with Text Effects */}
                            <div className="space-y-6">
                                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tight">
                                    <div className="relative">
                                        <span className="absolute inset-0 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent blur-sm opacity-60"></span>
                                        <span className="relative bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent animate-pulse-slow">
                                            Manual Jobs
                                        </span>
                                    </div>
                                    <div className="relative mt-2">
                                        <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent blur-sm opacity-60"></span>
                                        <span className="relative bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent animate-pulse-slow delay-150">
                                            Made Easy
                                        </span>
                                    </div>
                                    <div className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mt-4">
                                        in Kenya
                                    </div>
                                </h1>
                            </div>
                            
                            {/* Animated Description */}
                            <div className="space-y-6 text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl">
                                <p className="opacity-0 animate-fade-in-up delay-300">
                                    <span className="font-bold bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">Kazibase</span> ni njia rahisi kwa Wakenya kupata kazi ndogo kama mama fua, fundi, bodaboda, cleaner – au kuajiri mtu wa kusaidia haraka.
                                </p>
                                <p className="opacity-0 animate-fade-in-up delay-500">
                                    Unaweka <span className="relative">
                                        <span className="absolute inset-0 bg-orange-500/20 rounded-lg blur"></span>
                                        <span className="relative text-orange-400 font-semibold px-3 py-1 bg-orange-500/10 rounded-lg border border-orange-500/20">kazi</span>
                                    </span>, hustler anaiona, anakupigia ama anakuchat <span className="relative">
                                        <span className="absolute inset-0 bg-green-500/20 rounded-lg blur"></span>
                                        <span className="relative text-green-400 font-semibold px-3 py-1 bg-green-500/10 rounded-lg border border-green-500/20">WhatsApp</span>
                                    </span> – kazi inaanza!
                                </p>
                            </div>
                        </div>
                        
                        {/* Right Panel with Glowing Card */}
                        <div className="lg:pl-8">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-sky-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700"></div>
                                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-700">
                                    <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                                    <div className="space-y-6 text-gray-200 text-lg lg:text-xl leading-relaxed">
                                        <p>
                                            Wafanyakazi wote <span className="relative">
                                                <span className="absolute inset-0 bg-orange-500/20 rounded-lg blur"></span>
                                                <span className="relative text-orange-400 font-semibold px-3 py-1 bg-orange-500/10 rounded-lg border border-orange-500/20">wanathibitisha</span>
                                            </span> ujuzi wao.
                                        </p>
                                        <p>
                                            Hii inamaanisha unaweza kuwa na <span className="relative">
                                                <span className="absolute inset-0 bg-green-500/20 rounded-lg blur"></span>
                                                <span className="relative text-green-400 font-semibold px-3 py-1 bg-green-500/10 rounded-lg border border-green-500/20">imani</span>
                                            </span> na kazi yao.
                                        </p>
                                        <p>
                                            <span className="font-bold bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">Kazibase</span> inalenga <span className="relative">
                                                <span className="absolute inset-0 bg-purple-500/20 rounded-lg blur"></span>
                                                <span className="relative text-purple-400 font-semibold px-3 py-1 bg-purple-500/10 rounded-lg border border-purple-500/20">kila mtaa</span>
                                            </span>, kijiji na jiji – iwe Nairobi, Kisumu, Eldoret, Nakuru, Meru, Kiambu, Mombasa, Garissa na kila mahali katika taifa letu la Kenya.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Futuristic CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-8 mt-16 opacity-0 animate-fade-in-up delay-700">
                        <Link href="/postjob">
                            <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white font-bold py-6 px-12 rounded-full shadow-2xl transition-all duration-700 hover:shadow-orange-500/50 hover:shadow-2xl hover:scale-110 text-lg sm:text-xl min-w-full sm:min-w-80">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <div className="relative flex items-center justify-center gap-4">
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover:rotate-180 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <div className="absolute inset-0 bg-white/30 rounded-full blur group-hover:bg-white/50 transition-all duration-300"></div>
                                    </div>
                                    <span className="font-black tracking-wide">Post a Job</span>
                                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
                                </div>
                            </button>
                        </Link>
                        
                        <Link href="/login">
                            <button className="group relative overflow-hidden bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white font-bold py-6 px-12 rounded-full shadow-2xl transition-all duration-700 hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-110 text-lg sm:text-xl min-w-full sm:min-w-80 border border-slate-600 hover:border-sky-500/50">
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-900/50 to-sky-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <div className="relative flex items-center justify-center gap-4">
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover:scale-125 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse group-hover:animate-ping"></div>
                                    </div>
                                    <span className="font-black tracking-wide">Join as a Worker</span>
                                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(-1deg); }
                }
                @keyframes float-slower {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(1deg); }
                }
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-slow {
                    animation: float-slow 8s ease-in-out infinite;
                }
                .animate-float-slower {
                    animation: float-slower 10s ease-in-out infinite;
                }
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `}</style>
        </div>
    );
}
