'use client'
import { TargetWindowCheck } from "@/app/hooks/windowSize";
import Image from "next/image";
import { useEffect, useState } from "react";

function SlideShow() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const width: string = TargetWindowCheck();

    const slides = [
        {
            img: width === 'D' ? '/assets/kazibase.png' : '/assets/kazibase.png',
            head: 'Post Kazi, Pata Hustler',
            desc: 'Weka kazi haraka – hustler anaiona papo hapo, anakuchat WhatsApp na kazi inaanza. Whether ni kusafisha nyumba, kubeba vitu au kuosha gari – help iko karibu na wewe, anytime.'
        },
        {
            img: width === 'D' ? '/assets/kazibase.png' : '/assets/kazibase.png',
            head: 'Local Talent You Can Trust',
            desc: 'Hustlers wetu wameverify skills zao – mama fua, fundi wa umeme, dereva bodaboda, na wengineo. Hawa ni watu wa mtaa wako, wanaojali kazi safi na huduma ya kweli.'
        },
        {
            img: width === 'D' ? '/assets/kazibase.png' : '/assets/kazibase.png',
            head: 'Jobs for Every Hustler',
            desc: 'Kazibase inafungua milango ya kazi ndogo ndogo kwa kila mkenya – fundi, mama fua, watchman, au jamaa wa mkokoteni. Kama ni kazi ya mikono, iko hapa. Post, connect, maliza kazi.'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [slides.length]); // Added dependency array

    return (
        <div className="relative w-full h-[600px] lg:h-[650px] xl:h-[750px] overflow-hidden lg:rounded-2xl transition-transform duration-300 delay-100 translate-x-0 ease-in shadow-lg shadow-transparent-one">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out delay-300 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Image
                        src={slide.img}
                        className="object-cover object-center"
                        fill
                        sizes="100% xl:80% 2xl:100%"
                        alt={`Kazibase_Slide_${index + 1}`}
                    />
                    <div className="absolute left-0 top-0 z-10 flex flex-col px-4 xl:px-32 pb-14 xl:pt-[575px] items-center justify-end xl:items-start xl:justify-start w-full h-full bg-gradient-to-t from-black/70 to-transparent">
                        <div className={`transform transition-transform duration-1000 text-center lg:text-start ease-in-out ${currentSlide === index ? 'translate-x-0' : '-translate-x-full'}`}>
                            <h2 className="text-2xl lg:text-4xl font-bold text-orange-400 uppercase leading-tight">
                                {slide.head}
                            </h2>
                            <h3 className="text-md lg:text-lg font-normal text-white leading-tight mb-3">{slide.desc}</h3>
                            <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 sm:px-6 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg text-sm sm:text-base mt-4">
                                Anza Sasa
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-4 z-10 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 w-2 rounded-full transition-all cursor-pointer ${idx === currentSlide ? 'bg-orange-500 scale-125' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function HomeHead() {
    return (
        <div className="container w-[88%] lg:w-full">
            <div className="mx-auto w-full pt-6 xl:pt-32 pb-16 lg:pb-20 xl:pb-40 grid lg:grid-cols-[50%,50%]">
                <div className="lg:pr-10">
                    <h3 className="text-sm font-normal leading-1">
                        <span className="font-bold uppercase">Kazibase</span> - Real Hustles, Real Jobs, Real People
                    </h3>
                    <h3 className="text-3xl lg:text-5xl font-bold text-sky-900 uppercase lg:leading-tight mb-3">
                        Manual Jobs Made Easy in Kenya 🇰🇪
                    </h3>
                    <p className="text-md lg:text-xl font-normal tracking-wide">
                        Kazibase ni njia rahisi kwa Wakenya kupata kazi ndogo kama mama fua, fundi, bodaboda, cleaner – au kuajiri mtu wa kusaidia haraka. Unaweka kazi, hustler anaiona, anakuchat WhatsApp – kazi inaanza!
                    </p>
                </div>
                <div className="lg:pl-12 pt-5">
                    <p className="text-md lg:text-xl font-normal tracking-wide">
                        Wafanyakazi wote wanathibitisha ujuzi wao. Hii inamaanisha unaweza kuwa na imani na kazi yao. Kazibase inalenga kila mtaa, kijiji na jiji – iwe Nairobi, Kisumu, Eldoret ama Garissa.
                    </p>
                </div>
            </div>
            <div className="w-full 2xl:w-full relative mx-auto">
                <SlideShow />
                <div className="absolute lg:-right-12 lg:-top-16 2xl:-right-16 hidden lg:block z-40 transform rotate-6 transition-transform hover:rotate-12 duration-500 cursor-pointer">
                    <div className="text-4xl font-extrabold text-orange-500 drop-shadow-xl">
                        Kazibase
                    </div>
                </div>
            </div>
        </div>
    );
}
