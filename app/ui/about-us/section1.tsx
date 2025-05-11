'use client'
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PageIntro(){
    const handleScroll = () => {
        gsap.to(window,{duration: 1, scrollTo: '#next'})
    }
    return(
        <div className='container w-[88%] lg:w-full'>
            <div className="grid grid-cols-1 py-10 lg:py-20 2xl:py-18 lg:grid-cols-[50%,50%] w-full" data-aos="fade-up">
                <div className="flex flex-col w-full lg:pr-5 xl:pr-10">
                    <div className='flex flex-col-reverse relative w-full lg:grid lg:grid-cols-[48%,48%] gap-[4%]'>
                        <Image src={'/assets/about-left-one.jpg'} className="ml-[25%] -mt-[8vh] lg:m-0 h-[28vh] lg:h-[37vh] 2xl:h-[29vh] w-[75%] lg:w-full object-cover object-[20%] 2xl:object-left-top rounded-2xl shadow-xl shadow-gray-300" alt="About - Kazibase - Left" width={500} height={300} />
                        <Image src={'/assets/hs3.jpg'} className="h-[28vh] lg:h-[33vh] 2xl:h-[26vh] w-[75%] lg:w-full object-cover object-center-bottom lg:object-end rounded-2xl shadow-xl shadow-gray-300" alt="About - Kazibase - Right" width={500} height={300} />
                        <button onClick={handleScroll} className="absolute bottom-10 left-5 flex lg:hidden flex-col items-center text-sky-900 px-1 pt-3 pb-2 rounded-3xl text-[0.7rem] border border-sky-900 w-fit animate-pulse text-center leading-tight">
                            Scroll<br/>More
                            <ArrowDown />
                        </button>        
                    </div>
                    <div className='hidden lg:flex items-center mt-8 mx-4'>
                        <Image src={'/assets/about-center-one.jpg'} className="h-[50vh] 2xl:h-[40vh] w-full object-cover object-center rounded-2xl shadow-xl shadow-gray-300" alt="About - Kazibase - Center" width={1000} height={1000}  />
                    </div>
                </div>
                <div className='flex flex-col justify-center mt-6 lg:mt-0 lg:pr-8' data-aos='fade-up'>
                    <h3 className="text-md 2xl:text-lg leading-1 uppercase tracking-wider font-bold text-orange-500">Who we are?</h3>
                    <h2 className="text-3xl 2xl:text-4xl capitalize text-sky-900 font-bold mb-3">Empowering Hustlers and Driving Local Business Success</h2>
                    <p className="text-md lg:text-lg 2xl:text-xl font-normal tracking-wide mb-5">
                        <span className="text-orange-500 font-semibold uppercase">Kazibase</span> is a platform designed to connect manual workers, or hustlers, with people in need of their services across Kenya. From household help to construction and delivery, Kazibase enables locals to find the workforce they need with ease.
                    </p>
                    <p className="text-md lg:text-lg 2xl:text-xl font-normal tracking-wide mb-2 lg:mb-5">
                        At Kazibase, we believe in empowering hardworking Kenyans by providing them with direct access to job opportunities, allowing them to earn by offering their skills and services. Whether you&apos;re a skilled worker or just starting out, Kazibase connects you with those looking for help.
                    </p>
                    <Link href={'/jobspage'} className="text-md lg:text-lg text-orange-500 hover:text-sky-900 font-semibold inline-flex items-center gap-4 mt-3 2xl:mt-6 w-fit border hover:border border-x-transparent border-t-transparent hover:border-sky-900 hover:rounded-xl border-b-sky-900 pl-2 pr-1 hover:py-2 sticky transition-auto ease-in-out duration-200 hover:scale-[1.1]">Explore Jobs</Link>
                </div>
            </div>
        </div>
    )
}
