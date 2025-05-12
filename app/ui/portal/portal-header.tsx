'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DropDown from "../dropdown"
import { useState } from "react"
import { Menu as MenuIcon, X } from "lucide-react"

export default function PortalHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const Menu = [
        {
            name: 'Dashboard',
            link: '/portal/dashboard',
            active: false,
        },
        {
            name: 'Job Options',
            link: '/portal/dashboard/jobs-list',
            active: false,
            dropdown: [
                { name: 'All Jobs', link: '/portal/dashboard/jobs-list' },
                { name: 'Add New Job', link: '/portal/dashboard/new-job-addition' }
            ]
        },
        {
            name: 'All Applicants',
            link: '/portal/dashboard/applicants',
            active: false,
        },
        {
            name: 'Messages',
            link: '/portal/dashboard/contact-messages',
            active: false,
        }
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            {/* Top Header (visible always) */}
            <div className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md z-50 relative">
                <div className="text-sky-900 font-bold text-xl">Kazibase</div>

                {/* Menu toggle button - only on mobile */}
                <button 
                    onClick={toggleMenu} 
                    className="lg:hidden p-2 text-sky-900 focus:outline-none"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </button>
            </div>

            {/* Mobile-only menu panel */}
            <div 
                className={`
                    fixed top-[64px] left-0 w-3/4 sm:w-1/2 h-[calc(100vh-64px)] bg-white z-40 shadow-md
                    transform transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:hidden flex flex-col gap-4 p-5
                `}
            >
                {pathname === '/portal' ? (
                    <h3 className="text-xl text-sky-900 font-medium italic border-b border-orange-500 pb-2">Lets get Login !!!</h3>
                ) : (
                    <>
                        {Menu.map((item, index) =>
                            item.dropdown ? (
                                <div key={index}>
                                    <DropDown mainMenu={item} />
                                </div>
                            ) : (
                                <Link 
                                    href={item.link}
                                    key={index}
                                    className="text-sky-900 text-base font-semibold py-2 border-b border-gray-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )
                        )}
                        <Link 
                            href={'/portal/dashboard/agents'} 
                            className="text-sky-900 text-base font-semibold py-2 border-b border-gray-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Agents
                        </Link>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                signOut({ callbackUrl: '/portal' });
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
