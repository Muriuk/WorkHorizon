'use client'
import { Message } from "@/app/lib/elements"
import { Asterisk, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner"

export default function MessagesList(){
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const GetMessages = async() => {
            const response = await fetch('/api/message/limit');
            const received = await response.json();
            setMessages(received);
            setLoading(false)
        }
        GetMessages()
        const interval = setInterval(GetMessages, 300000); 

        return () => clearInterval(interval);
    },[])

    return(
        <div className='w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:mx-14 my-4 sm:my-6 md:my-10 bg-gray-200 rounded-xl md:rounded-3xl p-3 md:p-6 lg:p-8 shadow-lg shadow-gray-300 mx-auto'>
            <div className='bg-gray-100 h-full flex flex-col items-center rounded-xl md:rounded-3xl py-3 relative min-h-[320px] sm:min-h-[350px]'> 
                <h3 className="w-fit mx-auto mt-2 text-xl md:text-2xl font-semibold text-sky-900 border-b border-orange-500">Latest Messages</h3> 
                
                <div className='px-2 sm:px-4 mt-4 w-full md:w-[95%] min-h-[200px] max-h-[200px] md:min-h-[200px] md:max-h-[200px] 2xl:min-h-[250px] 2xl:max-h-[300px] overflow-auto flex flex-col relative flex-1'>
                    {/* Header Row - Hidden on mobile, visible on tablets and up */}
                    <div className="hidden sm:grid grid-cols-[20%,20%,60%] w-full items-center border-b border-sky-900 text-base sm:text-lg mb-1">
                        <h3 className='py-2 px-2 md:px-3 font-semibold capitalize text-sky-900'>{`Sender's Name`}</h3>
                        <h3 className='py-2 px-2 md:px-3 font-semibold capitalize text-sky-900'>{`Reason`}</h3>
                        <h3 className='py-2 px-2 md:px-3 font-semibold text-sky-900'>{`Message`}</h3>
                    </div>
                    
                    {/* Content */}
                    {
                        loading ? 
                        <div className="w-full h-[200px] flex flex-col justify-center items-center">
                            <TailSpin visible={true} height={40} width={40} color='#0C4A6E' ariaLabel='tail-spin-loading' radius={1} />
                        </div> :
                        messages.length > 0 ? 
                            messages.map((message) => (
                                <div key={message.id} className="mb-2 sm:mb-1">
                                    {/* Mobile View (Card Style) */}
                                    <div className="sm:hidden border border-gray-200 rounded-lg p-2 relative">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className={`flex relative ${message.status === 'New' ? 'font-semibold text-sky-900':'font-normal'} capitalize text-sm`}>
                                                {`${message.firstname} ${message.lastname}`} 
                                                {message.status === 'New' && <Asterisk className='text-red-600 absolute -right-3 w-2 h-auto' />}
                                            </h3>
                                            <span className={`text-xs ${message.status === 'New' ? 'font-semibold text-sky-900':'text-gray-500'}`}>
                                                {message.reason === 'none' ? '---' : message.reason}
                                            </span>
                                        </div>
                                        <p className={`${message.status === 'New' ? 'font-semibold text-sky-900':'font-normal'} text-sm truncate mb-1`}>
                                            {message.message}
                                        </p>
                                        <Link 
                                            href={`/portal/dashboard/contact-messages/cm-wh-${message.id}`} 
                                            className="flex items-center justify-center w-full mt-1 text-xs font-medium text-sky-900 py-1 border-t border-gray-200"
                                        >
                                            View Details <ChevronRight size={14} className="ml-1" />
                                        </Link>
                                    </div>
                                    
                                    {/* Tablet/Desktop View */}
                                    <div className={`hidden sm:grid grid-cols-[20%,20%,60%] w-full items-start border-b border-gray-200`}>
                                        <h3 className={`flex relative w-fit py-2 pl-2 md:pl-3 ${message.status === 'New' ? 'font-semibold text-sky-900':'font-normal'} capitalize text-base md:text-lg`}>
                                            {`${message.firstname} ${message.lastname}`} 
                                            {message.status === 'New' && <Asterisk className='text-red-600 absolute -right-3 w-3 h-auto' />}
                                        </h3>
                                        <h3 className={`py-2 px-2 md:px-3 ${message.status === 'New' ? 'font-semibold text-sky-900':'font-normal'} capitalize text-base md:text-lg`}>
                                            {message.reason === 'none' ? '---' : message.reason}
                                        </h3>
                                        <div className='grid grid-cols-[85%,15%] sm:grid-cols-[88%,12%] md:grid-cols-[90%,10%] items-center'>
                                            <h3 className={`py-2 px-2 md:px-3 ${message.status === 'New' ? 'font-semibold text-sky-900':'font-normal'} capitalize text-base md:text-lg truncate`}>
                                                {message.message}
                                            </h3>
                                            <Link 
                                                href={`/portal/dashboard/contact-messages/cm-wh-${message.id}`} 
                                                className={`${message.status === 'New' ? 'text-sky-900': ''} font-semibold text-xs sm:text-sm border-b border-orange-500 w-fit mx-auto`}
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )) : 
                            <div className='flex flex-col items-center justify-center h-[200px] w-full'>
                                <h2 className="text-base md:text-lg lg:text-xl text-gray-400 font-semibold capitalize text-center">No new message</h2>
                            </div>        
                    }
                </div>
                
                <div className="w-full mt-auto pt-4">
                    <Link 
                        href='/portal/dashboard/contact-messages' 
                        className="mt-2 md:mt-6 px-3 sm:px-4 py-1.5 sm:py-2 text-sm md:text-base text-gray-100 rounded-lg md:rounded-xl font-medium md:font-semibold tracking-wide bg-sky-900 border-2 border-transparent hover:border-sky-900 hover:text-sky-900 hover:bg-transparent w-fit mx-auto block transition-transform ease-in-out duration-300 hover:scale-[1.03]"
                    >
                        View All
                    </Link>
                </div>
            </div>
        </div>
    )
}
