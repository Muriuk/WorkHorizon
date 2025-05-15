'use client'
import { Grip, MailIcon, MapPin, PhoneCall, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DropDown from './dropdown';

export default function MobileMenu() {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const menu = [
        { link: '/', name: 'Home', active: false },
         { link: '/jobspage', name: 'Jobs Available', active: false },
        { link: '/', name: 'Understand KaziBase', active: false, dropdown:[{name:'About Us', link: '/about-us'}, {name: 'Available Jobs', link: '/jobspage'}] },
        { link: '/contact-us', name: 'Contact Us', active: false },
    ]
    useEffect(() => {
        if(openMenu){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    })

    return (
        <>
            {!openMenu ? (
                <Grip onClick={() => setOpenMenu(true)} className="cursor-pointer" />
            ) : (
                <div className="w-full h-screen fixed top-0 left-0 z-40 bg-black/50">
                    {/* Close Icon */}
                    <div className="absolute w-12 h-12 flex items-center justify-center top-4 right-4 z-50 cursor-pointer bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200" onClick={() => setOpenMenu(false)}>
                        <X className="w-6 h-6 text-white" />
                    </div>

                    {/* Sidebar */}
                    <div className={`w-[88%] h-full bg-white shadow-2xl fixed top-0 left-0 transform transition-transform ease-in-out duration-[0.7s] ${openMenu ? 'translate-x-0':'-translate-x-full'} `}>
                        <div className='flex flex-col h-full'>
                            {/* Header Section */}
                            <div className='px-6 py-8 bg-gradient-to-r from-sky-50 to-blue-50 border-b border-gray-100'>
                                <div className="flex flex-col">
                                    <h1 className="text-3xl font-bold tracking-wide">
                                        <span className="text-sky-900">KAZI</span>
                                        <span className="text-[#F7801E]">BASE</span>
                                    </h1>
                                    <p className="text-sm text-sky-700 font-medium tracking-tight mt-1">
                                        Connecting Skilled Labor in Kenya
                                    </p>
                                </div>
                            </div>

                            {/* Menu Section */}
                            <div className='flex-1 px-6 py-8'>
                                <div className='flex flex-col space-y-1'>
                                    {menu.map((item, idx) => 
                                        item.dropdown ? 
                                            <DropDown mainMenu={item} key={idx}/>
                                            :
                                            <Link 
                                                href={item.link} 
                                                key={idx} 
                                                className='text-lg text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 hover:text-sky-900 transition-all duration-200 border-b border-gray-50' 
                                                onClick={() => setOpenMenu(!openMenu)}
                                            >
                                                {item.name}
                                            </Link>   
                                    )}
                                </div>
                            </div>
                            
                            {/* Action Buttons Section */}
                            <div className='px-6 py-6 space-y-4 border-t border-gray-100'>
                                <Link 
                                    href={'/login'} 
                                    onClick={() => setOpenMenu(false)}
                                    className="relative group overflow-hidden bg-gradient-to-r from-sky-700 to-sky-900 text-white font-semibold text-base py-4 px-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center w-full"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Join as a Worker
                                    </span>
                                    <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-sky-600"></span>
                                </Link>
                                
                                <Link 
                                    href={'/postjob'} 
                                    onClick={() => setOpenMenu(false)}
                                    className="relative group overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-base py-4 px-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center w-full"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Post a Job
                                    </span>
                                    <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-500"></span>
                                </Link>
                            </div>

                            {/* Contact Info Section */}
                            <div className='px-6 py-6 bg-gray-50 border-t border-gray-100'>
                                <div className='space-y-4'>
                                    <div className='flex items-center space-x-4'>
                                        <div className='w-12 h-12 bg-white border-2 border-sky-900 flex items-center justify-center rounded-full shadow-sm'>
                                            <PhoneCall className='w-5 h-5 text-sky-900'/>
                                        </div>
                                        <div className='flex flex-col'>
                                            <h3 className='text-sm font-medium text-gray-600'>Phone</h3>
                                            <Link href='tel:+254768258491' className='text-base font-semibold text-sky-900 hover:text-sky-700 transition-colors duration-200'>+254768258491</Link>
                                        </div>
                                    </div>
                                    
                                    <div className='flex items-center space-x-4'>
                                        <div className='w-12 h-12 bg-white border-2 border-sky-900 flex items-center justify-center rounded-full shadow-sm'>
                                            <MailIcon className='w-5 h-5 text-sky-900'/>
                                        </div>
                                        <div className='flex flex-col'>
                                            <h3 className='text-sm font-medium text-gray-600'>Email Us</h3>
                                            <Link href='mailto:info@kazibase.co.ke' className='text-base font-semibold text-sky-900 hover:text-sky-700 transition-colors duration-200'>info@kazibase.co.ke</Link>
                                        </div>
                                    </div>
                                    
                                    <div className='flex items-start space-x-4'>
                                        <div className='w-12 h-12 bg-white border-2 border-sky-900 flex items-center justify-center rounded-full shadow-sm'>
                                            <MapPin className='w-5 h-5 text-sky-900'/>
                                        </div>
                                        <div className='flex flex-col'>
                                            <h3 className='text-sm font-medium text-gray-600'>Our Office</h3>
                                            <h3 className='text-base font-semibold text-sky-900'>Nairobi, Kenya</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
