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
        <div className='w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] my-4 bg-gray-200 rounded-xl md:rounded-3xl p-3 md:p-4 lg:p-8 mx-auto shadow-lg shadow-gray-300'>
            <div className='bg-gray-100 h-full flex flex-col items-center rounded-xl md:rounded-3xl py-3 min-h-[300px] sm:min-h-[320px]'>  
                <h3 className="w-fit mx-auto mt-2 text-xl md:text-2xl lg:text-3xl font-semibold text-sky-900 border-b border-orange-500">Jobs Active</h3>
                
                <div className='px-2 sm:px-4 mt-4 w-full min-h-[180px] md:min-h-[200px] 2xl:min-h-[250px] flex-1'>
                    {
                        loading ? 
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <TailSpin visible={true} height={40} width={40} color='#0C4A6E' ariaLabel='tail-spin-loading' radius={1} />
                        </div> :
                        activeJobs.length > 0 ?                         
                        activeJobs.map((job) => 
                            <div key={job.jobid} className="grid items-center border-b border-gray-200 text-base sm:text-lg mb-1 grid-cols-[15%,85%] sm:grid-cols-[10%,90%] md:grid-cols-[8%,92%]">
                                <div className="py-1 sm:py-2 px-1 sm:px-3 text-orange-500 flex justify-center sm:justify-start">
                                    <ArrowRightSquare size={18} className="sm:size-5" />
                                </div>
                                <Link 
                                    href={`/portal/dashboard/jobs-list/whjob_${job.jobid}`} 
                                    className="py-1 sm:py-2 truncate hover:text-sky-900 hover:underline transition-all ease-in-out duration-300 hover:scale-[1.01]"
                                >
                                    {job.title}
                                </Link>
                            </div>
                        ) :
                        <div className='flex flex-col items-center justify-center h-[180px] md:h-[220px] w-full'>
                            <h2 className="text-base md:text-lg lg:text-xl text-gray-400 font-semibold capitalize text-center">No active job</h2>
                        </div>  
                    }
                </div>
                
                <div className="w-full mt-auto pt-4">
                    <Link 
                        href='/portal/dashboard/jobs-list' 
                        className="mt-2 md:mt-6 px-3 sm:px-4 py-1.5 sm:py-2 text-sm md:text-base text-gray-100 rounded-lg md:rounded-xl font-medium md:font-semibold tracking-wide bg-sky-900 border-2 border-transparent hover:border-sky-900 hover:text-sky-900 hover:bg-transparent w-fit mx-auto block transition-transform ease-in-out duration-300 hover:scale-[1.03]"
                    >
                        View All
                    </Link>
                </div>
            </div>
        </div>
    )
}
