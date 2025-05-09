'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import Next.js pathname hook
import '../globals.css'
import MobileMenu from "./mobileMenu";
import DropDown from "./dropdown";
import PortalHeader from "./portal/portal-header";

export default function MainHeader() {
    const pathname = usePathname(); // Get current path
    const [adminMenu, setAdminMenu] = useState<boolean>(false);
    const [headerDisplay, setHeaderDisplay] = useState<boolean>(true);
    const [lastScrollY, setLastScroll] = useState<number>(0)
    const [hideHeader, setHideHeader] =  useState<boolean>(false)
    const [menuItems, setMenuItems] = useState([
        { link: '/', name: 'Home', active: false },
        { link: '/about-us', name: 'About Us', active: false },
        { link: '/careers', name: 'Jobs', active: false, dropdown:[ {link: '/careers', name: 'Understand KaziBase'},{link:'/careers/jobs', name: 'Available Jobs'}] },
        { link: '/contact-us', name: 'Contact Us', active: false },
    ]);

    const HandleScroll = () => {
        if(window.scrollY > lastScrollY && lastScrollY > 100){
            setHeaderDisplay(false)
        }else{
            setHeaderDisplay(true)
        }
        setLastScroll(window.scrollY)
    }

    useEffect(() => {
        if(pathname.includes('/jobs') && !pathname.includes('/jobs-list')){
            setHideHeader(true)
        }else{
            setHideHeader(false)
        }
    },[pathname])

    useEffect(() => {
        window.addEventListener('scroll', HandleScroll)
        return(() => {
            window.removeEventListener('scroll', HandleScroll)
        })
    })

    useEffect(() =>{
        if(pathname.includes('/portal')){
            setAdminMenu(true)
        }else{
            setAdminMenu(false)
        }
    },[pathname])

    useEffect(() => {
        setMenuItems((prevItems) =>
            prevItems.map(item => ({
                ...item,
                active: pathname === item.link || (pathname === '' && item.link === '/'), // Check for empty path
            }))
        );
    }, [pathname]); // Re-run effect when pathname changes

    return (
        <div className={`${hideHeader ? 'hidden':""} w-full bg-headerBackground py-3 shadow-sm shadow-gray-300 sticky top-0 z-50 transition-transform ease-in-out duration-500 transform ${headerDisplay ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className={`flex justify-between px-0 lg:grid ${adminMenu ? 'lg:grid-cols-[20%,10%,70%]':'lg:grid-cols-[20%,50%,30%]'} container`}>
                <div className="flex">
                    <Link className="block" href={'/'}>
                        <div className="w-[13rem] lg:w-[15rem] h-auto flex items-center">
                            <div className="flex flex-col">
                                <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">
                                    <span className="text-sky-900">KAZI</span>
                                    <span className="text-[#F7801E]">BASE</span>
                                </h1>
                                <p className="text-xs lg:text-sm text-sky-700 font-medium tracking-tight">
                                    Connecting Skilled Labor in Kenya
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="hidden lg:flex justify-center items-center gap-8">
                    {
                    !adminMenu ? 
                        menuItems.map((Item, index) => 
                            Item.dropdown ? 
                                <DropDown mainMenu={Item} key={index}/>
                                :
                                <Link
                                    className={`relative text-lg xl:text-xl font-semibold tracking-wide transitive-underline ${Item.active ? 'text-[#F7801E]' : 'text-sky-900'} hover:text-sky-800`}
                                    href={Item.link}
                                    key={index}>
                                {Item.name} </Link>
                            
                        ):(
                            null
                        )
                    }
                </div>
                <div className="hidden lg:flex items-center justify-end">
                    {
                        adminMenu ? 
                            <PortalHeader />
                        :
                            <div className="flex gap-4 xl:gap-6 items-center">
                                <Link 
                                    href={'/'} 
                                    className="w-full xl:w-48 text-center relative group overflow-hidden bg-gradient-to-br from-sky-700 to-sky-900 text-white font-bold text-base xl:text-lg py-3 xl:py-4 px-6 xl:px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-sky-700/50"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Join as a Worker
                                    </span>
                                    <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-sky-600"></span>
                                </Link>
                                
                                <Link 
                                    href={'/'} 
                                    className="w-full xl:w-48 text-center relative group overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-base xl:text-lg py-3 xl:py-4 px-6 xl:px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Post a Job
                                    </span>
                                    <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-500"></span>
                                </Link>
                            </div>
                    }
                </div>
                <div className="flex lg:hidden items-center justify-end">
                    <MobileMenu />
                </div>
            </div>
        </div>
    );
}
