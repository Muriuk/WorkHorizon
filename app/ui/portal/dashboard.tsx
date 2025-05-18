"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import ActiveJobs from "./dashboardElements/activeJobs";
import MessagesList from "./dashboardElements/messagesList";
import Workerjob from "./workerjob"; // Import the WorkerJob component

interface MenuItem {
  name: string;
  id: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", id: "dashboard", icon: "dashboard" }, // Added Dashboard as first menu item
  { name: "Active Jobs", id: "active-jobs", icon: "briefcase" },
  { name: "Messages", id: "messages", icon: "message-square" },
  { name: "Weekly Subscription", id: "weekly-subscription", icon: "credit-card" },
  { name: "All Jobs", id: "all-jobs", icon: "grid" }, // Removed route property
  { name: "My Profile", id: "my-profile", icon: "user" },
  { name: "Settings", id: "settings", icon: "settings" },
];

export default function Dashboard(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("dashboard"); // Set default to dashboard
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar when clicking outside or when navigation is clicked
  const closeSidebar = (): void => setSidebarOpen(false);

  // Handle navigation - update active section
  const handleNavigation = (item: MenuItem): void => {
    setActiveSection(item.id);
    closeSidebar();
  };

  // Render icon based on name
  const renderIcon = (iconName: string): JSX.Element | null => {
    switch (iconName) {
      case "dashboard":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "briefcase":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
     
      case "message-square":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case "credit-card":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case "grid":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case "user":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case "settings":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

   // Render content based on active section
  const renderContent = (): JSX.Element => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="text-center py-4">
              <h4 className="text-xl font-medium text-sky-900 mb-4">Welcome to Your Dashboard</h4>
              <p className="text-gray-600 mb-6">
                Here's an overview of your recent activities and opportunities.
              </p>
              
              {/* Dashboard Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-sky-50 p-6 rounded-lg border border-sky-100 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-100 rounded-full text-sky-600 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h5 className="text-lg font-medium text-sky-900 mb-1">Jobs Applied</h5>
                  <p className="text-3xl font-bold text-sky-600">12</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h5 className="text-lg font-medium text-green-900 mb-1">Jobs Completed</h5>
                  <p className="text-3xl font-bold text-green-600">7</p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full text-orange-600 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h5 className="text-lg font-medium text-orange-900 mb-1">Pending Jobs</h5>
                  <p className="text-3xl font-bold text-orange-600">3</p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-6">
                <h5 className="text-lg font-medium text-sky-900 mb-4">Quick Actions</h5>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => setActiveSection("all-jobs")}
                    className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    Browse All Jobs
                  </button>
                  <button 
                    onClick={() => setActiveSection("active-jobs")}
                    className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    View Active Jobs
                  </button>
                  <button 
                    onClick={() => setActiveSection("messages")}
                    className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    Check Messages
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "active-jobs":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <ActiveJobs />
          </div>
        );
      case "messages":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <MessagesList />
          </div>
        );
      case "all-jobs":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <workerjob /> {/* Use the WorkerJob component here */}
          </div>
        );
      case "weekly-subscription":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="text-center py-8">
              <h4 className="text-lg font-medium text-sky-900 mb-4">Manage Your Subscription</h4>
              <p className="text-gray-600 mb-6">
                Your weekly subscription gives you access to premium job listings and priority application status.
              </p>
              <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-green-600 font-medium mb-2">Status: Active</p>
                <p className="text-gray-600 mb-4">Next payment: May 24, 2025</p>
                <button className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded-lg transition-colors">
                  Manage Payment Methods
                </button>
              </div>
            </div>
          </div>
        );
      case "my-profile":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-medium text-gray-800">Kelvin</h4>
                <p className="text-gray-500 mb-4">Worker ID: W12345</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">kazibase@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+254 123 456 789</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">Nairobi, Kenya</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">April 15, 2025</p>
                  </div>
                </div>
                
                <button className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Account Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive emails about new job opportunities</p>
                    </div>
                    <div className="h-6 w-11 flex items-center rounded-full p-1 cursor-pointer bg-sky-500">
                      <div className="bg-white h-4 w-4 rounded-full shadow-md transform translate-x-5"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium">SMS Alerts</p>
                      <p className="text-sm text-gray-500">Get SMS notifications for job updates</p>
                    </div>
                    <div className="h-6 w-11 flex items-center rounded-full p-1 cursor-pointer bg-gray-300">
                      <div className="bg-white h-4 w-4 rounded-full shadow-md"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium">Language Preference</p>
                      <p className="text-sm text-gray-500">Choose your preferred language</p>
                    </div>
                    <select className="bg-gray-50 border border-gray-300 text-gray-700 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <option>English</option>
                      <option>Swahili</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-gray-500">Last updated 3 months ago</p>
                    </div>
                    <button className="text-sky-600 hover:text-sky-800 font-medium">
                      Change
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Privacy Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-gray-500">Allow employers to view your profile</p>
                    </div>
                    <div className="h-6 w-11 flex items-center rounded-full p-1 cursor-pointer bg-sky-500">
                      <div className="bg-white h-4 w-4 rounded-full shadow-md transform translate-x-5"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium">Show Contact Info</p>
                      <p className="text-sm text-gray-500">Display your contact information to employers</p>
                    </div>
                    <div className="h-6 w-11 flex items-center rounded-full p-1 cursor-pointer bg-sky-500">
                      <div className="bg-white h-4 w-4 rounded-full shadow-md transform translate-x-5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <div className="h-6 w-11 flex items-center rounded-full p-1 cursor-pointer bg-gray-300">
                  <div className="bg-white h-4 w-4 rounded-full shadow-md"></div>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded transition-colors">
                  Save Settings
                </button>
                <button className="ml-4 text-gray-600 hover:text-gray-800 py-2 px-6 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a section from the menu</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
        {/* Logo area */}
        <div className="p-5 border-b border-gray-200">
          <Link href="/portal/dashboard">
            <div className="flex flex-col cursor-pointer">
              <h1 className="text-2xl font-bold tracking-wide">
                <span className="text-sky-900">KAZI</span>
                <span className="text-[#F7801E]">BASE</span>
              </h1>
              <p className="text-xs text-sky-700 font-medium tracking-tight">
                Connecting Skilled Labor in Kenya
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 
                    ${activeSection === item.id 
                      ? "bg-sky-100 text-sky-900 border-l-4 border-orange-500" 
                      : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <span className="inline-flex">{renderIcon(item.icon)}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Sign Out Button for Desktop */}
          <div className="pt-8 px-4">
            <button
              onClick={() => signOut({ callbackUrl: "/portal" })}
              className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors group"
            >
              <svg 
                className="w-5 h-5 mr-2 group-hover:animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile sidebar (off-canvas) */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        aria-hidden="true"
      >
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          onClick={closeSidebar}
        ></div>

        {/* Sidebar panel */}
        <div className="fixed inset-y-0 left-0 flex max-w-xs w-full bg-white shadow-xl">
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            {/* Header with Logo and Close Button */}
            <div className="px-4 mb-6 flex justify-between items-center">
              <Link href="/portal/dashboard">
                <div className="flex flex-col cursor-pointer">
                  <h1 className="text-2xl font-bold tracking-wide">
                    <span className="text-sky-900">KAZI</span>
                    <span className="text-[#F7801E]">BASE</span>
                  </h1>
                  <p className="text-xs text-sky-700 font-medium tracking-tight">
                    Connecting Skilled Labor in Kenya
                  </p>
                </div>
              </Link>
              
              {/* Close button moved to right */}
              <button
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
                onClick={closeSidebar}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigation(item)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 
                        ${activeSection === item.id 
                          ? "bg-sky-100 text-sky-900 border-l-4 border-orange-500" 
                          : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <span className="inline-flex">{renderIcon(item.icon)}</span>
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Sign Out Button for Mobile */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    closeSidebar();
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header 
          className={`bg-white py-3 border-b border-gray-200 transition-all duration-300 ${
            scrolled ? "shadow-md" : ""
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Mobile: Logo and hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-4 text-sky-900 focus:outline-none"
                aria-label="Open sidebar"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/portal/dashboard">
                <div className="flex flex-col cursor-pointer">
                  <h1 className="text-2xl font-bold tracking-wide">
                    <span className="text-sky-900">KAZI</span>
                    <span className="text-[#F7801E]">BASE</span>
                  </h1>
                  <p className="text-xs text-sky-700 font-medium tracking-tight hidden sm:block">
                    Connecting Skilled Labor in Kenya
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop: Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className={`relative flex items-center py-2 px-1 text-base font-medium transition-colors duration-200 group
                    ${activeSection === item.id ? "text-[#F7801E]" : "text-sky-900 hover:text-sky-700"}`}
                >
                  <span className="mr-2">{renderIcon(item.icon)}</span>
                  {item.name}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F7801E] transform origin-left"></span>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F7801E] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Mobile: Just show active section name */}
            <div className="lg:hidden">
              <span className="text-sky-900 font-medium">
                {menuItems.find(item => item.id === activeSection)?.name}
              </span>
            </div>

            {/* Desktop and Mobile: Right side user actions */}
            <div className="flex items-center">
              {/* Sign out button - only visible on desktop */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden lg:flex items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[90vh]">
            {/* Welcome header */}
            <div className="text-center mb-8">
              <h1 className="text-xl font-semibold mb-3 w-fit mx-auto text-sky-900 border-b border-orange-500 px-1">
                Hello Worker 👋
              </h1>
              <h2 className="text-3xl font-semibold mb-7 w-fit mx-auto text-sky-900 border-b border-orange-500 px-1">
                WORKER DASHBOARD
              </h2>
            </div>

            {/* Disclaimer notice */}
            <div className="mb-10 p-4 sm:p-5 md:p-6 lg:p-8 bg-yellow-50 border border-yellow-200 rounded-lg max-w-4xl mx-auto shadow-sm">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-yellow-700 leading-relaxed text-center font-semibold mb-2">
                ⚠️ Disclaimer
              </p>
              <p className="text-xs sm:text-sm md:text-base text-yellow-700 leading-relaxed text-justify">
                Thank you for creating your account. Apply for the jobs that
                you&apos;re capable of doing. To make Kazibase a good atmosphere
                for you to thrive, you need to act professionally on every job
                you take and in how you present yourself to clients. Also,
                remember if you&apos;re involved in any misconduct, theft, or
                any inappropriate behavior towards clients, you will bear all
                the responsibility. Please remember to check the notice board
                regularly to see new planned updates.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-yellow-700 leading-relaxed text-justify mt-4 font-semibold">
                📌 It is mandatory to carry your original ID when visiting
                clients&apos; places.
              </p>
            </div>

            {/* Section title */}
            <h3 className="text-xl font-semibold mb-6 text-sky-900 border-l-4 border-orange-500 pl-3">
             {menuItems.find(item => item.id === activeSection)?.name}
            </h3>

            {/* Main content rendering */}
            <div className="mt-4">
              {renderContent()}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-600">
                  &copy; {new Date().getFullYear()} Kazibase. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-sm text-gray-600 hover:text-sky-700">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-gray-600 hover:text-sky-700">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-600 hover:text-sky-700">
                  Help Center
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
