'use client';

import { ArrowRight, Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  category?: string; // Added category field
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
      const response = await fetch('/api/jobs');
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
                {Array.from(filterOptions.categories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
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
        <Link href='/' className="hidden lg:block text-gray-500 font-semibold text-sm underline">Home</Link>
        <ArrowRight className="w-4 h-auto text-gray-500 mr-2 lg:mx-3 rotate-180 lg:rotate-0" />
        <Link href='/jobspage' className="text-gray-500 font-semibold text-sm underline">Jobs</Link>
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
            <h3 className="text-3xl 2xl:text-4xl capitalize text-sky-900 font-bold mb-4 text-center">
              Job Available <br className='block lg:hidden' /> at Kazibase
            </h3>
            <p className="text-md lg:text-lg 2xl:text-xl font-normal tracking-wide text-center lg:mx-[20%]">
              We&apos;re eager to connect you with manual jobs in Kenya. Below, you&apos;ll find the current jobs at Kazibase, select any job and apply.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

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
  } = job;

  const formattedBudget = new Intl.NumberFormat('en-KE').format(budget);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-sky-900 line-clamp-2">{title}</h3>
          <span className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-1 rounded-full ml-2 shrink-0">{county}</span>
        </div>

        {category && (
          <div className="mb-2">
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-full">{category}</span>
          </div>
        )}

        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        <div className="space-y-2 mb-5">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Client:</span>
            <span className="text-gray-700 font-medium text-sm">{client_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Workers needed:</span>
            <span className="text-gray-700 font-medium text-sm">{number_of_workers}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Gender preference:</span>
            <span className="text-gray-700 font-medium text-sm">{gender || 'Any'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Duration:</span>
            <span className="text-gray-700 font-medium text-sm">{duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Budget:</span>
            <span className="text-sky-700 font-bold text-sm">KSh {formattedBudget}</span>
          </div>
        </div>

        <Link href={`/login`}>
          <button className="w-full bg-[#F7801E] hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center">
            Contact Client
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}

function JobsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md p-6 animate-pulse">
          <div className="flex justify-between items-start mb-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded-full w-1/4"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="space-y-2 mb-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
          <div className="h-10 bg-gray-200 rounded-md w-full"></div>
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
