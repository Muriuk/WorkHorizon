import { ArrowRight, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, Star, Users, Shield, Award, Clock } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const menuItems = [
        { link: '/', name: 'Home' },
        { link: '/jobspage', name: 'Jobs Today' },
        { link: '/contact-us', name: 'Contact Us' },
        { link: '/terms', name: 'Terms of Service' },
        { link: '/privacy', name: 'Privacy Policy' },
        { link: '/accessibility', name: 'Accessibility' },
        { link: '/cookies', name: 'Cookies Settings' },
    ];

    const careerItems = [
        { link: '/login', name: 'Workers Login' },
        { link: '/jobspage', name: 'View Jobs Available' },
        { link: '/signup', name: 'Create Worker Account' },
        { link: '/postjob', name: 'Post task for workers' },
    ];

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com/kazibase', label: 'Facebook' },
        { icon: Twitter, href: 'https://twitter.com/kazibase', label: 'Twitter' },
        { icon: Instagram, href: 'https://instagram.com/kazibase', label: 'Instagram' },
        { icon: Linkedin, href: 'https://linkedin.com/company/kazibase', label: 'LinkedIn' },
        { icon: Youtube, href: 'https://youtube.com/kazibase', label: 'YouTube' },
    ];

    const stats = [
        { icon: Users, number: '1,000+', label: 'Active Workers' },
        { icon: Star, number: '5,000+', label: 'Jobs Completed' },
        { icon: Award, number: '99%', label: 'Success Rate' },
        { icon: Clock, number: '24/7', label: 'Support' },
    ];

    const contactInfo = [
        { icon: MapPin, text: 'Nairobi, Kenya' },
        { icon: Phone, text: '+254 768 258 491' },
        { icon: Mail, text: 'hello@kazibase.co.ke' },
    ];

    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12 lg:py-20">
                {/* Top Section - Hero Content */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-sky-400 mb-6">
                        Next-Level Customer Experiences
                    </h2>
                    <p className="text-xl lg:text-2xl text-gray-300 font-light">
                        At Your Home, In Your Neighborhood
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-sky-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* About Section */}
                    <div className="lg:col-span-5">
                        <div className="mb-8">
                            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                                <span className="text-sky-400">KAZI</span>
                                <span className="text-orange-400">BASE</span>
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                Kenya&apos;s leading platform connecting skilled workers with clients who need reliable, quick, and successful manual work solutions.
                            </p>
                            <div className="flex items-center space-x-4 text-gray-400 mb-4">
                                <Shield className="w-5 h-5 text-green-400" />
                                <span>Verified & Trusted Workers</span>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-center text-gray-300 hover:text-orange-400 transition-colors duration-200">
                                    <info.icon className="w-5 h-5 mr-3 text-sky-400" />
                                    <span>{info.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Explore More Links */}
                    <div className="lg:col-span-3">
                        <h3 className="text-2xl font-bold text-white mb-6 relative">
                            Explore More
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-400 to-sky-400 rounded-full"></div>
                        </h3>
                        <div className="space-y-3">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.link}
                                    className="flex items-center text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 group"
                                >
                                    <ArrowRight className="w-4 h-4 mr-3 text-sky-400 group-hover:text-orange-400 transition-colors duration-300" />
                                    <span className="border-b border-transparent group-hover:border-orange-400 pb-1">
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Career Shortcuts */}
                    <div className="lg:col-span-4">
                        <h3 className="text-2xl font-bold text-white mb-6 relative">
                            Quick Actions
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-400 to-sky-400 rounded-full"></div>
                        </h3>
                        <div className="space-y-3">
                            {careerItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.link}
                                    className="flex items-center text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 group"
                                >
                                    <ArrowRight className="w-4 h-4 mr-3 text-sky-400 group-hover:text-orange-400 transition-colors duration-300" />
                                    <span className="border-b border-transparent group-hover:border-orange-400 pb-1">
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </div>

                       {/* Newsletter Signup */}
                        <div className="mt-8 p-4 sm:p-6 bg-slate-800 rounded-lg border border-slate-700">
                            <h4 className="text-lg lg:text-xl font-semibold text-white mb-3">Stay Updated</h4>
                            <p className="text-gray-400 text-sm lg:text-base mb-4">
                                Get the latest job opportunities and updates
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm lg:text-base"
                                />
                                <button className="px-4 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-orange-500 to-sky-500 text-white rounded-md hover:from-orange-600 hover:to-sky-600 transition-all duration-300 hover:scale-105 font-medium text-sm lg:text-base whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="mt-16 pt-8 border-t border-slate-700">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="mb-6 lg:mb-0">
                            <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-sky-500 transition-all duration-300 hover:scale-110"
                                    >
                                        <social.icon className="w-6 h-6" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="text-center lg:text-right">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()}{" "}
                                <span className="font-bold">
                                    <span className="text-sky-400">KAZI</span>
                                    <span className="text-orange-400">BASE</span>
                                </span>
                                {" "}Kenya. All rights reserved.
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-orange-500 to-sky-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-60 h-60 bg-gradient-to-r from-sky-500 to-orange-500 rounded-full blur-3xl animate-pulse"></div>
            </div>
        </div>
    );
}
