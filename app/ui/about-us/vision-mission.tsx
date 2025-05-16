import Image from "next/image"
import Link from "next/link"

export default function Vision_Mission(){
    
    const content = [
        {
            image:'/assets/about-vision.jpg',
            title: 'Our Vision',
            description: 'To be a leading platform in Kenya, connecting hustlers with manual jobs to empower individuals and enhance livelihoods. Kazibase envisions becoming the go-to hub for skilled and reliable hustlers, providing accessible opportunities to businesses and individuals alike. By bridging the gap between job seekers and employers, we aim to create sustainable employment, foster economic growth, and contribute to a thriving local economy.',
        },{
            image: '/assets/about-mission.jpg',
            title: 'Our Mission',
            description: 'Kazibase mission is to provide accessible, reliable, and high-quality manual labor solutions to businesses and individuals across Kenya. We are committed to connecting employers with the right hustlers for a wide range of tasks, from home repairs and cleaning to more specialized manual jobs. We focus on empowering hustlers by giving them opportunities to find work, build their skills, and earn a living while ensuring businesses can access reliable and affordable services.',
        }
    ]

    return(
        <div className='container w-[88%] lg:w-full' id='next'>
            <div className='flex flex-row flex-wrap justify-between'>
                {
                    content.map((target, idx) => 
                        <div className={`flex flex-col md:w-[50%] border-gray-[400] py-5 lg:pt-10 lg:pb-20 ${idx === 0 ? 'lg:border-r md:pr-8 2xl:pr-14': 'md:border-l md:pl-8 2xl:pl-14'}`} key={idx}>
                            <Image className="h-[40vh] lg:h-[300px] object-cover w-full rounded-xl" quality={100} src={target?.image} alt={target.title} width={1000} height={800}  data-aos='fade-up'/>
                            <div className='lg:px-4 xl:px-7 py-5 flex flex-col' data-aos='fade-up'>
                                <h3 className="text-sky-900 font-bold capitalize border-b border-orange-500 w-fit text-2xl lg:text-3xl mb-3">{target.title}</h3>
                                <p className="text-md 2xl:text-lg font-normal tracking-wide mb-5"> {target.description} </p>
                                <Link className='text-md 2xl:text-lg text-gray-100 bg-sky-900 px-5 py-2 w-fit rounded-3xl transition-all ease-in-out duration-300 hover:scale-[1.05]' href={'/jobspage'}>Check Jobs</Link>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    )
}
