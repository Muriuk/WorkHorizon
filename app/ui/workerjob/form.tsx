'use client';

import { ArrowRight, Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

// Define the job type
type Job = {
  id: string;
  client_name: string;
  title: string;
  description: string;
  county: string;
  number_of_workers: number;
  gender?: string;
  duration: string;
  budget: number;
  category?: string;
  created_at: string; // Add created_at field
};

// Define filter state type
type FilterState = {
  search: string;
  minPrice: string;
  maxPrice: string;
  county: string;
  category: string;
  gender: string;
  minWorkers: string;
  maxWorkers: string;
};

// Format relative time function
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (isNaN(date.getTime())) {
    return "Recently posted";
  }
  
  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}

export default function JobsPage() {
  const pathname = usePathname();
  const [singleJob, setSingleJob] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    minPrice: '',
    maxPrice: '',
    county: '',
    category: '',
    gender: '',
    minWorkers: '',
    maxWorkers: '',
  });
  
  // Filter options (will be populated from jobs data)
  const [filterOptions, setFilterOptions] = useState({
    counties: new Set<string>(),
    categories: new Set<string>(),
    genders: new Set<string>(),
  });

  useEffect(() => {
    if (pathname.includes('/jobs/')) {
      setSingleJob(true);
    } else {
      setSingleJob(false);
      fetchJobs();
    }
  }, [pathname]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/workerjob');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
      
      // Extract filter options from data
      const counties = new Set<string>();
      const categories = new Set<string>();
      const genders = new Set<string>();
      
      data.forEach((job: Job) => {
        if (job.county) counties.add(job.county);
        if (job.category) categories.add(job.category);
        if (job.gender) genders.add(job.gender);
      });
      
      setFilterOptions({
        counties,
        categories,
        genders,
      });
      
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // resetFilters function - use memoizedApplyFilters to apply changes
  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      county: '',
      category: '',
      gender: '',
      minWorkers: '',
      maxWorkers: '',
    });
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Apply filters when filters state changes - wrap applyFilters in useCallback to avoid recreation on every render
  const memoizedApplyFilters = useCallback(() => {
    let result = [...jobs];
    
    // Search filter (title, category, county, client_name)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        (job.category && job.category.toLowerCase().includes(searchLower)) ||
        job.county.toLowerCase().includes(searchLower) ||
        job.client_name.toLowerCase().includes(searchLower)
      );
    }
    
    // Price range filter
    if (filters.minPrice) {
      result = result.filter(job => job.budget >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(job => job.budget <= Number(filters.maxPrice));
    }
    
    // County filter
    if (filters.county) {
      result = result.filter(job => job.county === filters.county);
    }
    
    // Category filter
    if (filters.category) {
      result = result.filter(job => job.category === filters.category);
    }
    
    // Gender filter
    if (filters.gender) {
      result = result.filter(job => 
        job.gender === filters.gender || 
        job.gender === 'Any' || 
        !job.gender
      );
    }
    
    // Workers needed filter
    if (filters.minWorkers) {
      result = result.filter(job => job.number_of_workers >= Number(filters.minWorkers));
    }
    if (filters.maxWorkers) {
      result = result.filter(job => job.number_of_workers <= Number(filters.maxWorkers));
    }
    
    setFilteredJobs(result);
  }, [filters, jobs]);
  
  // Apply filters when component mounts and when dependencies change
  useEffect(() => {
    memoizedApplyFilters();
  }, [memoizedApplyFilters]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <JobsHead singleJob={singleJob} />

      {!singleJob && (
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <SearchAndFilters 
            filters={filters} 
            filterOptions={filterOptions}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
          />
          
          {loading ? (
            <JobsLoading />
          ) : error ? (
            <JobsError error={error} />
          ) : (
            <JobsList jobs={filteredJobs} />
          )}
        </div>
      )}
    </div>
  );
}

// SearchAndFilters component
function SearchAndFilters({ 
  filters, 
  filterOptions, 
  handleFilterChange, 
  resetFilters 
}: { 
  filters: FilterState;
  filterOptions: {
    counties: Set<string>;
    categories: Set<string>;
    genders: Set<string>;
  };
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resetFilters: () => void;
}) {
  const [showFilters, setShowFilters] = useState(false);
  
  // Add client-side animation styles
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Check if the style already exists to avoid duplicates
      const existingStyle = document.getElementById('jobsearch-animations');
      if (!existingStyle) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'jobsearch-animations';
        styleSheet.textContent = `
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-slideDown {
            animation: slideDown 0.3s ease-out forwards;
          }
        `;
        document.head.appendChild(styleSheet);
      }
    }
  }, []);
  
  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by job title, category, county or client name"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center md:justify-start space-x-2 bg-sky-700 hover:bg-sky-800 text-white px-4 py-3 rounded-lg transition-colors md:w-auto w-full"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {showFilters ? 
            <ChevronUp className="w-5 h-5" /> : 
            <ChevronDown className="w-5 h-5" />
          }
        </button>
      </div>
      
      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 animate-slideDown">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-sky-900">Refine Your Search</h3>
            <button 
              onClick={resetFilters}
              className="text-sm text-sky-600 hover:text-sky-800 flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Reset Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Price Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Budget Range (KSh)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
            
            {/* County Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">County</label>
              <select
                name="county"
                value={filters.county}
                onChange={handleFilterChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="">All Counties</option>
                {Array.from(filterOptions.counties).map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
            </div>
            
         {/* Category Filter */}
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">Category</label>
  <select
    name="category"
    value={filters.category}
    onChange={handleFilterChange}
    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
  >
    <option value="">All Categories</option>
    <option value="Construction Worker">Construction Worker</option>
    <option value="Plumber">Plumber</option>
    <option value="Electrician">Electrician</option>
    <option value="Carpenter">Carpenter</option>
    <option value="Painter">Painter</option>
    <option value="Cleaner">Cleaner</option>
    <option value="Gardener">Gardener</option>
    <option value="Driver">Driver</option>
    <option value="Delivery Personnel">Delivery Personnel</option>
    <option value="Mechanic">Mechanic</option>
    <option value="Cook/Chef">Cook/Chef</option>
    <option value="Tailor">Tailor</option>
    <option value="Welder">Welder</option>
    <option value="Hair & Beauty">Hair & Beauty</option>
    <option value="Security Guard">Security Guard</option>
    <option value="Farm Worker">Farm Worker</option>
    <option value="Other">Other</option>
  </select>
</div>

            
            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gender Preference</label>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="">Any Gender</option>
                {Array.from(filterOptions.genders).map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>
            
            {/* Workers Needed Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Workers Needed</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="minWorkers"
                  value={filters.minWorkers}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <input
                  type="number"
                  name="maxWorkers"
                  value={filters.maxWorkers}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function JobsHead({ singleJob }: { singleJob: boolean }) {
  return (
    <div className='bg-neutral-100 w-full shadow-md shadow-gray-200'>
      <div className={`container w-[88%] lg:w-[77%] 2xl:w-[70%] flex pt-6 ${singleJob ? 'hidden' : ''}`}>
       
        <Link href='/portal/dashboard' className="text-gray-500 font-semibold text-sm underline">Back to Dashboard</Link>
        <ArrowRight className="hidden lg:block w-4 h-auto text-gray-500 mx-3" />
        <Link href='/jobspage' className="hidden lg:block text-orange-500 font-semibold text-sm underline">Available Jobs</Link>
      </div>
      <div className='container w-[88%] flex flex-col bg-neutral-100 items-center justify-center lg:w-full py-8 lg:pt-8 lg:pb-12'>
        <Link href='/jobspage'>
          <div className="w-[13rem] lg:w-[15rem] h-auto flex items-center justify-center mb-3">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">
                <span className="text-sky-900">KAZI</span>
                <span className="text-[#F7801E]">BASE</span>
              </h1>
              <p className="text-xs lg:text-sm text-sky-700 font-medium tracking-tight text-center">
                Connecting Skilled Labor in Kenya
              </p>
            </div>
          </div>
        </Link>
        {!singleJob && (
          <>
            <div className="mb-6 p-4 sm:p-5 md:p-6 lg:p-8 bg-yellow-50 border border-yellow-200 rounded-lg max-w-4xl mx-auto">
  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-yellow-700 leading-relaxed text-center font-semibold mb-2">
    ⚠️ Disclaimer For You
  </p>
  <p className="text-xs sm:text-sm md:text-base text-yellow-700 leading-relaxed text-justify">
    Dear jobs posted here are directly from job owners who are seeking assistance. Kazibase has not physically verified these jobs. Please ensure you communicate clearly with the job owner to fully understand the job being offered.
    <br /><br />
    To visit a job owner, you must be a verified worker and carry your original ID card for client verification. Note that Kazibase does not provide any form of physical security and does not handle any payments.
    <br /><br />
    Kindly exercise caution when interacting with job owners, as Kazibase does not verify or guarantee the accuracy of any job or client information.
  </p>
</div>

          </>
        )}
      </div>
    </div>
  );
}

// Updated JobsList component with two-column grid for mobile
function JobsList({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold text-gray-700">No jobs available at the moment</h3>
        <p className="text-gray-500 mt-2">Please check back later for new opportunities</p>
      </div>
    );
  }

  return (
    // Mobile: 2 columns with smaller gap, Desktop: 3 columns with larger gap
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

// Completely redesigned JobCard component that shows all information
function JobCard({ job }: { job: Job }) {
  const {
    client_name,
    title,
    description,
    county,
    number_of_workers,
    gender,
    duration,
    budget,
    category,
    created_at,
  } = job;

  const formattedBudget = new Intl.NumberFormat('en-KE').format(budget);
  const timeAgo = formatRelativeTime(created_at);

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-sky-100 flex flex-col transform hover:-translate-y-1">
      {/* Top accent gradient */}
      <div className="h-2 bg-gradient-to-r from-sky-600 to-orange-400"></div>
      
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-sky-900 group-hover:text-sky-700 transition-colors duration-300 mb-2">
          {title}
        </h3>
        
        {/* Client name */}
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-700 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-gray-700 font-medium text-sm">{client_name}</span>
        </div>
        
        {/* Location and time posted on same line */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-sky-50 text-sky-800 text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {county}
          </span>
          
          <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {timeAgo}
          </span>
        </div>

        {/* Category */}
        {category && (
          <div className="mb-2">
            <span className="bg-orange-50 text-orange-700 text-xs font-medium px-2 py-1 rounded-full inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {category}
            </span>
          </div>
        )}

        {/* Description - visible on all screen sizes but with a limit */}
        <p className="text-gray-600 mb-3 text-sm line-clamp-3">{description}</p>

        {/* Key job details in a bordered section */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm">
          <div className="grid grid-cols-2 gap-y-2">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-700 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <span className="text-gray-500 text-xs">Workers</span>
                <p className="text-gray-800 font-medium">{number_of_workers}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-700 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <span className="text-gray-500 text-xs">Gender</span>
                <p className="text-gray-800 font-medium">{gender || 'Any'}</p>
              </div>
            </div>
            
            <div className="flex items-center col-span-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-700 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span className="text-gray-500 text-xs">Duration</span>
                <p className="text-gray-800 font-medium">{duration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Budget - highlighted */}
        <div className="mt-auto">
          <div className="flex justify-between items-center bg-sky-50 rounded-lg p-3 mb-3">
            <span className="text-sky-700 font-medium text-sm">Budget</span>
            <span className="text-sky-900 font-bold text-lg">KSh {formattedBudget}</span>
          </div>
          
          {/* Action Button */}
          <Link href={`/portal/dashboard`}>
            <button className="w-full bg-gradient-to-r from-[#F7801E] to-green-500 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md">
              Apply Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Updated JobsLoading component for consistent layout with the new cards
function JobsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md p-4 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          
          <div className="flex gap-2 mb-3">
            <div className="h-6 bg-gray-200 rounded-full w-28"></div>
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          </div>
          
          <div className="h-4 bg-gray-200 rounded-full w-24 mb-3"></div>
          
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
          
          <div className="h-24 bg-gray-200 rounded mb-3 w-full"></div>
          
          <div className="h-12 bg-gray-200 rounded-lg mb-3 w-full"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>
      ))}
    </div>
  );
}

function JobsError({ error }: { error: string }) {
  return (
    <div className="text-center py-10">
      <h3 className="text-xl font-semibold text-red-600">Failed to load jobs</h3>
      <p className="text-gray-700 mt-2">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
      >
        Try Again
      </button>
    </div>
  );
}

// The animations will be added via CSS classes in Tailwind
