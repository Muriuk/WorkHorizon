'use client';

import Link from 'next/link';

export default function HomeHead() {
    return (
        <div className="container w-[88%] lg:w-full 2xl:w-[85%] 3xl:w-[80%]">
            <div className="mx-auto w-full pt-6 xl:pt-32 2xl:pt-36 3xl:pt-40 pb-16 lg:pb-20 xl:pb-40 2xl:pb-44 3xl:pb-48 grid lg:grid-cols-[50%,50%] 2xl:grid-cols-[45%,55%]">
                <div className="lg:pr-10 2xl:pr-16 3xl:pr-20">
                    <h3 className="text-sm font-normal leading-1 border border-green-500 rounded-md inline-block px-2 py-1 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)] animate-pulse">
                        <span className="font-bold uppercase">
                            <span className="bg-gradient-to-r from-sky-900 to-sky-900 bg-clip-text text-transparent">Kazi</span>
                            <span className="bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text text-transparent">base</span>
                        </span>{" "}
                        - Work • Get Paid • Happy Life
                    </h3>

                    <h3 className="text-3xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold text-sky-900 uppercase lg:leading-tight 2xl:leading-tight 3xl:leading-tight mb-3 mt-4">
                        Manual Jobs Made Easy in Kenya
                    </h3>
                    <p className="text-md lg:text-xl 2xl:text-2xl 3xl:text-3xl font-normal tracking-wide 2xl:tracking-wider">
                        <span className="font-bold bg-gradient-to-r from-sky-900 to-orange-400 bg-clip-text text-transparent">Kazibase</span> ni njia rahisi kwa Wakenya kupata kazi ndogo kama mama fua, fundi, bodaboda, cleaner – au kuajiri mtu wa kusaidia haraka. Unaweka{" "}
                        kazi, hustler anaiona, anakupigia ama anakuchat{" "}
                        <span className="relative inline-block">
                            <span className="absolute inset-0 bg-green-500/20 rounded-lg blur-sm"></span>
                            <span className="relative text-green-400 font-semibold px-3 py-1 bg-green-500/10 rounded-lg border border-green-500/20">WhatsApp</span>
                        </span>{" "}
                        – kazi inaanza!
                    </p>
                </div>
                <div className="lg:pl-12 2xl:pl-16 3xl:pl-20 pt-5">
                    <p className="text-md lg:text-xl 2xl:text-2xl 3xl:text-3xl font-normal tracking-wide 2xl:tracking-wider">
                        Wafanyakazi wote{" "}
                        <span className="relative inline-block">
                            <span className="absolute inset-0 bg-orange-500/20 rounded-lg blur-sm"></span>
                            <span className="relative text-orange-400 font-semibold px-3 py-1 bg-orange-500/10 rounded-lg border border-orange-500/20">wanathibitisha</span>
                        </span>{" "}
                        ujuzi wao. Hii inamaanisha unaweza kuwa na imani na kazi yao.{" "}
                        <span className="font-bold bg-gradient-to-r from-sky-900 to-orange-400 bg-clip-text text-transparent">Kazibase</span> inalenga{" "}
                      kila mtaa, kijiji na jiji – iwe Nairobi, Kisumu, Eldoret, Nakuru, Meru, Kiambu, Mombasa, Garissa na kila mahali katika taifa letu la Kenya.
                    </p>
                </div>
                <div className="flex flex-row justify-center lg:justify-start gap-4 2xl:gap-6 3xl:gap-8 mt-8 lg:col-span-2">
                    <Link href="/postjob">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-5 2xl:py-3 2xl:px-6 3xl:py-4 3xl:px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl text-sm sm:text-base 2xl:text-lg 3xl:text-xl flex items-center gap-2 glow-orange hover:glow-orange-intense">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Post a Job
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="bg-sky-900 hover:bg-sky-800 text-white font-medium py-2 px-5 2xl:py-3 2xl:px-6 3xl:py-4 3xl:px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl text-sm sm:text-base 2xl:text-lg 3xl:text-xl flex items-center gap-2 glow-sky hover:glow-sky-intense">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Join as a worker
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
                }
            `}</style>
        </div>
    );
}
