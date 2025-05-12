'use client'

import { signOut } from "next-auth/react"
import ActiveJobs from "./dashboardElements/activeJobs"; 
import ApplicantsView from "./dashboardElements/applicantsView";
import MessagesList from "./dashboardElements/messagesList";

export default function DashboardBody() {
    return (
        <div className='relative'>
            {/* Mobile-only Sign Out Button */}
            <button  
                onClick={() => signOut({ callbackUrl: '/portal' })} 
                className="block lg:hidden absolute top-2 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded z-50 transition-colors"
            >
                Sign Out
            </button>

            <div className='container w-[88%] lg:w-full min-h-[90vh] pt-10 pb-20 flex flex-col justify-center'>
                <h1 className="text-xl font-semibold mb-3 w-fit mx-auto text-sky-900 border-b border-orange-500 px-1">Hello, Worker</h1>
                <h1 className="text-2xl font-semibold mb-6 w-fit mx-auto text-sky-900 border-b border-orange-500 px-1">{`Welcome to your Portal`}</h1>

                <div className='grid grid-cols-2 gap-10 w-full h-[450px] max-h-[450px] 2xl:h-[520px] 2xl:max-h-[530px]'>
                    <ActiveJobs />
                    <ApplicantsView />
                </div>

                <MessagesList />
            </div>
        </div>
    );
}
