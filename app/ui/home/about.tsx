'use client'
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AboutSection () {
    const [childBtns, setChildBtns] = useState<boolean>(false);

    return(
        <div className="my-14 xl:my-28 mx-auto w-[88%] lg:w-full overflow-x-hidden container">
            <h3 className="text-3xl xl:text-4xl capitalize text-sky-900 font-bold mb-3" data-aos='fade-up'>More Than a Job Board – Empowering Kenyan Hustlers</h3>
            <p className="text-md lg:text-xl font-normal tracking-wide" data-aos='fade-up'>
                At <span className="text-orange-500 font-semibold uppercase">Kazibase</span>, we are not just another job platform—we are a bridge connecting everyday Kenyans to real opportunities. Whether youre a hustler offering manual services or someone in need of help, Kazibase makes it easy to connect, collaborate, and thrive.
            </p>
            <div className="flex flex-col lg:grid lg:grid-cols-[45%,55%] my-5 w-full">
                <div className="lg:pr-5 lg:pl-3" data-aos='fade-up xl:fade-right'>
                    <Image src={'/assets/h7.jpg'} alt="About - Kazibase" className="rounded-xl object-cover shadow-md shadow-transparent-one object-center w-full h-[350px] lg:h-[500px]" width={500} height={500} />
                </div>
                <div className="lg:pl-8 lg:pr-3 flex flex-col justify-start pt-10 lg:py-16" data-aos='fade-up xl:fade-left' data-aos-duration='700'>
                    <p className="text-md lg:text-xl font-normal tracking-wide">
                    <span className='text-sky-900 font-[600] uppercase text-2xl lg:text-3xl mb-1'>We believe in empowering every hustle,</span><br className='hidden 2xl:block'/> by ensuring access to local jobs, fair pay, and the freedom to choose work that fits your skills and location. From Nairobi to Kisumu, Kazibase is built for Kenyans, by Kenyans.
                    </p>
                    <p className="text-md lg:text-xl font-normal tracking-wide mt-6">
                        Whether youre a fundi, mama fua, painter, or boda rider, we help you get noticed and get hired—quickly, safely, and directly through your phone.
                    </p>
                    <div className="flex flex-col items-center jusitfy-center lg:grid gap-5 lg:grid-cols-[35%,65%] lg:items-start mt-6">
                        <button onClick={() => setChildBtns(!childBtns)} className={` relative text-md lg:text-lg text-orange-500 hover:text-sky-900 font-semibold inline-flex items-center gap-4 w-fit border hover:border border-x-transparent border-t-transparent hover:border-sky-900 hover:rounded-xl border-b-sky-900 px-2 lg:pl-2 lg:pr-1 hover:hover:py-2 sticky transition-auto ease-in-out duration-200 hover:scale-[1.1]`}>Connect With Us (click) <ArrowRight className={`w-5 hidden lg:block`}/></button>
                        <div className={` transition-all ease-in-out duration-500 relative ${childBtns? 'flex': 'hidden'} flex-col items-center lg:items-start lg:w-full`}>
                            <Link href='/contact-us' className="relative text-md lg:text-lg text-sky-900 font-semibold inline-flex items-center gap-4 w-fit border border-sky-900 rounded-xl px-3 py-1 transition-auto ease-in-out duration-200 py-1 hover:scale-[1.05]">Get in Touch</Link>
                            <Link href='/jobspage' className="relative text-md lg:text-lg text-gray-100 font-semibold inline-flex items-center gap-4 mt-4 w-fit border hover:border border-transparent hover:border-sky-900 rounded-xl bg-sky-900 px-3 py-1  transition-auto ease-in-out duration-200 hover:scale-[1.1]">Browse Jobs</Link>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}
