'use client'

import { useState } from "react";
import { signOut } from 'next-auth/react'

// Define IconType properly
type IconType =
  | 'home'
  | 'search'
  | 'document'
  | 'calendar'
  | 'chat'
  | 'user'
  | 'settings'
  | 'cog'
  | 'close'
  | 'menu'
  | 'logout'
  | 'wallet'
  | 'notification'
  | 'claims'
  | 'shield'
  | 'star'
  | 'trophy'
  | 'arrow-right'
  | 'bell'
  | 'dollar'

interface IconProps {
  type: IconType
  className?: string
}

const IconComponent = ({ type, className = 'w-5 h-5' }: IconProps) => {
  const icons: Record<IconType, React.ReactNode> = {
    home: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-12 0h3m0 0v-8a1 1 0 011-1h3v10m9-10h3v8a1 1 0 01-1 1h-3"
      />
    ),
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
    document: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    calendar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    chat: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
      />
    ),
    user: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    ),
    cog: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
    ),
    close: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    ),
    menu: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    ),
    logout: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    ),
    settings: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    wallet: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </>
    ),
    notification: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    ),
    claims: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-4 4l2 2 4-4"
      />
    ),
    shield: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    star: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    ),
    trophy: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    'arrow-right': (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    ),
    bell: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    ),
    dollar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    )
  }

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[type]}
    </svg>
  )
}

export default function KazibaseDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [notifications, setNotifications] = useState(5)
  const [unreadClaims, setUnreadClaims] = useState(3)
  const [unreadMessages, setUnreadMessages] = useState(8)
 
  const sidebarItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'home' as IconType },
    { key: 'jobs', label: 'All Jobs', icon: 'search' as IconType },
    { key: 'profile', label: 'My Profile', icon: 'user' as IconType },
    { key: 'payments', label: 'Weekly Payments', icon: 'wallet' as IconType },
    { key: 'claims', label: 'Claims', icon: 'claims' as IconType, badge: unreadClaims },
    { key: 'messages', label: 'Admin Messages', icon: 'chat' as IconType, badge: unreadMessages },
    { key: 'settings', label: 'Settings', icon: 'cog' as IconType },
  ]

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static lg:translate-x-0 transform h-full z-50 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full w-72 bg-white shadow-xl border-r border-gray-200">
          {/* Sidebar Header */}
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-white font-bold text-xl">Kazibase</h2>
                  <p className="text-emerald-100 text-sm">Manual Work Platform</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:bg-emerald-500 p-2 rounded-lg transition-colors"
              >
                <IconComponent type="close" />
              </button>
            </div>
          </div>

         {/* User Profile Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">JM</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-gray-900 font-semibold text-lg">John Mwangi</p>
                <p className="text-emerald-600 text-sm font-medium">Construction Worker</p>
                <p className="text-gray-500 text-xs mt-1">Verified Account</p>
              </div>
            </div>
          </div>
          

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveSection(item.key);
                  if (item.key === 'claims' && item.badge) setUnreadClaims(0);
                  if (item.key === 'messages' && item.badge) setUnreadMessages(0);
                }}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200
                    ${activeSection === item.key 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
              >
                <IconComponent 
                  type={item.icon} 
                  className={`w-6 h-6 mr-4 ${activeSection === item.key ? 'text-emerald-600' : 'text-gray-500'}`} 
                />
                <span className={`font-medium ${activeSection === item.key ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

        {/* Sign Out Button */}
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
            >
              <IconComponent type="logout" className="w-6 h-6 mr-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900 mr-4"
              >
                <IconComponent type="menu" className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {activeSection === 'dashboard' ? 'Dashboard Overview' : activeSection}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 min-w-64">
                <IconComponent type="search" className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search jobs, payments..."
                  className="ml-2 bg-transparent text-sm text-gray-700 placeholder-gray-500 outline-none flex-1"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                <IconComponent type="notification" className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {notifications}
                  </span>
                )}
              </button>
              
              {/* Profile Quick Access */}
              <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-2">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">JM</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">John Mwangi</p>
                  <p className="text-xs text-gray-500">Worker ID: KZ001</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-3">Welcome back, John!</h2>
                  <p className="text-emerald-100 mb-6 text-lg">Ready to take on today's challenges?</p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
                      <IconComponent type="search" className="w-5 h-5 mr-2" />
                      Browse Jobs
                    </button>
                    <button className="bg-emerald-800 bg-opacity-30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-40 transition-colors flex items-center">
                      <IconComponent type="wallet" className="w-5 h-5 mr-2" />
                      Check Payments
                    </button>
                  </div>
                </div>
                <div className="absolute right-0 top-0 w-80 h-80 transform translate-x-20 -translate-y-20 opacity-10">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path fill="currentColor" d="M47.1,-57.9C60.4,-45.9,69.7,-30.1,76.9,-12.1C84.1,5.9,89.2,26.1,82.4,42.9C75.6,59.7,57,73.1,37.9,79.4C18.8,85.7,-0.8,84.9,-21.8,79.9C-42.8,74.9,-65.2,65.7,-77.8,49.8C-90.4,33.9,-93.2,11.3,-88.3,-9.7C-83.4,-30.7,-70.8,-49.9,-53.9,-60.8C-37,-71.7,-15.8,-74.3,2.4,-77.1C20.6,-79.9,33.8,-69.9,47.1,-57.9Z" />
                  </svg>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                      <IconComponent type="document" className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900">12</p>
                      <p className="text-sm text-gray-600">Applications</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                    +4 this week
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                      <IconComponent type="dollar" className="w-7 h-7 text-green-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900">KSh 8,500</p>
                      <p className="text-sm text-gray-600">This Week</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                    +15% from last week
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                      <IconComponent type="claims" className="w-7 h-7 text-purple-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900">3</p>
                      <p className="text-sm text-gray-600">Active Claims</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-orange-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    2 pending review
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                      <IconComponent type="star" className="w-7 h-7 text-orange-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900">4.8</p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                    Excellence performance
                  </div>
                </div>
              </div>

              {/* Weekly Earnings Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Earnings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <IconComponent type="dollar" className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-600">This Week</p>
                          <p className="text-xl font-bold text-gray-900">KSh 8,500</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">Pending</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <IconComponent type="dollar" className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-600">Last Week</p>
                          <p className="text-xl font-bold text-gray-900">KSh 7,200</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          Paid
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <IconComponent type="trophy" className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-semibold text-gray-900">Top Performer</p>
                        <p className="text-xs text-gray-600">Highest earnings this month</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">New</span>
                    </div>
                    
                    <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <IconComponent type="shield" className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-semibold text-gray-900">Safety Expert</p>
                        <p className="text-xs text-gray-600">30 days without incidents</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent type="document" className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-gray-900 font-medium">Applied for Construction Assistant</p>
                      <p className="text-gray-600 text-sm">Site: Westlands Mall, Nairobi</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Under Review</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <IconComponent type="dollar" className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-gray-900 font-medium">Payment received</p>
                      <p className="text-gray-600 text-sm">KSh 7,200 for week ending 10/05</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Completed</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <IconComponent type="claims" className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-gray-900 font-medium">Claim submitted</p>
                      <p className="text-gray-600 text-sm">Medical reimbursement for injury</p>
                      <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">Processing</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setActiveSection('jobs')}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <IconComponent type="search" className="w-8 h-8 mb-2" />
                    <span className="text-sm font-semibold">Find Jobs</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('payments')}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <IconComponent type="wallet" className="w-8 h-8 mb-2" />
                    <span className="text-sm font-semibold">Payments</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('claims')}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <IconComponent type="claims" className="w-8 h-8 mb-2" />
                    <span className="text-sm font-semibold">Claims</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('profile')}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <IconComponent type="user" className="w-8 h-8 mb-2" />
                    <span className="text-sm font-semibold">Profile</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Jobs Section */}
          {activeSection === 'jobs' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Available Jobs</h2>
                  <div className="flex flex-wrap gap-3">
                    <select className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm">
                      <option>All Categories</option>
                      <option>Construction</option>
                      <option>Cleaning</option>
                      <option>Gardening</option>
                      <option>Delivery</option>
                    </select>
                    <select className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm">
                      <option>All Locations</option>
                      <option>Nairobi</option>
                      <option>Mombasa</option>
                      <option>Kisumu</option>
                      <option>Nakuru</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3,3V5H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V5H21V3H3M7,5H17V19H7V5M8,7V17H10V7H8M12,7V17H14V7H12M16,7V17H18V7H16Z"/>
                        </svg>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Urgent</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Construction Worker</h3>
                    <p className="text-gray-600 text-sm mb-3">Westlands Mall, Nairobi</p>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <IconComponent type="dollar" className="w-4 h-4 mr-1" />
                        KSh 1,200/day
                      </span>
                      <span className="flex items-center">
                        <IconComponent type="calendar" className="w-4 h-4 mr-1" />
                        5 days
                      </span>
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21,17H3V16L2,15V7L3,6H21L22,7V15L21,16M3,8V12H8L7.5,13.5L12,9L16.5,13.5L16,12H21V8H3M18,18V20A2,2 0 0,1 16,22H8A2,2 0 0,1 6,20V18H18Z"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Agent</h3>
                    <p className="text-gray-600 text-sm mb-3">CBD, Nairobi</p>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <IconComponent type="dollar" className="w-4 h-4 mr-1" />
                        KSh 800/day
                      </span>
                      <span className="flex items-center">
                        <IconComponent type="calendar" className="w-4 h-4 mr-1" />
                        3 days
                      </span>
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payments Section */}
          {activeSection === 'payments' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Payments</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent type="dollar" className="w-8 h-8 text-emerald-600" />
                      <span className="text-2xl font-bold text-gray-900">KSh 8,500</span>
                    </div>
                    <p className="text-sm text-gray-600">This Week (May 12-18)</p>
                    <p className="text-xs text-emerald-600 font-semibold mt-2">Payment pending</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent type="dollar" className="w-8 h-8 text-blue-600" />
                      <span className="text-2xl font-bold text-gray-900">KSh 7,200</span>
                    </div>
                    <p className="text-sm text-gray-600">Last Week (May 5-11)</p>
                    <p className="text-xs text-green-600 font-semibold mt-2">Paid on May 13</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent type="dollar" className="w-8 h-8 text-orange-600" />
                      <span className="text-2xl font-bold text-gray-900">KSh 32,500</span>
                    </div>
                    <p className="text-sm text-gray-600">This Month Total</p>
                    <p className="text-xs text-blue-600 font-semibold mt-2">Target: KSh 40,000</p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Week</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-4 text-gray-900">May 12-18, 2025</td>
                        <td className="py-4 px-4 text-gray-900 font-semibold">KSh 8,500</td>
                        <td className="py-4 px-4">
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">Pending</span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">-</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-4 text-gray-900">May 5-11, 2025</td>
                        <td className="py-4 px-4 text-gray-900 font-semibold">KSh 7,200</td>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Paid</span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">May 13, 2025</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-4 text-gray-900">Apr 28-May 4, 2025</td>
                        <td className="py-4 px-4 text-gray-900 font-semibold">KSh 6,800</td>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Paid</span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">May 6, 2025</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Claims Section */}
          {activeSection === 'claims' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Claims Management</h2>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Claim
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent type="claims" className="w-8 h-8 text-orange-600" />
                      <span className="text-2xl font-bold text-gray-900">3</span>
                    </div>
                    <p className="text-sm text-gray-600">Active Claims</p>
                    <p className="text-xs text-orange-600 font-semibold mt-2">Under review</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent type="shield" className="w-8 h-8 text-green-600" />
                      <span className="text-2xl font-bold text-gray-900">12</span>
                    </div>
                    <p className="text-sm text-gray-600">Approved Claims</p>
                    <p className="text-xs text-green-600 font-semibold mt-2">This year</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent type="dollar" className="w-8 h-8 text-blue-600" />
                      <span className="text-2xl font-bold text-gray-900">KSh 45,000</span>
                    </div>
                    <p className="text-sm text-gray-600">Total Claimed</p>
                    <p className="text-xs text-blue-600 font-semibold mt-2">This year</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900">Medical Reimbursement</h3>
                          <p className="text-sm text-gray-600">Injury on construction site</p>
                          <p className="text-xs text-gray-500 mt-1">Submitted: May 10, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">Under Review</span>
                        <p className="text-lg font-bold text-gray-900 mt-2">KSh 15,000</p>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Status:</strong> Your claim is being reviewed by our team. Expected response within 3-5 business days.
                      </p>
                    </div>
                  </div>
                  
                 <div className="text-right">
                        <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">Approved</span>
                        <p className="text-lg font-bold text-gray-900 mt-2">KSh 8,500</p>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Status:</strong> Claim approved and payment has been processed. Amount will be included in next week's payment.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent type="star" className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900">Training Completion Bonus</h3>
                          <p className="text-sm text-gray-600">Safety certification course</p>
                          <p className="text-xs text-gray-500 mt-1">Submitted: May 5, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">Processing</span>
                        <p className="text-lg font-bold text-gray-900 mt-2">KSh 5,000</p>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Status:</strong> Documentation verification in progress. Bonus will be credited upon confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Profile</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 text-center">
                      <div className="relative inline-block">
                        <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                          JM
                        </div>
                        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mt-6">John Mwangi</h3>
                      <p className="text-emerald-600 font-semibold mt-2">Construction Worker</p>
                      <p className="text-gray-600 text-sm mt-1">Verified Account</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">4.8</p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">127</p>
                          <p className="text-sm text-gray-600">Jobs Done</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <p className="text-gray-900 font-medium">John Mwangi Kamau</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Worker ID</label>
                        <p className="text-gray-900 font-medium">KZ001</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <p className="text-gray-900 font-medium">+254 712 345 678</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <p className="text-gray-900 font-medium">john.mwangi@email.com</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                        <p className="text-gray-900 font-medium">Nairobi, Kenya</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Join Date</label>
                        <p className="text-gray-900 font-medium">January 15, 2023</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Skills & Certifications</h4>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg text-sm font-semibold">Construction</span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-semibold">Safety Certified</span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm font-semibold">Team Leadership</span>
                        <span className="bg-orange-100 text-orange-800 px-3 py-2 rounded-lg text-sm font-semibold">First Aid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Work History</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3,3V5H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V5H21V3H3M7,5H17V19H7V5M8,7V17H10V7H8M12,7V17H14V7H12M16,7V17H18V7H16Z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900">Construction Assistant</p>
                        <p className="text-sm text-gray-600">Westlands Mall, Nairobi</p>
                        <p className="text-xs text-gray-500">May 5-11, 2025</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">KSh 7,200</p>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">Completed</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21,17H3V16L2,15V7L3,6H21L22,7V15L21,16M3,8V12H8L7.5,13.5L12,9L16.5,13.5L16,12H21V8H3M18,18V20A2,2 0 0,1 16,22H8A2,2 0 0,1 6,20V18H18Z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900">Delivery Agent</p>
                        <p className="text-sm text-gray-600">CBD Area, Nairobi</p>
                        <p className="text-xs text-gray-500">Apr 28-May 4, 2025</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">KSh 6,800</p>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages Section */}
          {activeSection === 'messages' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Admin Messages</h2>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <IconComponent type="chat" className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-gray-900">New Job Opportunity</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            We have a new construction project opening up in Karen. The project starts next Monday and requires experienced workers.
                          </p>
                          <p className="text-xs text-gray-500 mt-2">Admin Team • May 16, 2025</p>
                        </div>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">New</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <IconComponent type="shield" className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-900">Safety Training Reminder</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Don't forget about the mandatory safety training session scheduled for this Friday at 2 PM.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Safety Department • May 14, 2025</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <IconComponent type="star" className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-900">Performance Recognition</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Congratulations on being recognized as the top performer for April! Keep up the excellent work.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">HR Department • May 1, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Job Notifications</p>
                          <p className="text-sm text-gray-600">Get notified about new job opportunities</p>
                        </div>
                        <button className="w-12 h-6 bg-emerald-600 rounded-full flex items-center px-1">
                          <div className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></div>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Payment Alerts</p>
                          <p className="text-sm text-gray-600">Receive alerts when payments are processed</p>
                        </div>
                        <button className="w-12 h-6 bg-emerald-600 rounded-full flex items-center px-1">
                          <div className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></div>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">SMS Updates</p>
                          <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                        </div>
                        <button className="w-12 h-6 bg-gray-300 rounded-full flex items-center px-1">
                          <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                          Enable
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Change Password</p>
                          <p className="text-sm text-gray-600">Update your account password</p>
                        </div>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Profile Visibility</p>
                          <p className="text-sm text-gray-600">Control who can see your profile</p>
                        </div>
                        <select className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm">
                          <option>Public</option>
                          <option>Private</option>
                          <option>Friends Only</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Data Download</p>
                          <p className="text-sm text-gray-600">Download your personal data</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
            
      
