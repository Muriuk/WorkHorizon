'use client'

import { useEffect, useState } from "react";
import { signOut } from 'next-auth/react'
import JobsPage from '@/app/ui/jobspage/form'

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

interface IconProps {
  type: IconType // Ensure this accepts only valid IconTypes
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
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
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
  }

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[type]}
    </svg>
  )
}

export default function DashboardBody() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
 
  const sidebarItems: Array<{ key: string; label: string; icon: IconType }> = [
    { key: 'dashboard', label: 'Dashboard', icon: 'home' },
    { key: 'jobs', label: 'Find Jobs', icon: 'search' },
    { key: 'applications', label: 'My Applications', icon: 'document' },
    { key: 'interviews', label: 'Interviews', icon: 'calendar' },
    { key: 'messages', label: 'Messages', icon: 'chat' },
    { key: 'profile', label: 'Profile', icon: 'user' },
    { key: 'settings', label: 'Settings', icon: 'cog' },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static lg:translate-x-0 transform h-full z-50 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full w-64 bg-white shadow-2xl overflow-hidden">
          {/* Sidebar Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <h2 className="text-white font-semibold text-lg">WorkerHub</h2>
                  <p className="text-blue-100 text-xs">By Kazibase</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:bg-blue-500 p-2 rounded-lg transition-colors"
              >
                <IconComponent type="close" />
              </button>
            </div>
          </div>

         {/* User Profile Section */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">JD</span>
              </div>
              <div className="ml-3">
                <p className="text-slate-900 font-medium">User Name</p>
                <p className="text-slate-500 text-sm">Category Name</p>
              </div>
            </div>
          </div>


          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 hover:bg-slate-100 group
                    ${activeSection === item.key ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' : 'text-slate-600'}`}
              >
                <IconComponent type={item.icon} className={`w-5 h-5 mr-3 ${activeSection === item.key ? 'text-blue-700' : 'text-slate-500'}`} />
                <span className={`font-medium ${activeSection === item.key ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {item.key === 'messages' && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
                )}
              </button>
            ))}
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
            >
              <IconComponent type="logout" className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600 hover:text-slate-900 mr-4"
              >
                <IconComponent type="menu" className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-slate-900 capitalize">
                {activeSection === 'dashboard' ? 'Dashboard Overview' : activeSection}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2">
                <IconComponent type="search" className="w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  className="ml-2 bg-transparent text-sm text-slate-700 placeholder-slate-500 outline-none"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50">
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-2">Welcome back, Worker!</h2>
                  <p className="text-blue-100 mb-6">Ready to find your next opportunity?</p>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Start Job Search
                  </button>
                </div>
                <div className="absolute right-0 top-0 w-64 h-64 transform translate-x-16 -translate-y-16 opacity-10">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path fill="currentColor" d="M47.1,-57.9C60.4,-45.9,69.7,-30.1,76.9,-12.1C84.1,5.9,89.2,26.1,82.4,42.9C75.6,59.7,57,73.1,37.9,79.4C18.8,85.7,-0.8,84.9,-21.8,79.9C-42.8,74.9,-65.2,65.7,-77.8,49.8C-90.4,33.9,-93.2,11.3,-88.3,-9.7C-83.4,-30.7,-70.8,-49.9,-53.9,-60.8C-37,-71.7,-15.8,-74.3,2.4,-77.1C20.6,-79.9,33.8,-69.9,47.1,-57.9Z" />
                  </svg>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent type="document" className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">7</p>
                      <p className="text-sm text-slate-600">Applications</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-green-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                      </svg>
                      +2 this week
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <IconComponent type="calendar" className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">3</p>
                      <p className="text-sm text-slate-600">Interviews</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-orange-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                      1 pending
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <IconComponent type="chat" className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">12</p>
                      <p className="text-sm text-slate-600">Messages</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-red-600">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      3 unread
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">8.5</p>
                      <p className="text-sm text-slate-600">Profile Score</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent type="document" className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-slate-900 font-medium">Applied to Software Engineer position</p>
                      <p className="text-slate-600 text-sm">2 hours ago at Tech Corp</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Applied</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <IconComponent type="calendar" className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-slate-900 font-medium">Interview scheduled for Product Manager role</p>
                      <p className="text-slate-600 text-sm">Tomorrow at 2:00 PM with StartupX</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Interview</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <IconComponent type="chat" className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-slate-900 font-medium">Message from HR at InnovateCorp</p>
                      <p className="text-slate-600 text-sm">3 days ago - Thank you for your application</p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">Message</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'jobs' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">Available Jobs</h2>
                <p className="text-slate-600 mt-1">Browse and apply to open positions</p>
              </div>
              <div className="p-6">
                <JobsPage />
              </div>
            </div>
          )}

          {activeSection !== 'dashboard' && activeSection !== 'jobs' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent type={(sidebarItems.find(item => item.key === activeSection)?.icon as IconType) || 'home'} className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>
              <p className="text-slate-600">This section is coming soon. Please check back later!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
