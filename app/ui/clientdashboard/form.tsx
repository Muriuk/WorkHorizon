"use client"

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

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
          const error = err as Error;
          console.error('Error fetching client profile:', error);
          setError(error.message);
          
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
            {/* Welcome header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-6 w-fit mx-auto text-sky-900 border-b border-orange-500 px-1">
                Welcome {client?.name} 👋
              </h2>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active Jobs</p>
                    <h4 className="text-2xl font-semibold text-sky-900">3</h4>
                  </div>
                  <div className="bg-sky-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Applications</p>
                    <h4 className="text-2xl font-semibold text-sky-900">12</h4>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Completed Jobs</p>
                    <h4 className="text-2xl font-semibold text-sky-900">7</h4>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
              <h4 className="text-lg font-medium text-sky-900 mb-4">Recent Activity</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-medium">New application received</p>
                  <p className="text-sm text-gray-500">Worker: David Mwangi applied for Plumbing job</p>
                  <p className="text-xs text-gray-400">Today at 10:30 AM</p>
                </div>
                <div className="border-l-4 border-sky-500 pl-4 py-2">
                  <p className="font-medium">Job posted successfully</p>
                  <p className="text-sm text-gray-500">House Painting - Parklands area</p>
                  <p className="text-xs text-gray-400">Yesterday at 3:45 PM</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <p className="font-medium">Job completed</p>
                  <p className="text-sm text-gray-500">Electrical Installation by James Odhiambo</p>
                  <p className="text-xs text-gray-400">May 18, 2025</p>
                </div>
              </div>
            </div>

            {/* Important notice */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-yellow-50 border border-yellow-200 rounded-lg max-w-4xl mx-auto shadow-sm">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-yellow-700 leading-relaxed text-center font-semibold mb-2">
                ⚠️ Important Information
              </p>
              <p className="text-xs sm:text-sm md:text-base text-yellow-700 leading-relaxed text-justify">
                Thank you for using Kazibase! As a client, you have access to Kenyas largest network of skilled workers.
                For the best experience, please provide detailed job descriptions when posting new jobs.
                Always verify worker identification before allowing them to start work at your premises.
                Remember to rate workers after job completion to help maintain service quality on our platform.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-yellow-700 leading-relaxed text-justify mt-4 font-semibold">
                📌 All workers are required to carry their original ID when visiting your premises.
              </p>
            </div>
          </>
        );
      case "post-job":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h4 className="text-lg font-medium text-sky-900 mb-6">Post a New Job</h4>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="e.g. House Cleaning, Plumbing Repair"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                    <option value="">Select a category</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="painting">Painting</option>
                    <option value="gardening">Gardening</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <textarea 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 h-32"
                  placeholder="Describe the job in detail including requirements, materials needed, etc."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (KES)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="e.g. 2000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                    <option value="">Select duration</option>
                    <option value="few_hours">Few hours</option>
                    <option value="one_day">One day</option>
                    <option value="few_days">Few days</option>
                    <option value="one_week">One week</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location (Area)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="e.g. Parklands, Westlands"
                  defaultValue={client?.location.area || ""}
                />
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded-lg transition-colors"
                >
                  Post Job
                </button>
                <button 
                  type="button"
                  className="ml-4 text-gray-600 hover:text-gray-800 py-2 px-6 rounded-lg transition-colors"
                >
                  Save as Draft
                </button>
              </div>
            </form>
          </div>
        );
      case "my-jobs":
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-medium text-sky-900">My Jobs</h4>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
            <option>All Jobs</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <Link href="/client/post-job" className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-md text-sm">
            + New Job
          </Link>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : client?.jobPosts?.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Posted
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {client.jobPosts.map((job) => (
                <tr key={job.id}>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.description.substring(0, 50)}...</div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                    {job.county}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(job.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' :
                      job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      job.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {job.applications || 0}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/client/jobs/${job.id}`} className="text-sky-600 hover:text-sky-900 mr-3">View</Link>
                    {job.status === 'Active' && (
                      <button className="text-red-600 hover:text-red-900">Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">You have not posted any jobs yet</div>
          <Link href="/client/post-job" className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-md text-sm inline-block">
            Post Your First Job
          </Link>
        </div>
      )}
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
                <h4 className="text-xl font-medium text-gray-800">{client?.name || "Loading..."}</h4>
                <p className="text-gray-500 mb-4">Client ID: C{client?.id || "00000"}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{client?.email || "loading@example.com"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{client?.phone || "+254 000 000 000"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{client?.location?.county || "Loading"}, {client?.location?.subcounty || ""}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">{client?.joinedDate || "Loading..."}</p>
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
      </div>
    </div>
  );
}
