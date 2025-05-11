import Image from "next/image"
import Link from "next/link"

export default function WhyChooseUs(){
    const points = [
        {
            point: 'Trusted by local communities',
            icon: '/assets/icons/home/expertise.png',
        },{
            point: 'Fast access to real jobs',
            icon: '/assets/icons/home/business.png',
        },{
            point: 'Fair pay and transparent process',
            icon: '/assets/icons/home/solutions.png',
        },{
            point: 'Affordable for everyone',
            icon: '/assets/icons/home/scalable.png',
        },{
            point: 'Built for Kenyans, by Kenyans',
            icon: '/assets/icons/home/global.png',
        },
    ]
    return(
        <div className="flex flex-col items-center my-8 lg:my-20 w-[92%] lg:w-full container">
            <h3 className="text-3xl lg:text-4xl capitalize text-sky-900 font-bold lg:mb-3" data-aos='fade-up'>Why Choose Us?</h3>
            <p className='text-md lg:text-xl font-normal tracking-wide text-center xl:mx-24 mb-6' data-aos='fade-up'>
                Kazibase connects everyday hustlers to real work opportunities across Kenya. We are trusted, easy to use, affordable, and committed to supporting your hustle—wherever you are.
            </p>
            <div className=" mx-8 lg:mx-0 grid lg:flex 2xl:grid grid-cols-1 md:grid-cols-2 lg:flex-wrap 2xl:grid-cols-5 gap-4 justify-center xl:gap-10" data-aos='fade-up'>
                {
                    points.map((item, index) => 
                        <div className=" w-full lg:w-[30%] 2xl:w-full flex flex-row lg:flex-col items-center border text-start lg:text-center py-5 lg:py-10 rounded-2xl bg-dullWhite shadow-sm px-4 lg:px-3" key={index} data-aos='lg:fade-up'>
                            <Image className="w-[60px] lg:w-auto h-auto" src={item.icon} alt={`Kazibase - ${item.point}`} width={110} height={110}/>
                            <h3 className="text-lg xl:text-xl capitalize font-[500] ml-3 lg:mt-3 text-sky-900">{item.point}</h3>
                        </div>
                    )
                }
            </div>  
            <Link data-aos='xl:fade-up' className="text-sky-900 hover:text-gray-100 hover:bg-sky-900 text-md xl:text-lg font-semibold tracking-wide rounded-xl border-2 border-sky-900 px-5 py-2 mt-8" href={'/jobspage'}>Explore Jobs</Link>
        </div>
    )
}
