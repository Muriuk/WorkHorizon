import { useState } from "react";
import ActiveJobs from "./dashboardElements/activeJobs";
import ApplicantsView from "./dashboardElements/applicantsView";
import MessagesList from "./dashboardElements/messagesList";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "Active Jobs", href: "#active-jobs" },
    { name: "Applicants", href: "#applicants" },
    { name: "Messages", href: "#messages" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-sky-900">Kazibase</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-700 focus:outline-none"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="mt-4 flex flex-col space-y-2 px-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className="block py-2 px-3 rounded hover:bg-sky-100 text-sky-900 font-semibold"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top navigation for large screens and mobile header */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 lg:px-8">
          {/* Mobile hamburger button */}
          <button
            className="text-sky-900 lg:hidden focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo / Title */}
          <h1 className="text-xl font-bold text-sky-900">Kazibase Worker Dashboard</h1>

          {/* Navigation links for large screens */}
          <nav className="hidden lg:flex space-x-6 font-semibold text-sky-900">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-orange-500 border-b-2 border-transparent hover:border-orange-500 transition"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </header>

        {/* Dashboard content */}
        <main className="overflow-auto p-4 lg:p-8">
          <div className='container w-[88%] lg:w-full min-h-[90vh] pt-10 pb-20 flex flex-col justify-center mx-auto'>
            <h1 className="text-xl font-semibold mb-3 w-fit mx-auto text-sky-900 border-b border-orange-500 px-1 ">
              Hello Worker 👋
            </h1>
            <h1 className="text-3xl font-semibold mb-7 w-fit mx-auto text-sky-900 border-b border-orange-500 px-1">
              {"WORKER DASHBOARD"}
            </h1>

            <div className="mb-6 p-4 sm:p-5 md:p-6 lg:p-8 bg-yellow-50 border border-yellow-200 rounded-lg max-w-4xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-yellow-700 leading-relaxed text-center font-semibold mb-2">
                ⚠️ Disclaimer
              </p>
              <p className="text-xs sm:text-sm md:text-base text-yellow-700 leading-relaxed text-justify">
                Thank you for creating your account. Apply for the jobs that you&apos;re capable of doing. To make Kazibase a good atmosphere for you to thrive, you need to act professionally on every job you take and in how you present yourself to clients. Also, remember if you&apos;re involved in any misconduct, theft, or any inappropriate behavior towards clients, you will bear all the responsibility. Please remember to check the notice board regularly to see new planned updates.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-yellow-700 leading-relaxed text-justify mt-4 font-semibold">
                📌 It is mandatory to carry your original ID when visiting clients&apos; places.
              </p>
            </div>

            <div id="active-jobs" className='grid grid-cols-2 gap-10 w-full h-[450px] max-h-[450px] 2xl:h-[520px] 2xl:max-h-[530px]'>
                <ActiveJobs />
                <ApplicantsView />
            </div>
            <div id="messages" className="mt-8">
              <MessagesList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
