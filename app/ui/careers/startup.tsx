'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Careers_Start() {
  const [image, setImage] = useState<string>('/assets/careers-one.jpg');

  useEffect(() => {
    const updateImage = () => {
      setImage(window.innerWidth > 640 ? "/assets/careers-one.jpg" : "/assets/careers-two.jpg");
    };

    updateImage(); // Initial image
    window.addEventListener("resize", updateImage);

    return () => window.removeEventListener("resize", updateImage);
  }, []);

  return (
    <div className="container w-[88%] lg:w-full py-10">
      <div className="relative flex flex-col items-center rounded-2xl overflow-hidden shadow-lg shadow-gray-300">
        {/* Background blurred image layer */}
        <Image
          src={image}
          alt="Kazibase Careers Background"
          fill
          className="object-cover object-center blur-xl scale-110"
          style={{ zIndex: 0 }}
        />

        {/* Foreground content layer */}
        <div className="relative z-10 w-full lg:w-[87%] h-auto flex flex-col backdrop-blur-md rounded-b-2xl lg:rounded-2xl py-6 lg:py-12 px-4 bg-black/30">
          <h5 className="text-md 2xl:text-lg leading-1 uppercase tracking-wider font-bold text-gray-100 mb-2 lg:mb-3">
            Kazibase impacting life
          </h5>
          <h3 className="text-3xl 2xl:text-4xl capitalize text-gray-100 font-bold mb-3">
            Join Our Team & Shape the Future with Excellence
          </h3>
          <p className="text-md lg:text-lg 2xl:text-xl font-normal text-gray-100 tracking-wide mb-3 lg:mb-5">
            {`At Kazibase, we believe in fostering talent, innovation, and professional growth. Whether you are an experienced professional or just starting your career, we offer a dynamic and rewarding work environment where you can thrive.`}
          </p>
          <Link
            href="/careers/jobs"
            className="text-md lg:text-lg 2xl:text-xl bg-sky-900 font-semibold px-4 py-2 w-fit mx-auto lg:mx-0 text-gray-100 rounded-xl transition-transform ease-in-out duration-300 hover:scale-[1.05]"
          >
            Connect With Kazibase
          </Link>
        </div>
      </div>
    </div>
  );
}
