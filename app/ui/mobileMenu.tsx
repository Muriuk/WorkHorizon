'use client'

import { Grip, MailIcon, MapPin, PhoneCall, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DropDown from './dropdown';

export default function MobileMenu() {
    // State to control menu visibility
    const [openMenu, setOpenMenu] = useState(false);
    
    // Navigation menu configuration
    const menu = [
        { link: '/', name: 'Home', active: false },
        { link: '/jobspage', name: 'Jobs Available', active: false },
        { 
            link: '/', 
            name: 'Understand KaziBase', 
            active: false, 
            dropdown: [
                {name: 'About Us', link: '/about-us'}, 
                {name: 'Available Jobs', link: '/jobspage'}
            ] 
        },
        { link: '/contact-us', name: 'Contact Us', active: false },
    ];

    // Control body scroll based on menu state
    useEffect(() => {
        document.body.style.overflow = openMenu ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [openMenu]);

    // Contact information
    const contactInfo = [
        {
            icon: <PhoneCall className="w-5 h-auto text-sky-900" />,
            title: "Phone",
            value: "+254768258491",
            link: "tel:+254768258491",
        },
        {
            icon: <MailIcon className="w-5 h-auto text-sky-900" />,
            title: "Email Us",
            value: "info@kazibase.co.ke",
            link: "mailto:info@kazibase.co.ke",
        },
        {
            icon: <MapPin className="w-5 h-auto text-sky-900" />,
            title: "Our Office",
            value: "Nairobi, Kenya",
            link: null,
        },
    ];

    // Toggle menu handler
    const toggleMenu = () => setOpenMenu(!openMenu);
    
    return (
        <>
            {!openMenu ? (
                <Grip onClick={toggleMenu} className="cursor-pointer hover:text-sky-700 transition-colors duration-200" />
            ) : (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
                    {/* Close Button */}
                    <X 
                        className="absolute top-4 right-5 w-6 h-6 text-white z-50 cursor-pointer
                                 hover:text-orange-300 transition-colors duration-200" 
                        onClick={toggleMenu} 
                    />

                    {/* Sidebar Menu Panel */}
                    <div 
                        className={`fixed top-0 left-0 w-[85%] max-w-sm h-full bg-white shadow-2xl 
                                  transform transition-transform duration-500 ease-in-out
                                  ${openMenu ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        <div className="flex flex-col h-full py-8 px-6">
                            {/* Logo Section */}
                            <div className="mb-10">
                                <div className="flex flex-col">
                                    <h1 className="text-3xl font-bold tracking-tight">
                                        <span className="text-sky-900">KAZI</span>
                                        <span className="text-orange-500">BASE</span>
                                    </h1>
                                    <p className="text-sm text-sky-700 font-medium">
                                        Connecting Skilled Labor in Kenya
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <nav className="mb-8">
                                <ul className="space-y-4">
                                    {menu.map((item, idx) => (
                                        <li key={idx}>
                                            {item.dropdown ? (
                                                <DropDown mainMenu={item} />
                                            ) : (
                                                <Link 
                                                    href={item.link} 
                                                    className="block text-lg font-semibold text-sky-900 py-2 border-b border-gray-100
                                                             hover:text-orange-500 transition-colors duration-200"
                                                    onClick={toggleMenu}
                                                >
                                                    {item.name}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Action Buttons */}
                            <div className="space-y-4 mb-10">
                                <Link 
                                    href="/login" 
                                    onClick={toggleMenu}
                                    className="relative group flex items-center justify-center w-full overflow-hidden
                                             bg-gradient-to-r from-sky-800 to-sky-600 text-white font-bold
                                             py-3.5 px-4 rounded-xl shadow-lg transition-all duration-300"
                                >
                                    <span className="relative z-10 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Join as a Worker
                                    </span>
                                    <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-sky-600"></span>
                                </Link>
                                
                                <Link 
                                    href="/postjob" 
                                    onClick={toggleMenu}
                                    className="relative group flex items-center justify-center w-full overflow-hidden
                                             bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold
                                             py-3.5 px-4 rounded-xl shadow-lg transition-all duration-300"
                                >
                                    <span className="relative z-10 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Post a Job
                                    </span>
                                    <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-500"></span>
                                </Link>
                            </div>

                            {/* Contact Information */}
                            <div className="mt-auto">
                                <h3 className="text-lg font-semibold text-sky-800 mb-4">Contact Us</h3>
                                <div className="space-y-4">
                                    {contactInfo.map((item, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full
                                                              border-2 border-sky-900 text-sky-900">
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-600">{item.title}</p>
                                                {item.link ? (
                                                    <Link 
                                                        href={item.link}
                                                        className="text-base font-semibold text-sky-900 hover:text-orange-500 transition-colors duration-200"
                                                    >
                                                        {item.value}
                                                    </Link>
                                                ) : (
                                                    <p className="text-base font-semibold text-sky-900">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
