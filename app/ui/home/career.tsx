// import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CareerOpportunities() {
    const Oppos = [
        {
            icon: '/assets/icons/home/salesandmarketing.png',
            head: 'Housekeeping &amp; Cleaning',
            desc: 'Join our network of trusted housekeepers and cleaners. Kazibase connects you to homes and offices in need of reliable cleaning and domestic help services across Kenya.',
            link: '/jobspage',
        },{
            icon: '/assets/icons/home/customersupport.png',
            head: 'Construction &amp; Masonry',
            desc: 'Find hands-on work in building, masonry, painting, and more. Skilled and semi-skilled hustlers can get matched with clients looking to improve or build structures.',
            link: '/jobspage',
        },{
            icon: '/assets/icons/home/humanresources.png',
            head: 'Delivery &amp; Errands',
            desc: 'Take on gigs in delivering items, running errands, or courier support. Ideal for bodaboda riders or anyone with a passion for fast, reliable service.',
            link: '/jobspage',
        },{
            icon: '/assets/icons/home/financeandaccounting.png',
            head: 'Repairs &amp; Maintenance',
            desc: 'Offer repair services for electronics, plumbing, furniture, or general maintenance. Skilled jua kali workers can get noticed and booked by locals.',
            link: '/jobspage',
        },
    ]
    return (
        <div className="w-full min-h-[500px] relative lg:left-0 bg-blue-white-two md:bg-blue-white-three lg:bg-blue-white">
            <div className="container w-[88%] grid grid-cols-1 gap-20 lg:gap-0 lg:grid-cols-[45%,55%] 2xl:grid-cols-[42%,58%] py-10">
                <div className="flex flex-col justify-center pr-0 lg:pr-8 2xl:pr-16" data-aos='fade-in'>
                    <h3 className=" text-2xl lg:text-3xl 2xl:text-4xl capitalize text-neutral-100 font-bold mb-4 lg:mb-8 pb-2 border-b border-orange-500 w-fit">Explore Career Opportunities</h3>  
                    <h4 className="text-lg lg:text-xl 2xl:text-2xl capitalize text-neutral-100 font-semibold lg:mb-3">Apply with Confidence</h4> 
                    <p className="text-md lg:text-lg 2xl:text-xl text-gray-100 font-normal tracking-wide" >
                        Join Kazibase and connect directly with Kenyans looking for manual help. Whether you&apos;re a skilled hustler or looking for your first gig, there&apos;s always work waiting near you.
                    </p> 
                    <p className="text-md lg:text-lg 2xl:text-xl text-gray-100 font-normal tracking-wide mt-8 xl:mt-10 2xl:mt-16" >
                        From fixing to fetching, Kazibase offers real jobs with real people. Hustle on your terms and get discovered by locals in need of hands-on help.
                    </p>
                    <Link className="text-orange-500 hover:text-gray-100 hover:bg-orange-600 hover:border-orange-600 text-md xl:text-lg font-semibold tracking-wide rounded-xl border-2 border-orange-500 px-5 py-2 mt-8 w-fit" href={'/jobspage'}>Opportunities</Link> 
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 2xl:gap-8 px-6 lg:pl-3 2xl:pl-8">
                    {
                        Oppos.map((opp, index) => 
                            <div className="border border-sky-900 rounded-2xl flex flex-col gap-1 justify-start items-center py-6 px-3 text-center" data-aos='fade-up' key={index}>
                                <Image src={opp.icon} className='h-[5rem] w-auto 2xl:h-auto 2xl:w-auto' alt={`Kazibase - Job Opportunity - ${opp.head}`} width={100} height={100} />
                                <h3 className="text-lg xl:text-xl font-semibold text-sky-900 tracking-wide">{opp.head}</h3>
                                <p className="text-sm lg:text-md font-normal mb-2">{opp.desc}</p>
                                <Link className="text-md text-neutral-100 hover:text-sky-900 font-semibold tracking-wide px-4 py-2 border-2 hover:border-sky-900 hover:bg-neutral-100  rounded-xl bg-sky-900 " href={opp.link}>Apply Now</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
