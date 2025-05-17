import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import ActiveJobs from "./dashboardElements/activeJobs";
import ApplicantsView from "./dashboardElements/applicantsView";
import MessagesList from "./dashboardElements/messagesList";

const menuItems = [
  { name: "Active Jobs", id: "active-jobs", icon: "briefcase" },
  { name: "Applicants", id: "applicants", icon: "users" },
  { name: "Messages", id: "messages", icon: "message-square" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("active-jobs");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle intersection observer to detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      menuItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Close sidebar when clicking outside or when navigation is clicked
  const closeSidebar = () => setSidebarOpen(false);

  // Handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeSidebar();
    }
  };

  // Render icon based on name
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "briefcase":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "users":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case "message-square":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
        {/* Logo area */}
        <div className="p-5 border-b border-gray-200">
          <Link href="/">
            <a className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-wide">
                <span className="text-sky-900">KAZI</span>
                <span className="text-[#F7801E]">BASE</span>
              </h1>
              <p className="text-xs text-sky-700 font-medium tracking-tight">
                Connecting Skilled Labor in Kenya
              </p>
            </a>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => scrollToSection(item.id)}
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
          <div className="w-14 flex-shrink-0">
            {/* Close button column */}
            <div className="h-full flex flex-col items-center justify-start pt-5">
              <button
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
                onClick={closeSidebar}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            {/* Logo */}
            <div className="px-4 mb-6">
              <Link href="/">
                <a className="flex flex-col">
                  <h1 className="text-2xl font-bold tracking-wide">
                    <span className="text-sky-900">KAZI</span>
                    <span className="text-[#F7801E]">BASE</span>
                  </h1>
                  <p className="text-xs text-sky-700 font-medium tracking-tight">
                    Connecting Skilled Labor in Kenya
                  </p>
                </a>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.id)}
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
                    signOut({ callbackUrl: "/portal" });
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
              <Link href="/">
                <a className="flex items-center">
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-bold tracking-wide">
                      <span className="text-sky-900">KAZI</span>
                      <span className="text-[#F7801E]">BASE</span>
                    </h1>
                    <p className="text-xs text-sky-700 font-medium tracking-tight hidden sm:block">
                      Connecting Skilled Labor in Kenya
                    </p>
                  </div>
                </a>
              </Link>
            </div>

            {/* Desktop: Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
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
                onClick={() => signOut({ callbackUrl: "/portal" })}
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

            {/* Dashboard sections */}
            <section 
              id="active-jobs" 
              className="mb-12 scroll-mt-20"
            >
              <h3 className="text-xl font-semibold mb-6 text-sky-900 border-l-4 border-orange-500 pl-3">
                Active Jobs
              </h3>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <ActiveJobs />
              </div>
            </section>

            <section 
              id="applicants" 
              className="mb-12 scroll-mt-20"
            >
              <h3 className="text-xl font-semibold mb-6 text-sky-900 border-l-4 border-orange-500 pl-3">
                Applicants
              </h3>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <ApplicantsView />
              </div>
            </section>

            <section 
              id="messages" 
              className="mb-12 scroll-mt-20"
            >
              <h3 className="text-xl font-semibold mb-6 text-sky-900 border-l-4 border-orange-500 pl-3">
                Messages
              </h3>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <MessagesList />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
