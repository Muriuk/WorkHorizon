'use client'
import { TargetWindowCheck } from "@/app/hooks/windowSize";
import Link from 'next/link';

export default function HomeHead() {
    return (
        <div className="container w-[88%] lg:w-full">
            <div className="mx-auto w-full pt-6 xl:pt-32 pb-16 lg:pb-20 xl:pb-40 grid lg:grid-cols-[50%,50%]">
                <div className="lg:pr-10">
                    <h3 className="text-sm font-normal leading-1 border border-black rounded-md inline-block px-2 py-1">
                        <span className="font-bold uppercase">
                            <span className="text-sky-900">Kazi</span>
                            <span className="text-orange-500">base</span>
                        </span>{" "}
                        - Work, Get Paid, Happy Life
                    </h3>
                    <h3 className="text-3xl lg:text-5xl font-bold text-sky-900 uppercase lg:leading-tight mb-3">
                        Manual Jobs Made Easy in Kenya
                    </h3>
                    <p className="text-md lg:text-xl font-normal tracking-wide">
                        <span className="text-black font-semibold">Kazibase</span> ni njia rahisi kwa Wakenya kupata kazi ndogo kama mama fua, fundi, bodaboda, cleaner – au kuajiri mtu wa kusaidia haraka. Unaweka <span className="text-orange-500 font-medium">kazi</span>, hustler anaiona, anakupigia ama anakuchat <span className="text-orange-500 font-medium">WhatsApp</span> – kazi inaanza!
                    </p>
                </div>
                <div className="lg:pl-12 pt-5">
                    <p className="text-md lg:text-xl font-normal tracking-wide">
                        Wafanyakazi wote<span className="text-orange-500 font-medium"> wanathibitisha (they verify)</span> ujuzi wao. Hii inamaanisha unaweza kuwa na <span className="text-orange-500 font-medium">imani</span> na kazi yao. <span className="text-black font-semibold">Kazibase</span> inalenga <span className="text-orange-500 font-medium">kila mtaa</span>, kijiji na jiji – iwe Nairobi, Kisumu, Eldoret, Nakuru, Meru, Kiambu, Mombasa, Garissa na kila mahali katika taifa letu la Kenya.
                    </p>
                </div>
                <div className="flex flex-row justify-center lg:justify-start gap-4 mt-6">
                    <Link href="/postjob">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-5 rounded-full shadow-md transition-transform hover:scale-105 text-sm sm:text-base flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Post a Job
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="bg-sky-900 hover:bg-sky-800 text-white font-medium py-2 px-5 rounded-full shadow-md transition-transform hover:scale-105 text-sm sm:text-base flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Join as a worker
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
