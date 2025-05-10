'use client'

import { JobFormData } from "@/app/lib/elements"
import { ArrowRightSquare } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner";

export default function ActiveJobs(){

    const [activeJobs, setActiveJobs] = useState<JobFormData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const GetJobs = async() =>{ 
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getJobs/limit`)
            const Jobs = await resp.json()
            console.log('Jobs => ', Jobs)
            setActiveJobs(Jobs);
            setLoading(false);
        } 
        GetJobs();
    },[])

    return(
        <div className='w-[90%] sm:w-[85%] my-4 bg-gray-200 rounded-3xl p-4 sm:p-8 mx-auto shadow-xl shadow-gray-300'>
            <div className='bg-gray-100 h-full flex flex-col items-center rounded-3xl py-3'>  
                <h3 className="w-fit mx-auto mt-2 text-2xl sm:text-3xl font-semibold text-sky-900 border-b border-orange-500">Jobs Active</h3>
                <div className='mx-4 mt-4 w-[100%] min-h-[200px] 2xl:min-h-[250px]'>
                    {
                        loading ? 
                        <div className="w-full h-full flex flex-col justify-center items-center ">
                            <TailSpin visible={true} height={50} width={50} color='#0C4A6E' ariaLabel='tail-spin-loading' radius={1} />
                        </div>:
                        activeJobs.length > 0 ?                         
                        activeJobs.map((job) => 
                            <div key={job.jobid} className="grid items-center border-b border-gray-200 text-lg mb-1 grid-cols-1 sm:grid-cols-[13%,87%]">
                                <h4 className="py-2 px-3 text-orange-500 "><ArrowRightSquare /> </h4>
                                <Link href={`/portal/dashboard/jobs-list/whjob_${job.jobid}`} className="py-2 hover:text-sky-900 hover:underline transition-all ease-in-out duration-300 hover:scale-[1.02] ">{job.title}</Link>
                            </div>
                        ) :
                        <div className='flex flex-col items-center justify-center h-[220px] w-full'>
                            <h2 className="text-lg lg:text-xl text-gray-400 font-semibold capitalize text-center">No active job</h2>
                        </div>  
                    }
                </div>
                <Link href='/portal/dashboard/jobs-list' className="mt-6 px-4 py-2 text-gray-100 rounded-xl font-semibold tracking-wide bg-sky-900 border-2 border-transparent hover:border-sky-900 hover:text-sky-900 hover:bg-transparent w-fit mx-auto transition-transform ease-in-out duration-300 hover:scale-[1.03]">View All</Link>
            </div>
        </div>
    )
}
