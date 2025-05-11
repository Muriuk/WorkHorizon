import { CheckCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JoinGlobalTeam(){
    return(
        <div className="my-14 lg::my-28 overflow-x-hidden container w-[88%] xl:w-full">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-[55%,45%] my-5 w-full">
                <div className="lg:pr-8 lg:pl-2 flex flex-col relative justify-start pt-8 lg:pt-12" data-aos='fade-right' data-aos-duration='700'>
                    <h3 className="text-3xl xl:text-4xl capitalize text-sky-900 font-bold xl:mb-3">Join the Kazibase movement</h3> 
                    <p className="text-md lg:text-xl font-normal tracking-wide">
                    Kazibase is empowering hustlers across Kenya to earn through real, local jobs. Whether you&apos;re skilled in cleaning, construction, deliveries, or home repairs — there&apos;s space for you here. We welcome hardworking Kenyans ready to take control of their hustle and grow.
                    </p>
                    <p className="text-md lg:text-xl font-normal tracking-wide mt-6">By joining Kazibase, you&apos;re connecting to a network that values your time, effort, and skills. It&apos;s not just a job board — it&apos;s a community built to support and uplift the everyday hustler in Kenya.</p>
                    <Link href={'/login'} className="text-md xl:text-lg text-orange-500 hover:text-sky-900 font-semibold inline-flex items-center gap-4 mt-6 w-fit border hover:border border-x-transparent border-t-transparent hover:border-sky-900 hover:rounded-xl border-b-sky-900 pl-2 pr-1 hover:px-4 hover:py-2 sticky transition-auto ease-in-out duration-200 hover:scale-[1.1]">Create Account <CheckCheck className="w-5"/></Link>
                </div>
                <div className="lg:pl-5 lg:pr-3" data-aos='fade-left'>
                    <Image src={'/assets/h8.jpg'} alt="Kazibase Hustlers" className="rounded-xl object-cover object-center shadow-md shadow-transparent-one w-full h-[350px] lg:h-[500px]" width={500} height={500} />
                </div>
            </div>
        </div>
    )
}
