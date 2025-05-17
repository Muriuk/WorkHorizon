import ActiveJobs from "./dashboardElements/activeJobs";
import ApplicantsView from "./dashboardElements/applicantsView";
import MessagesList from "./dashboardElements/messagesList";

export default function DashboardBody() {
    return(
        <div className='container w-[88%] lg:w-full min-h-[90vh] pt-10 pb-20 flex flex-col justify-center'>
            <h1 className="text-xl font-semibold mb-3 w-fit mx-auto text-sky-900 border-b border-orange-500 px-1 ">
                Hello Worker 👋
            </h1>
            <h1 className="text-3xl font-semibold mb-7 w-fit mx-auto text-sky-900 border-b border-orange-500 px-1">
                {WORKER DASHBOARD}
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

            <div className='grid grid-cols-2 gap-10 w-full h-[450px] max-h-[450px] 2xl:h-[520px] 2xl:max-h-[530px]'>
                <ActiveJobs />
                <ApplicantsView />
            </div>
            <MessagesList/>
        </div>
    )
}
