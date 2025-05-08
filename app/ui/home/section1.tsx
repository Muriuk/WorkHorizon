'use client'
import { TargetWindowCheck } from "@/app/hooks/windowSize";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

/**
 * Slideshow component for displaying rotating content
 */
function SlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const width = TargetWindowCheck();
  
  // Define slides as a memoized constant
  const slides = useMemo(() => [
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
  ], [width]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[600px] lg:h-[650px] xl:h-[750px] overflow-hidden rounded-xl lg:rounded-2xl transition-transform duration-300 delay-100 translate-x-0 ease-in shadow-xl shadow-sky-900/10">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out delay-300 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={slide.img}
            className="object-cover object-center"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
            priority={index === 0}
            alt={`Kazibase_Slide_${index + 1}`}
          />
          <div className="absolute left-0 top-0 z-10 flex flex-col px-4 xl:px-32 pb-14 xl:pt-[575px] items-center justify-end xl:items-start xl:justify-start w-full h-full bg-gradient-to-t from-black/70 to-transparent">
            <div className={`transform transition-transform duration-1000 text-center lg:text-start ease-in-out ${currentSlide === index ? 'translate-x-0' : '-translate-x-full'}`}>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-orange-400 uppercase leading-tight drop-shadow-md">
                {slide.head}
              </h2>
              <p className="text-sm sm:text-md lg:text-xl font-normal text-white leading-tight mb-3 sm:mb-5 mt-2 max-w-2xl drop-shadow-md">
                {slide.desc}
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 sm:px-6 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg text-sm sm:text-base">
                Anza Sasa
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-6 z-10 left-0 right-0 flex justify-center gap-2 md:gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 md:h-3 transition-all cursor-pointer transform hover:scale-110 ${
              idx === currentSlide ? 'bg-orange-500 scale-125 w-6 md:w-8 rounded-full' : 'bg-white/70 hover:bg-white w-2 md:w-3 rounded-full'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Main component for the home page header section
 */
export default function HomeHead() {
  return (
    <section className="container w-[88%] lg:w-full">
      <div className="mx-auto w-full pt-10 xl:pt-32 pb-16 lg:pb-20 xl:pb-40 grid lg:grid-cols-2 gap-8">
        <div className="lg:pr-12">
          <div className="flex items-center gap-2 mb-3">
            <h4 className="text-sm font-medium leading-4 tracking-wider border border-black p-2">
              <span className="font-bold text-orange-500">KAZIBASE :</span> Real Hustles, Real Jobs.
            </h4>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-sky-900 uppercase lg:leading-tight mb-4 sm:mb-6">
            Manual Jobs Made Easy in Kenya 🇰🇪
          </h1>
          
          <p className="text-sm lg:text-base font-normal tracking-wide text-gray-700 max-w-xl">
            Kazibase ni njia rahisi kwa Wakenya kupata kazi ndogo kama mama fua, fundi, bodaboda, cleaner – au kuajiri mtu wa kusaidia haraka. Unaweka kazi, hustler anaiona, anakuchat WhatsApp – kazi inaanza!
          </p>
          <p className="text-sm lg:text-base font-normal tracking-wide text-gray-700 max-w-xl">
            Wafanyakazi wote wanathibitisha ujuzi wao. Hii inamaanisha unaweza kuwa na imani na kazi yao. Kazibase inalenga kila mtaa, kijiji na jiji – iwe Nairobi, Kisumu, Eldoret ama Garissa.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 sm:px-8 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto">
              <span>Tafuta Kazi</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button className="border-2 border-sky-800 text-sky-800 hover:bg-sky-800 hover:text-white py-3 px-6 sm:px-8 rounded-full font-medium transition-all duration-300 ease-in-out flex items-center justify-center gap-2 w-full sm:w-auto">
              <span>Weka Kazi</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-current" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
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
    </section>
  );
}
