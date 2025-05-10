'use client';
import Image from "next/image";
import { useState } from "react";
import { TbPoint, TbPointFilled } from 'react-icons/tb';

export default function WhyWorkWithUs() {
    const [points, setPoints] = useState([
        {
            image: '/assets/kazibase-1.jpg',
            title: 'Earn from Your Skills',
            desc: 'Kazibase helps you get hired fast for what you’re good at – no middlemen, no delay.',
            active: true,
        },
        {
            image: '/assets/kazibase-2.jpg',
            title: 'Work Near Your Location',
            desc: 'Get job requests within your area and save on travel costs.',
            active: false,
        },
        {
            image: '/assets/kazibase-3.jpg',
            title: 'Flexible Hours',
            desc: 'You decide when you want to work – part-time, full-time, or once in a while.',
            active: false,
        },
        {
            image: '/assets/kazibase-4.jpg',
            title: 'Trusted by Local Clients',
            desc: 'Jobs come from real people and businesses verified on Kazibase.',
            active: false,
        },
        {
            image: '/assets/kazibase-5.jpg',
            title: 'Grow Your Hustle',
            desc: 'We support your journey with ratings, repeat clients, and referrals.',
            active: false,
        },
    ]);

    const changeActive = (index: number) => {
        setPoints(points.map((point, i) => ({
            ...point,
            active: i === index
        })));
    };

    return (
        <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-2 bg-special-blue my-10">
            <div className="container lg:w-[70%] pr-0 lg:pr-4 py-10 flex flex-col items-start justify-center">
                <h3 className="text-3xl 2xl:text-4xl capitalize text-gray-100 font-bold mb-3">
                    Why Join Kazibase?
                </h3>
                <h3 className="text-md lg:text-lg 2xl:text-xl text-gray-100 mb-2 capitalize">
                    Benefits of working as a hustler on our platform:
                </h3>
                {points.map((point, index) => (
                    <div 
                        className="grid grid-cols-[10%,90%] mb-3 cursor-pointer" 
                        key={index} 
                        onMouseEnter={() => changeActive(index)}
                    >
                        {point.active
                            ? <TbPointFilled className='text-gray-100 w-auto lg:w-[50px] lg:mx-auto h-[25px] lg:mt-1' />
                            : <TbPoint className='text-gray-100 lg:mx-auto w-auto lg:w-[50px] h-[25px] lg:mt-1' />}
                        <h3 className="text-md lg:text-lg text-gray-100">
                            <span className="font-semibold text-orange-500 tracking-wide">
                                {point.title}:
                            </span> {point.desc}
                        </h3>
                    </div>
                ))}
            </div>
            <div className="h-[400px] lg:h-full 2xl:h-[600px]">
                <Image
                    className="h-[400px] lg:h-full w-full object-center object-cover"
                    src={points.find((point) => point.active)?.image || ''}
                    width={1000}
                    height={800}
                    alt="Why work with Kazibase"
                />
            </div>
        </div>
    );
}
