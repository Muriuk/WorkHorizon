'use client';

import Link from 'next/link';

export default function HomeHead() {
    return (
        <> 
       <div className="container mx-auto w-[90%] lg:w-[95%] xl:w-[90%] 2xl:w-[85%] 3xl:w-[80%]">
  <div className="mx-auto w-full pt-8 xl:pt-24 2xl:pt-32 3xl:pt-40 pb-16 lg:pb-24 xl:pb-32 2xl:pb-40 grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
    {/* Left Column */}
    <div className="flex flex-col justify-center space-y-6 lg:space-y-8 xl:space-y-10">
      {/* Tagline Badge */}
      <div className="w-fit">
        <div className="text-xs lg:text-sm xl:text-base font-medium leading-tight bg-gradient-to-r from-sky-900 to-orange-500 text-white rounded-full px-4 py-2 shadow-lg shadow-sky-900/30 animate-float">
          <span className="font-bold tracking-wider">KAZIBASE</span> — Work • Get Paid • Happy Life
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-sky-900 leading-tight tracking-tight">
        Manual Jobs Made <span className="bg-gradient-to-r from-sky-900 to-orange-500 bg-clip-text text-transparent">Simple</span> in Kenya
      </h1>

      {/* Description */}
      <p className="text-lg lg:text-xl xl:text-2xl font-light text-gray-700 leading-relaxed">
        <span className="font-semibold text-sky-900">Kazibase</span> connects Kenyans with skilled workers for household jobs, 
        repairs, transportation and more. Post a job and receive instant responses via 
        <span className="text-green-500 font-medium"> WhatsApp</span> — quick, easy, and hassle-free.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link href="/clientregister">
          <button className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
            <span className="relative z-10 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Post a Job
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </Link>
        <Link href="/login">
          <button className="relative overflow-hidden bg-gradient-to-r from-sky-900 to-sky-800 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
            <span className="relative z-10 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Join as Worker
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-sky-800 to-sky-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </Link>
      </div>
    </div>

    {/* Right Column */}
    <div className="flex flex-col justify-center space-y-6 lg:space-y-8 xl:space-y-10 bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm">
      <div className="space-y-6">
        <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">
          Verified <span className="text-orange-500">Skilled Workers</span> Across Kenya
        </h3>
        <p className="text-lg lg:text-xl font-light text-gray-700 leading-relaxed">
          Every worker on <span className="font-semibold text-sky-900">Kazibase</span> undergoes skill verification, ensuring quality service whether you're in Nairobi, Mombasa, Kisumu, or any village across our beautiful country.
        </p>
      </div>

      {/* Login Buttons */}
      <div className="flex flex-col gap-4 pt-4">
        <Link href="/login">
          <button className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Worker Login
          </button>
        </Link>
        <Link href="/clientlogin">
          <button className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Client Login
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
           </div>

        </>
        
    );
}
