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
      img: width === 'D' ? '/assets/hs1.jpg' : '/assets/hs4.jpg',
      head: 'Post Kazi, Pata Hustler',
      desc: 'Weka kazi haraka – hustler anaiona papo hapo, anakuchat WhatsApp na kazi inaanza. Whether ni kusafisha nyumba, kubeba vitu au kuosha gari – help iko karibu na wewe, anytime.'
    },
    {
      img: width === 'D' ? '/assets/hs2.jpg' : '/assets/hs5.jpg',
      head: 'Local Talent You Can Trust',
      desc: 'Hustlers wetu wameverify skills zao – mama fua, fundi wa umeme, dereva bodaboda, na wengineo. Hawa ni watu wa mtaa wako, wanaojali kazi safi na huduma ya kweli.'
    },
    {
      img: width === 'D' ? '/assets/hs3.jpg' : '/assets/hs6.jpg',
      head: 'Jobs for Every Hustler',
      desc: 'Kazibase inafungua milango ya kazi ndogo ndogo kwa kila mkenya – fundi, mama fua, watchman, au jamaa wa mkokoteni. Kama ni kazi ya mikono, iko hapa. Post, connect, maliza kazi.'
    }
  ], [width]);

  // Auto-rotate slideshow
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
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out delay-300 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
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
              <h2 className="text-3xl lg:text-5xl font-bold text-orange-400 uppercase leading-tight drop-shadow-md">
                {slide.head}
              </h2>
              <p className="text-md lg:text-xl font-normal text-white leading-tight mb-5 mt-2 max-w-2xl drop-shadow-md">
                {slide.desc}
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                Anza Sasa
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Indicators */}
      <div className="absolute bottom-6 z-10 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-3 w-3 rounded-full transition-all cursor-pointer transform hover:scale-110 ${
              idx === currentSlide ? 'bg-orange-500 scale-125 w-8' : 'bg-white/70 hover:bg-white'
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
  const width = TargetWindowCheck();

  return (
    <section className="container w-[88%] lg:w-full">
      <div className="mx-auto w-full pt-10 xl:pt-32 pb-16 lg:pb-20 xl:pb-40 grid lg:grid-cols-2 gap-8">
        <div className="lg:pr-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1 w-12 bg-orange-500"></span>
            <h3 className="text-sm font-medium leading-1 tracking-wider uppercase">
              <span className="font-bold text-orange-500">Kazibase</span> – Real Hustles. Real Jobs. Real People.
            </h3>
          </div>
          
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-sky-900 uppercase lg:leading-tight mb-6">
            Manual Jobs Made Easy in Kenya 🇰🇪
          </h1>
          
          <p className="text-lg lg:text-xl font-normal tracking-wide text-gray-700 max-w-xl">
            Kazibase ni njia rahisi kwa Wakenya kupata kazi ndogo kama mama fua, fundi, bodaboda, cleaner – au kuajiri mtu wa kusaidia haraka. Unaweka kazi, hustler anaiona, anakuchat WhatsApp – kazi inaanza!
          </p>
          
          <div className="mt-8 flex gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center gap-2">
              <span>Tafuta Kazi</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button className="border-2 border-sky-800 text-sky-800 hover:bg-sky-800 hover:text-white py-3 px-8 rounded-full font-medium transition-all duration-300 ease-in-out">
              Weka Kazi
            </button>
          </div>
        </div>
        
        <div className="lg:pl-12 pt-5">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <p className="text-md lg:text-xl font-normal tracking-wide text-gray-700">
              Wafanyakazi wote wanathibitisha ujuzi wao. Hii inamaanisha unaweza kuwa na imani na kazi yao. Kazibase inalenga kila mtaa, kijiji na jiji – iwe Nairobi, Kisumu, Eldoret ama Garissa.
            </p>
            
            <div className="mt-6">
              <h4 className="font-bold text-orange-500 text-lg mb-2">Categories:</h4>
              <div className="flex flex-wrap gap-2">
                {["Mama fua", "Mechanic", "Electrician", "Cleaner", "Househelp", "Mkokoteni", "Bodaboda", "Fundi", "Watchman", "Cook"].map((category, idx) => (
                  <span key={idx} className="bg-sky-50 text-sky-800 px-3 py-1 rounded-full text-sm">
                    {category}
                  </span>
                ))}
                <span className="bg-sky-50 text-sky-800 px-3 py-1 rounded-full text-sm">
                  +more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full 2xl:w-full relative mx-auto">
        <SlideShow />
        <div className="absolute lg:-right-12 lg:-top-16 2xl:-right-16 hidden lg:block z-40 transform rotate-6 transition-transform hover:rotate-12 duration-500 cursor-pointer">
          <Image
            className="drop-shadow-xl"
            width={width === 'D' ? 200 : 150}
            height={width === 'D' ? 200 : 150}
            src="/assets/borderedLogo.png"
            alt="Kazibase Logo"
            priority
          />
        </div>
      </div>
    </section>
  );
}
