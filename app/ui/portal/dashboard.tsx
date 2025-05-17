import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";  // <-- import signOut
import ActiveJobs from "./dashboardElements/activeJobs";
import ApplicantsView from "./dashboardElements/applicantsView";
import MessagesList from "./dashboardElements/messagesList";

const menuItems = [
  { name: "Active Jobs", link: "#active-jobs", active: true },
  { name: "Applicants", link: "#applicants", active: false },
  { name: "Messages", link: "#messages", active: false },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        {/* Sidebar header with logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/">
            <a className="w-[13rem] h-auto flex items-center">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-wide">
                  <span className="text-sky-900">KAZI</span>
                  <span className="text-[#F7801E]">BASE</span>
                </h1>
                <p className="text-xs text-sky-700 font-medium tracking-tight">
                  Connecting Skilled Labor in Kenya
                </p>
              </div>
            </a>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-700 focus:outline-none"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        {/* Sidebar navigation */}
        <nav className="mt-4 flex flex-col space-y-2 px-4">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setSidebarOpen(false)}
              className={`block py-2 px-3 rounded text-sky-900 font-semibold hover:bg-sky-100 ${
                item.active ? "bg-sky-100 border-l-4 border-orange-500" : ""
              }`}
            >
              {item.name}
            </a>
          ))}

          {/* Sign Out Button in Sidebar */}
          <button
            onClick={() => {
              setSidebarOpen(false);
              signOut({ callbackUrl: "/portal" });
            }}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
          >
            Sign Out
          </button>
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
        {/* Top navigation */}
        <header className="bg-headerBackground py-3 shadow-sm shadow-gray-300 sticky top-0 z-50 transition-transform ease-in-out duration-500 transform translate-y-0 border-b border-gray-200">
          <div className="flex justify-between px-0 lg:grid lg:grid-cols-[20%,50%,30%] container mx-auto">
            {/* Logo on left */}
            <div className="flex items-center">
              <Link href="/">
                <a className="w-[13rem] lg:w-[15rem] h-auto flex items-center">
                  <div className="flex flex-col">
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">
                      <span className="text-sky-900">KAZI</span>
                      <span className="text-[#F7801E]">BASE</span>
                    </h1>
                    <p className="text-xs lg:text-sm text-sky-700 font-medium tracking-tight">
                      Connecting Skilled Labor in Kenya
                    </p>
                  </div>
                </a>
              </Link>
              {/* Mobile hamburger button */}
              <button
                className="ml-4 text-sky-900 lg:hidden focus:outline-none"
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
            </div>

            {/* Navigation links center for large screens */}
            <nav className="hidden lg:flex justify-center items-center gap-8 font-semibold text-sky-900">
              {menuItems.map((item) =>
                item.dropdown ? (
                  <div key={item.name}>Dropdown Placeholder</div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.link}
                    className={`relative text-lg xl:text-xl tracking-wide transitive-underline ${
                      item.active ? "text-[#F7801E]" : "hover:text-sky-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            {/* Right side: Sign Out button */}
            <div className="hidden lg:flex items-center justify-end px-4">
              <button
                onClick={() => signOut({ callbackUrl: "/portal" })}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="overflow-auto p-4 lg:p-8">
          <div className="container w-[88%] lg:w-full min-h-[90vh] pt-10 pb-20 flex flex-col justify-center mx-auto">
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
                Thank you for creating your account. Apply for the jobs that you&apos;re capable
                of doing. To make Kazibase a good atmosphere for you to thrive, you need to act
                professionally on every job you take and in how you present yourself to clients.
                Also, remember if you&apos;re involved in any misconduct, theft, or any
                inappropriate behavior towards clients, you will bear all the responsibility.
                Please remember to check the notice board regularly to see new planned updates.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-yellow-700 leading-relaxed text-justify mt-4 font-semibold">
                📌 It is mandatory to carry your original ID when visiting clients&apos; places.
              </p>
            </div>

            <div
              id="active-jobs"
              className="grid grid-cols-2 gap-10 w-full h-[450px] max-h-[450px] 2xl:h-[520px] 2xl:max-h-[530px]"
            >
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
