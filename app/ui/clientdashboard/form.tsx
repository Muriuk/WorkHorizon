"use client"

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import PostJob from '@/app/ui/postjob/form'

interface ClientInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: {
    county: string;
    subcounty: string;
    area: string;
  };
  joinedDate: string;
  jobPosts?: JobPost[];
  createdAt?: string; // Added for proper typing
}

interface JobPost {
  id: number;
  clientName: string;
  title: string;
  description: string;
  county: string;
  numberOfWorkers: number;
  gender: string;
  duration: string;
  budget: string;
  phone: string;
  whatsapp: string;
  createdAt: string;
  status?: string;
  applications?: number;
}

interface MenuItem {
  name: string;
  id: string;
  icon: string;
}

interface ApiResponse {
  success: boolean;
  user: ClientInfo;
  jobPosts?: JobPost[];
  message?: string;
}

const menuItems: MenuItem[] = [
  { name: "Client Dashboard", id: "dashboard", icon: "dashboard" }, 
  { name: "Post New Job", id: "post-job", icon: "briefcase" },
  { name: "My Jobs", id: "my-jobs", icon: "grid" },
  { name: "My Profile", id: "my-profile", icon: "user" },
  { name: "Settings", id: "settings", icon: "settings" },
];

export default function ClientDashboard(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [client, setClient] = useState<ClientInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to determine job status with proper typing
  const determineJobStatus = useCallback((post: JobPost): string => {
    const now = new Date();
    const createdAt = new Date(post.createdAt);
    const daysOld = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysOld > 30) return 'Completed';
    if (daysOld > 7) return 'In Progress';
    return 'Active';
  }, []);

  // Fetch client data including job posts
  useEffect(() => {
    let isMounted = true;

    async function fetchClientProfile() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/client/me');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ApiResponse = await res.json();
        
        if (!isMounted) return;

        if (data.success && data.user) {
          const joinedDate = data.user.createdAt 
            ? new Date(data.user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
              })
            : new Date().toLocaleDateString('en-US', {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
              });

          setClient({
            ...data.user,
            joinedDate,
            jobPosts: data.jobPosts?.map((post) => ({
              ...post,
              status: determineJobStatus(post),
              applications: post.applications || 0
            })) || []
          });
        } else {
          throw new Error(data.message || 'Failed to fetch client data');
        }
      } catch (err) {
        if (isMounted) {
          const caughtError = err as Error;
          console.error('Error fetching client profile:', caughtError);
          setError(caughtError.message);
          
          if (process.env.NODE_ENV === 'development') {
            setClient({
              id: 1,
              name: "John Kamau",
              email: "john@example.com",
              phone: "+254 712 345 678",
              location: {
                county: "Nairobi",
                subcounty: "Westlands",
                area: "Parklands"
              },
              joinedDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
              }),
              jobPosts: []
            });
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchClientProfile();

    return () => {
      isMounted = false;
    };
  }, [determineJobStatus]);

  const closeSidebar = useCallback((): void => {
    setSidebarOpen(false);
  }, []);

  const handleNavigation = useCallback((item: MenuItem): void => {
    setActiveSection(item.id);
    closeSidebar();
  }, [closeSidebar]);

  // Rest of your component...

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
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      );
    }

    switch (activeSection) {
      case "dashboard":
        return (
          <>
         {/* Dynamic Welcome header with elegant styling and smooth transitions */}
<div className="text-center mb-8">
  <h2 className="text-xl md:text-3xl font-semibold mb-4 w-fit mx-auto text-sky-800 dark:text-sky-100 px-4 py-2 md:px-6 md:py-3 rounded-xl bg-gradient-to-r from-sky-50 to-orange-50 dark:from-sky-900/90 dark:to-gray-800/90 shadow-md border border-sky-100 dark:border-sky-800/50 transition-all duration-300">
    {(() => {
      const hour = new Date().getHours();
      let greeting;
      
      if (hour < 12) {
        greeting = 'Good morning';
      } else if (hour < 18) {
        greeting = 'Good afternoon';
      } else {
        greeting = 'Good evening';
      }
      
      return (
        <span className="inline-flex items-center flex-wrap justify-center gap-x-2">
          <span className="whitespace-nowrap font-medium">{greeting}</span>
          <span className="whitespace-nowrap font-bold text-sky-700 dark:text-sky-200">
            {client?.name || ''}
            <span className="ml-2 text-orange-400 dark:text-orange-300 animate-pulse">👋</span>
          </span>
        </span>
      );
    })()}
  </h2>
</div>

{/* Premium Stats Cards with glass morphism effect */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
  {/* Active Jobs */}
  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-gray-200/80 p-6 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-white opacity-80 -z-10"></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-2">Active Jobs</p>
        <h4 className="text-3xl font-bold bg-gradient-to-r from-sky-700 to-sky-900 bg-clip-text text-transparent">
          {client?.jobPosts?.filter(job => job.status === "Active").length ?? 0}
        </h4>
      </div>
      <div className="bg-white p-3 rounded-full shadow-sm transform group-hover:scale-110 transition-transform duration-300 border border-gray-100">
        <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  </div>
  
  {/* Applications */}
  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-gray-200/80 p-6 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-white opacity-80 -z-10"></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-2">Applications</p>
        <h4 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">0</h4>
      </div>
      <div className="bg-white p-3 rounded-full shadow-sm transform group-hover:scale-110 transition-transform duration-300 border border-gray-100">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  </div>
  
  {/* Completed Jobs */}
  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-gray-200/80 p-6 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-white opacity-80 -z-10"></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-2">Completed Jobs</p>
        <h4 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
          {client?.jobPosts?.filter(job => job.status === "Completed").length ?? 0}
        </h4>
      </div>
      <div className="bg-white p-3 rounded-full shadow-sm transform group-hover:scale-110 transition-transform duration-300 border border-gray-100">
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  </div>
</div>

{/* Recent Activity - Premium Edition */}
<div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden transition-all duration-300 hover:shadow-xl relative">
  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/80 -z-10"></div>
  <div className="p-6 pb-4">
    <div className="flex items-center justify-between mb-5">
      <h4 className="text-xl font-semibold text-sky-900 tracking-tight">Recent Activity</h4>
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      </span>
    </div>
    
    <div className="space-y-4">
      {client?.jobPosts?.length ? (
        <>
          {client.jobPosts
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
            .map((job) => (
              <div 
                key={job.id} 
                className="relative border-l-2 border-sky-400 pl-4 py-2 group transition-all duration-200 hover:border-sky-500 hover:pl-5 bg-white/50 rounded-lg"
              >
                <div className="absolute -left-1.5 top-3 w-3 h-3 bg-sky-400 rounded-full group-hover:bg-sky-500 transition-colors duration-200"></div>
                <p className="font-medium text-sky-800 group-hover:text-sky-900 transition-colors duration-200">Job posted successfully</p>
                <p className="text-sm text-gray-600 mt-1">{job.title} - {job.county}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(job.createdAt).toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            ))}
          {(client.jobPosts?.length ?? 0) > 5 && (
            <div className="px-6 py-3 bg-gray-50/70 border-t border-gray-200/50 text-right">
              <button className="text-xs font-medium text-sky-600 hover:text-sky-700 transition-colors duration-200">
                View all activity →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-gray-400 bg-white/50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm">No recent job activity found</p>
        </div>
      )}
    </div>
  </div>
</div>

{/* Important notice */}
<div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-200/80 rounded-lg max-w-4xl mx-auto shadow-sm backdrop-blur-sm">
  <div className="text-center mb-4">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 shadow-sm mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    </span>
    <p className="text-lg text-amber-800 leading-relaxed font-semibold mt-2">
     Important Information
    </p>
  </div>
  <div className="space-y-3 text-sm text-amber-700/90">
    <p className="text-justify">
      Thank you for using Kazibase! As a client, you have access to Kenyas largest network of skilled workers.
      For the best experience, please provide detailed job descriptions when posting new jobs.
    </p>
    <p className="text-justify">
      Always verify worker identification before allowing them to start work at your premises.
      Remember to rate workers after job completion to help maintain service quality on our platform.
    </p>
    <div className="flex items-start mt-4 bg-white/50 p-3 rounded-lg border border-amber-200/50">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="font-medium text-amber-800">
        📌 All workers are required to carry their original ID when visiting your premises.
      </p>
    </div>
  </div>
</div>
          </>
          );
     case "post-job":
  return (
    <div className="bg-white rounded-none sm:rounded-lg shadow-sm border-0 sm:border border-gray-100 p-2 sm:p-4 md:p-6 w-full h-full">
      <PostJob />
    </div>
  );
     case "my-jobs":
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header with actions */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h4 className="text-xl font-semibold text-gray-900">My Job Posts</h4>
          <div className="flex flex-col xs:flex-row gap-3">
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all">
              <option>All Jobs</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
            <Link 
              href="/postjob" 
              className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white py-2 px-4 rounded-lg text-sm font-medium text-center shadow-sm hover:shadow-md transition-all"
            >
              + New Job
            </Link>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 md:p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        ) : client?.jobPosts?.length ? (
          <div className="overflow-hidden">
            {/* Mobile Cards View */}
            <div className="md:hidden space-y-4">
              {client.jobPosts.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{job.county}</p>
                    </div>
                    <span className={`px-2.5 py-1 text-xs leading-4 font-medium rounded-full ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' :
                      job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      job.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.description}</p>
                  
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Posted: {new Date(job.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-medium text-gray-700">
                        {job.applications || 0} {job.applications === 1 ? 'app' : 'apps'}
                      </span>
                      <Link 
                        href={`/client/jobs/${job.id}`} 
                        className="text-xs font-medium text-sky-600 hover:text-sky-800"
                      >
                        View
                      </Link>
                      {job.status === 'Active' && (
                        <button className="text-xs font-medium text-red-600 hover:text-red-800">
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Posted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {client.jobPosts.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{job.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.county}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 text-xs leading-4 font-medium rounded-full ${
                          job.status === 'Active' ? 'bg-green-100 text-green-800' :
                          job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          job.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                        {job.applications || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                        <Link 
                          href={`/client/jobs/${job.id}`} 
                          className="text-sky-600 hover:text-sky-800 font-medium"
                        >
                          View
                        </Link>
                        {job.status === 'Active' && (
                          <button className="text-red-600 hover:text-red-800 font-medium">
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs posted yet</h3>
            <p className="mt-1 text-gray-500">Get started by posting your first job opportunity</p>
            <div className="mt-6">
              <Link 
                href="/postjob" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600"
              >
                Post Your First Job
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
     case "my-profile":
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Avatar - Now with a premium ring effect */}
        <div className="relative w-36 h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center ring-4 ring-white ring-offset-2 shadow-md">
          <svg className="w-20 h-20 text-gray-400/80" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          {/* Optional: Badge for verified users */}
          
            <div className="absolute bottom-0 right-0 bg-sky-500 text-white p-1 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          
        </div>

        {/* Profile Details - Enhanced typography and spacing */}
        <div className="flex-1 space-y-6">
          <div>
            <h4 className="text-2xl font-semibold text-gray-900 tracking-tight">{client?.name || "Loading..."}</h4>
            <p className="text-gray-500 font-mono text-sm">CLIENT ID: C{client?.id || "00000"}</p>
          </div>
          
          {/* Information Grid - Now with subtle dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Email", value: client?.email || "loading@example.com" },
              { label: "Phone", value: client?.phone || "+254 000 000 000" },
              { label: "Location", value: `${client?.location?.county || "Loading"}${client?.location?.subcounty ? `, ${client?.location.subcounty}` : ""}` },
              { label: "Member Since", value: client?.joinedDate || "Loading..." }
            ].map((item, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0 md:last:border-b md:even:border-l md:even:pl-6">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.label}</p>
                <p className="font-medium text-gray-800 mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Edit Button - More premium appearance */}
          <button className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white py-3 px-6 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2 w-fit">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
      case "settings":
       return (
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-3xl mx-auto backdrop-blur-sm bg-opacity-90">
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-2 border-b border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900">Job Posting Preferences</h3>
        <p className="text-gray-400 mt-1">Customize your manual job posting experience</p>
      </div>

      {/* Notification Settings */}
      <div className="space-y-6">
        <h4 className="text-lg font-medium text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
          Notification Settings
        </h4>

        <div className="space-y-4">
          {[
            { 
              title: "New Applications", 
              desc: "Instant alerts when candidates apply",
              active: true 
            },
            { 
              title: "Candidate Messages", 
              desc: "Notify when applicants message you",
              active: true 
            },
            { 
              title: "Job Expiration", 
              desc: "Remind before jobs automatically close",
              active: false 
            }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all duration-200">
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
              </div>
              <div className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ${item.active ? 'bg-blue-500' : 'bg-gray-200'}`}>
                <span className={`inline-block w-4 h-4 transform transition-transform duration-300 rounded-full bg-white shadow-md ${item.active ? 'translate-x-6' : 'translate-x-1'}`}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Posting Preferences */}
      <div className="space-y-6">
        <h4 className="text-lg font-medium text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
          </svg>
          Posting Preferences
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Job Duration</label>
            <select className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 px-3 py-2 transition-all duration-200">
              {["30 days", "15 days", "7 days", "Until closed"].map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Limit</label>
            <input 
              type="number" 
              className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 px-3 py-2 transition-all duration-200" 
              placeholder="No limit"
            />
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
          </svg>
          Advanced Settings
        </h4>

        <div className="p-4 bg-gray-50 rounded-xl transition-all duration-200 hover:bg-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Require Screening Questions</p>
              <p className="text-sm text-gray-400 mt-1">Add mandatory questions for applicants</p>
            </div>
            <div className="relative inline-flex items-center h-6 w-11 rounded-full bg-gray-200 transition-colors duration-300">
              <span className="inline-block w-4 h-4 transform translate-x-1 rounded-full bg-white shadow-md transition-transform duration-300"/>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4">
        <button className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 rounded-lg transition-all duration-200 hover:bg-gray-100">
          Cancel
        </button>
        <button className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
          Save Preferences
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
          <Link href="/clientdashboard">
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
              <Link href="/clientdashboard">
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
              <Link href="/clientdashboard">
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
    
            </div>
          </div>
        </footer>
        {error && (
  <div className="bg-red-100 text-red-700 p-3 rounded mt-4">
    ⚠️ {error}
  </div>
)}
      </div>
    </div>
  );
}
