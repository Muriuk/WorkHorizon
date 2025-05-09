'use client'

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobsHead() {
    const pathname = usePathname();
    const [singleJob, setSingleJob] = useState<boolean>(false);

    useEffect(() => {
        if (pathname.includes('/jobs/')) {
            setSingleJob(true);
        } else {
            setSingleJob(false);
        }
    }, [pathname]);

    return (
        <div className='bg-neutral-100 w-full shadow-md shadow-gray-200'>
            <div className={`container w-[88%] lg:w-[77%] 2xl:w-[70%] flex pt-6 ${singleJob ? 'hidden' : ''}`}>
                <Link href={'/'} className="hidden lg:block text-gray-500 font-semibold text-sm underline">Home</Link>
                <ArrowRight className="w-4 h-auto text-gray-500 mr-2 lg:mx-3 rotate-180 lg:rotate-0" />
                <Link href={'/careers'} className="text-gray-500 font-semibold text-sm underline">Jobs</Link>
                <ArrowRight className="hidden lg:block w-4 h-auto text-gray-500 mx-3" />
                <Link href={'/careers/jobs'} className="hidden lg:block text-orange-500 font-semibold text-sm underline">Available Jobs</Link>
            </div>

            <div className='container w-[88%] flex flex-col bg-neutral-100 items-center justify-center lg:w-full py-8 lg:pt-8 lg:pb-12'>
                {/* Inserted Logo Block */}
                <Link href={'/careers/jobs'}>
                    <div className="w-[13rem] lg:w-[15rem] h-auto flex items-center justify-center mb-3">
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">
                                <span className="text-sky-900">KAZI</span>
                                <span className="text-[#F7801E]">BASE</span>
                            </h1>
                            <p className="text-xs lg:text-sm text-sky-700 font-medium tracking-tight text-center">
                                Connecting Skilled Labor in Kenya
                            </p>
                        </div>
                    </div>
                </Link>

                {!singleJob && (
                    <>
                        <h3 className="text-3xl 2xl:text-4xl capitalize text-sky-900 font-bold mb-4 text-center">
                            Job Available  <br className='block lg:hidden' /> at Kazibase
                        </h3>
                        <p className="text-md lg:text-lg 2xl:text-xl font-normal tracking-wide text-center lg:mx-[20%]">
                            {`We're eager to connect you with manual jobs in kenya. Below, you'll find the current jobs at Kazibase, select any job and apply.`}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
