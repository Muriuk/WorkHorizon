'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardNavbar() {
    const pathname = usePathname();
    const [menuItems, setMenuItems] = useState([
        { link: '/dashboard', name: 'Dashboard' },
        { link: '/dashboard/my-jobs', name: 'My Jobs' },
        { link: '/dashboard/messages', name: 'Messages' },
        { link: '/logout', name: 'Logout' },
    ]);

    useEffect(() => {
        setMenuItems((prev) =>
            prev.map(item => ({
                ...item,
                active: pathname === item.link,
            }))
        );
    }, [pathname]);

    return (
        <div className="w-full bg-white py-3 shadow-md sticky top-0 z-50">
            <div className="container flex items-center justify-between px-4 md:px-6">
                {/* Brand */}
                <Link href="/dashboard">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <h1 className="text-xl md:text-2xl font-bold tracking-wide">
                            <span className="text-sky-900">KAZI</span>
                            <span className="text-orange-500">BASE</span>
                        </h1>
                        <p className="hidden md:block text-xs text-sky-700 font-medium tracking-tight">
                            Worker Dashboard
                        </p>
                    </div>
                </Link>

                {/* Menu - Desktop */}
                <div className="hidden md:flex items-center gap-6">
                    {menuItems.map((item, i) => (
                        <Link
                            key={i}
                            href={item.link}
                            className={`text-sm md:text-base font-semibold tracking-wide transition-colors ${
                                item.active ? 'text-orange-500' : 'text-sky-900 hover:text-sky-700'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Placeholder */}
                <div className="md:hidden">
                    <button className="text-sky-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
