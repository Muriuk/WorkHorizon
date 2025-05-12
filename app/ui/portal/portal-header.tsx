'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DropDown from "../dropdown"
import { useState } from "react"
import { Menu as MenuIcon, X } from "lucide-react"

export default function PortalHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const Menu = [
        {
            name: 'Dashboard',
            link: '/portal/dashboard',
            active: false,
        },
       
        {
            name: 'Messages',
            link: '/portal/dashboard/contact-messages',
            active: false,
        }
    ];
    
    const pathname = usePathname();
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return (
        <>
            {/* Mobile Menu Button - Only visible on small screens */}
            <div className="lg:hidden flex justify-end">
                <button 
                    onClick={toggleMenu} 
                    className="p-2 text-sky-900 focus:outline-none"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </button>
            </div>
            
            {/* Mobile Menu - Overlay that appears when menu is open */}
            <div className={fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}} onClick={toggleMenu}></div>
            
            {/* Menu Content */}
            <div 
                className={
                    lg:flex lg:justify-end lg:items-center lg:gap-7
                    fixed lg:static top-0 right-0 h-full lg:h-auto w-3/4 sm:w-1/2 lg:w-auto
                    bg-white lg:bg-transparent z-50 shadow-lg lg:shadow-none
                    transform transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                    flex flex-col lg:flex-row p-6 lg:p-0 gap-5 lg:gap-7
                }
            >
                {/* Close button for mobile menu */}
                <div className="flex justify-end lg:hidden mb-4">
                    <button 
                        onClick={toggleMenu}
                        className="text-sky-900"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                {
                    pathname === '/portal' ?
                    <h3 className="text-xl text-sky-900 font-[500] italic capitalize tracking-wide border-b border-orange-500 pb-1 px-1">{Lets get Login !!!}</h3>
                    :
                    <>
                        {
                            Menu.map((item, index) =>
                                item.dropdown ?
                                <div key={index} className="w-full lg:w-auto">
                                    <DropDown mainMenu={item} />
                                </div> :
                                <Link 
                                    href={item.link} 
                                    key={index} 
                                    className={relative text-base md:text-lg 2xl:text-xl font-semibold tracking-wide transitive-underline ${item.active ? 'text-[#F7801E]' : 'text-sky-900'} hover:text-sky-800 py-2 lg:py-0 border-b lg:border-0 border-gray-100 w-full block lg:inline}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )
                        }
                        <Link 
                            href={'/portal/dashboard/agents'} 
                            className={relative text-base md:text-lg 2xl:text-xl font-semibold tracking-wide transitive-underline text-sky-900 hover:text-sky-800 py-2 lg:py-0 border-b lg:border-0 border-gray-100 w-full block lg:inline}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Agents
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: '/portal' })}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors mt-4 lg:mt-0 w-full lg:w-auto"
                        >
                            Sign Out
                        </button>
                    </>
                }
            </div>
        </>
    );
}
