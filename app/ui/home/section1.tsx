'use client';

import Link from 'next/link';

export default function HomeHead() {
    return (
        <div className="container w-[88%] lg:w-full 2xl:w-[85%] 3xl:w-[80%] 4xl:w-[75%] 5xl:w-[70%]">
            <div className="mx-auto w-full pt-6 xl:pt-32 2xl:pt-36 3xl:pt-40 4xl:pt-44 5xl:pt-48 pb-16 lg:pb-20 xl:pb-40 2xl:pb-44 3xl:pb-48 4xl:pb-52 5xl:pb-56 grid lg:grid-cols-[50%,50%] 2xl:grid-cols-[45%,55%] 3xl:grid-cols-[40%,60%]">
                <div className="lg:pr-10 2xl:pr-16 3xl:pr-20 4xl:pr-24 5xl:pr-28">
                    <h3 className="text-sm lg:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-normal leading-1 border border-green-500 rounded-md inline-block px-2 py-1 2xl:px-3 2xl:py-2 3xl:px-4 3xl:py-2 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)] animate-pulse">
                        <span className="font-bold uppercase">
                            <span className="bg-gradient-to-r from-sky-900 to-sky-900 bg-clip-text text-transparent">Kazi</span>
                            <span className="bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text text-transparent">base</span>
                        </span>{" "}
                        - Work • Get Paid • Happy Life
                    </h3>

                    <h3 className="text-3xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl 5xl:text-9xl font-bold text-sky-900 uppercase lg:leading-tight 2xl:leading-tight 3xl:leading-tight 4xl:leading-tight 5xl:leading-tight mb-3 mt-4 2xl:mb-4 2xl:mt-6 3xl:mb-5 3xl:mt-7">
                        Manual Jobs Made Easy in Kenya
                    </h3>
                    <p className="text-md lg:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-normal tracking-wide 2xl:tracking-wider 3xl:tracking-widest">
                        <span className="font-bold bg-gradient-to-r from-sky-900 to-orange-400 bg-clip-text text-transparent">Kazibase</span> is the easy way for Kenyans to find small jobs like house help, fundi, boda boda, cleaner - or hire someone to help you quickly. You post a{" "}
                        job, workers see it, they call you or chat with you on{" "}
                        <span className="relative inline-block">
                            <span className="absolute inset-0 bg-green-500/20 rounded-lg blur-sm"></span>
                            <span className="relative text-green-400 font-semibold px-3 py-1 2xl:px-4 2xl:py-2 3xl:px-5 3xl:py-2 bg-green-500/10 rounded-lg border border-green-500/20">WhatsApp</span>
                        </span>{" "}
                        - the job starts!
                    </p>
                </div>
                <div className="lg:pl-12 2xl:pl-16 3xl:pl-20 4xl:pl-24 5xl:pl-28 pt-5 2xl:pt-7 3xl:pt-9">
                    <p className="text-md lg:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-normal tracking-wide 2xl:tracking-wider 3xl:tracking-widest">
                        All workers{" "}
                        <span className="relative inline-block">
                            <span className="absolute inset-0 bg-orange-500/20 rounded-lg blur-sm"></span>
                            <span className="relative text-orange-400 font-semibold px-3 py-1 2xl:px-4 2xl:py-2 3xl:px-5 3xl:py-2 bg-orange-500/10 rounded-lg border border-orange-500/20">verify</span>
                        </span>{" "}
                        their skills. This means you can trust their work.{" "}
                        <span className="font-bold bg-gradient-to-r from-sky-900 to-orange-400 bg-clip-text text-transparent">Kazibase</span> serves{" "}
                        every neighborhood, village and city - whether Nairobi, Kisumu, Eldoret, Nakuru, Meru, Kiambu, Mombasa, Garissa and everywhere in our beautiful country Kenya.
                    </p>
                </div>
                <div className="flex flex-row justify-center lg:justify-start gap-4 2xl:gap-6 3xl:gap-8 4xl:gap-10 5xl:gap-12 mt-8 lg:col-span-2">
                    <Link href="/postjob">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-5 2xl:py-3 2xl:px-6 3xl:py-4 3xl:px-8 4xl:py-5 4xl:px-10 5xl:py-6 5xl:px-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl flex items-center gap-2 2xl:gap-3 3xl:gap-4 glow-orange hover:glow-orange-intense">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 5xl:h-8 5xl:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Post a Job
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="bg-sky-900 hover:bg-sky-800 text-white font-medium py-2 px-5 2xl:py-3 2xl:px-6 3xl:py-4 3xl:px-8 4xl:py-5 4xl:px-10 5xl:py-6 5xl:px-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl flex items-center gap-2 2xl:gap-3 3xl:gap-4 glow-sky hover:glow-sky-intense">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 5xl:h-8 5xl:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Join as a worker
                        </button>
                    </Link>
                </div>
                {/* New Centered Button */}
<div className="flex justify-center mt-6">
    <Link href="/login">
        <button className="bg-sky-900 hover:bg-sky-800 text-white font-medium py-2 px-6 2xl:py-3 2xl:px-8 3xl:py-4 3xl:px-10 4xl:py-5 4xl:px-12 5xl:py-6 5xl:px-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl glow-sky hover:glow-sky-intense">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 5xl:h-8 5xl:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
            Login as a worker
        </button>
    </Link>
</div>
            </div>
            
            {/* New Jobs Section */}
            <div className="w-full bg-gradient-to-r from-sky-50 to-orange-50 2xl:bg-gradient-to-r 2xl:from-sky-100 2xl:to-orange-100 py-16 2xl:py-20 3xl:py-24 4xl:py-28 5xl:py-32 rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl shadow-lg animate-fadeInUp border-2 border-transparent hover:border-gradient-jobs transition-all duration-700 relative overflow-hidden">
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-100/30 to-orange-100/30 opacity-0 animate-breathe rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 left-4 text-orange-400 animate-float">
                    <svg className="w-8 h-8 2xl:w-10 2xl:h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div className="absolute top-4 right-4 text-sky-500 animate-float-delayed">
                    <svg className="w-8 h-8 2xl:w-10 2xl:h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                </div>
                <div className="absolute bottom-4 left-1/4 text-green-500 animate-float-slow">
                    <svg className="w-6 h-6 2xl:w-8 2xl:h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                </div>
                <div className="absolute bottom-8 right-1/4 text-purple-500 animate-float-delayed">
                    <svg className="w-6 h-6 2xl:w-8 2xl:h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                </div>
                
                <div className="text-center relative z-10">
                    <h2 className="text-2xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl 5xl:text-8xl font-bold text-sky-900 mb-4 2xl:mb-6 3xl:mb-8 animate-slideInFromLeft">
                        <span className="inline-block animate-shimmer bg-gradient-to-r from-sky-900 via-orange-500 to-sky-900 bg-clip-text text-transparent bg-size-200% bg-pos-0 animate-shimmer">
                            Find Work Now
                        </span>
                        <div className="inline-block ml-3 animate-bounce">
                            <svg className="w-8 h-8 2xl:w-10 2xl:h-10 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                            </svg>
                        </div>
                    </h2>
                    <p className="text-lg lg:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl text-gray-700 mb-8 2xl:mb-10 3xl:mb-12 4xl:mb-14 5xl:mb-16 px-4 lg:px-8 2xl:px-12 animate-slideInFromRight animate-delay-300">
                        See all available jobs here in Kenya. 
                        <span className="font-bold text-sky-700 animate-pulse"> Choose the one that suits you best!</span>
                    </p>
                    <Link href="/jobspage">
                        <button className="bg-gradient-to-r from-sky-900 to-orange-500 hover:from-sky-800 hover:to-orange-600 text-white font-bold py-3 px-8 2xl:py-4 2xl:px-10 3xl:py-5 3xl:px-12 4xl:py-6 4xl:px-14 5xl:py-7 5xl:px-16 rounded-full shadow-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl flex items-center gap-3 2xl:gap-4 3xl:gap-5 mx-auto glow-jobs hover:glow-jobs-intense animate-slideInFromBottom animate-delay-600 relative overflow-hidden group">
                            {/* Button ripple effect */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8 5xl:h-9 5xl:w-9 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="relative">
                                View All Jobs
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8 5xl:h-9 5xl:w-9 animate-pulseBounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
            
            <style jsx>{`
                .glow-orange {
                    box-shadow: 0 0 5px rgba(249, 115, 22, 0.5), 0 0 10px rgba(249, 115, 22, 0.3), 0 0 15px rgba(249, 115, 22, 0.2);
                }
                .glow-orange-intense {
                    box-shadow: 0 0 10px rgba(249, 115, 22, 0.7), 0 0 20px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.3);
                }
                .glow-sky {
                    box-shadow: 0 0 5px rgba(12, 74, 110, 0.5), 0 0 10px rgba(12, 74, 110, 0.3), 0 0 15px rgba(12, 74, 110, 0.2);
                }
                .glow-sky-intense {
                    box-shadow: 0 0 10px rgba(12, 74, 110, 0.7), 0 0 20px rgba(12, 74, 110, 0.5), 0 0 30px rgba(12, 74, 110, 0.3);
                }
                .glow-jobs {
                    box-shadow: 0 0 8px rgba(12, 74, 110, 0.4), 0 0 16px rgba(249, 115, 22, 0.4), 0 0 24px rgba(12, 74, 110, 0.2);
                }
                .glow-jobs-intense {
                    box-shadow: 0 0 15px rgba(12, 74, 110, 0.6), 0 0 30px rgba(249, 115, 22, 0.6), 0 0 45px rgba(12, 74, 110, 0.3);
                }
                
                /* New animation keyframes */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInFromRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInFromBottom {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes floatDelayed {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
                
                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes breathe {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes pulseBounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
                
                /* Apply animations */
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out;
                }
                
                .animate-slideInFromLeft {
                    animation: slideInFromLeft 0.8s ease-out;
                }
                
                .animate-slideInFromRight {
                    animation: slideInFromRight 0.8s ease-out;
                    animation-delay: 0.3s;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .animate-slideInFromBottom {
                    animation: slideInFromBottom 0.8s ease-out;
                    animation-delay: 0.6s;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-float-delayed {
                    animation: floatDelayed 3s ease-in-out infinite;
                    animation-delay: 1s;
                }
                
                .animate-float-slow {
                    animation: floatSlow 4s ease-in-out infinite;
                    animation-delay: 0.5s;
                }
                
                .animate-breathe {
                    animation: breathe 4s ease-in-out infinite;
                }
                
                .animate-shimmer {
                    background-size: 200% auto;
                    animation: shimmer 3s ease-in-out infinite;
                }
                
                .animate-spin-slow {
                    animation: spinSlow 3s linear infinite;
                }
                
                .animate-pulseBounce {
                    animation: pulseBounce 2s ease-in-out infinite;
                }
                
                .animate-delay-300 {
                    animation-delay: 0.3s;
                }
                
                .animate-delay-600 {
                    animation-delay: 0.6s;
                }
                
                /* Responsive glow effects for large screens */
                @media (min-width: 1536px) {
                    .glow-orange {
                        box-shadow: 0 0 8px rgba(249, 115, 22, 0.5), 0 0 16px rgba(249, 115, 22, 0.3), 0 0 24px rgba(249, 115, 22, 0.2);
                    }
                    .glow-orange-intense {
                        box-shadow: 0 0 15px rgba(249, 115, 22, 0.7), 0 0 30px rgba(249, 115, 22, 0.5), 0 0 45px rgba(249, 115, 22, 0.3);
                    }
                    .glow-sky {
                        box-shadow: 0 0 8px rgba(12, 74, 110, 0.5), 0 0 16px rgba(12, 74, 110, 0.3), 0 0 24px rgba(12, 74, 110, 0.2);
                    }
                    .glow-sky-intense {
                        box-shadow: 0 0 15px rgba(12, 74, 110, 0.7), 0 0 30px rgba(12, 74, 110, 0.5), 0 0 45px rgba(12, 74, 110, 0.3);
                    }
                    .glow-jobs {
                        box-shadow: 0 0 12px rgba(12, 74, 110, 0.4), 0 0 24px rgba(249, 115, 22, 0.4), 0 0 36px rgba(12, 74, 110, 0.2);
                    }
                    .glow-jobs-intense {
                        box-shadow: 0 0 20px rgba(12, 74, 110, 0.6), 0 0 40px rgba(249, 115, 22, 0.6), 0 0 60px rgba(12, 74, 110, 0.3);
                    }
                }
                
                /* Ultra large screens */
                @media (min-width: 2560px) {
                    .glow-orange {
                        box-shadow: 0 0 12px rgba(249, 115, 22, 0.5), 0 0 24px rgba(249, 115, 22, 0.3), 0 0 36px rgba(249, 115, 22, 0.2);
                    }
                    .glow-orange-intense {
                        box-shadow: 0 0 20px rgba(249, 115, 22, 0.7), 0 0 40px rgba(249, 115, 22, 0.5), 0 0 60px rgba(249, 115, 22, 0.3);
                    }
                    .glow-sky {
                        box-shadow: 0 0 12px rgba(12, 74, 110, 0.5), 0 0 24px rgba(12, 74, 110, 0.3), 0 0 36px rgba(12, 74, 110, 0.2);
                    }
                    .glow-sky-intense {
                        box-shadow: 0 0 20px rgba(12, 74, 110, 0.7), 0 0 40px rgba(12, 74, 110, 0.5), 0 0 60px rgba(12, 74, 110, 0.3);
                    }
                    .glow-jobs {
                        box-shadow: 0 0 16px rgba(12, 74, 110, 0.4), 0 0 32px rgba(249, 115, 22, 0.4), 0 0 48px rgba(12, 74, 110, 0.2);
                    }
                    .glow-jobs-intense {
                        box-shadow: 0 0 25px rgba(12, 74, 110, 0.6), 0 0 50px rgba(249, 115, 22, 0.6), 0 0 75px rgba(12, 74, 110, 0.3);
                    }
                }
            `}</style>
        </div>
    );
}
