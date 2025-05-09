'use client';

import { Message } from "@/app/lib/elements";
import { MailOpen, MapPin, PhoneCallIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Full list of Kenya counties
const kenyaCounties = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta",
  "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi",
  "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga",
  "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia",
  "Uasin Gishu", "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru",
  "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma",
  "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
];

export default function ContactForm() {
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);
  const [contactNumber, setContactNumber] = useState<string>('');

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCounty(e.target.value);
  };

  const handleContactNumber = (value: string): void => {
    let entry = value.replace(/\D/g, '');
    if (entry.length === 10) {
      entry = entry.slice(0, 10);
      entry = entry.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 $3');
    } else if (entry.length > 10) {
      entry = entry.slice(0, 11);
      entry = entry.replace(/(\d{4})(\d{7})/, '$1 $2');
    }
    setContactNumber(entry);
  };

  const contactOptions = [
    'For general query', 'Getting services information', 'Getting job options'
  ];

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message: Message = {
      id: null,
      firstname: formData.get('firstname')?.toString() || '',
      lastname: formData.get('lastname')?.toString() || '',
      reason: formData.get('reason')?.toString() || '',
      contactnumber: formData.get('contactnumber')?.toString() || '',
      country: formData.get('county')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      date: '',
      status: '',
    };

    const response1 = await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(message)
    });

    const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/message/sendEmail`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(message)
    });

    if (response1.ok && response2.ok) {
      setSubmit(true);
    }
  };

  useEffect(() => {
    if (submit) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [submit]);

  return (
    <div className='container w-[88%] lg:w-full min-h-[92vh] flex items-center'>
      <div className="grid grid-cols-1 lg:grid-cols-[70%,30%] w-full mb-10 py-10 lg:py-20 lg:mb-1">
        <div className='block mb-8 lg:m-0'>
          <h3 className="text-2xl xl:text-3xl font-bold tracking-wide text-sky-900 mb-3">Contact Us.</h3>
          <h4 className="text-md 2xl:text-xl font-semibold tracking-wide mb-3 border border-black p-3 rounded-md">
            For employment related queries, try to visit our{" "}
            <Link className="font-bold text-orange-500 capitalize" href={'/careers/jobs'}>
              Jobs available.
            </Link>
          </h4>

          <h3 className="text-xl xl:text-2xl font-semibold tracking-wide text-sky-900 mb-3">Share your details. We wll get back to you, ASAP.</h3>

          <form className="flex flex-col w-full lg:w-[75%] 2xl:w-[70%]" onSubmit={handleSubmission}>
            <div className='flex flex-col mb-2'>
              <label className="text-md lg:text-lg font-[500] tracking-wide mb-1">I am contacting for:</label>
              <select className="bg-gray-100 px-2 py-1 lg:px-4 lg:py-2 border-2 border-gray-200 rounded-lg" name='reason' id='reason' required>
                <option value="">Select the contact option</option>
                {contactOptions.map((option, idx) => (
                  <option value={option} key={idx}>{option}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-col mb-2'>
              <label className="text-md lg:text-lg font-[500] tracking-wide mb-1">First name:</label>
              <input type='text' name='firstname' required placeholder="Enter your firstname"
                className="bg-gray-100 px-2 py-1 lg:px-4 lg:py-2 border-2 border-gray-200 rounded-lg" />
            </div>

            <div className='flex flex-col mb-2'>
              <label className="text-md lg:text-lg font-[500] tracking-wide mb-1">Last name:</label>
              <input type='text' name='lastname' required placeholder="Enter your lastname"
                className="bg-gray-100 px-2 py-1 lg:px-4 lg:py-2 border-2 border-gray-200 rounded-lg" />
            </div>

            <div className='flex flex-col mb-2'>
              <label className="text-md lg:text-lg font-[500] tracking-wide mb-1">Email:</label>
              <input type='email' name='email' required placeholder="Enter your email"
                className="bg-gray-100 px-2 py-1 lg:px-4 lg:py-2 border-2 border-gray-200 rounded-lg" />
            </div>

            <div className='flex flex-col mb-2'>
              <label className="text-md lg:text-lg font-[500] tracking-wide mb-1">County (Kenya):</label>
              <select name='county' required value={selectedCounty} onChange={handleCountyChange}
                className="bg-gray-100 px-2 py-1 lg:px-4 lg:py-2 border-2 border-gray-200 rounded-lg">
                <option value="">Select your county</option>
                {kenyaCounties.map((county, idx) => (
                  <option key={idx} value={county}>{county}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-col mb-2'>
              <label className="text-md lg:text-lg font-[500] tracking-wide mb-1">Contact number:</label>
              <input type='tel' name='contactnumber' required value={contactNumber}
                onChange={(e) => handleContactNumber(e.target.value)}
                placeholder="07xx xxx xxx"
                className="bg-gray-100 px-2 py-1 lg:px-4 lg:py-2 border-2 border-gray-200 rounded-lg" />
            </div>

            <div className='flex flex-col mb-2'>
              <label className="text-md lg:text-lg font-[500] tracking-wide mb-1">Message:</label>
              <textarea name='message' rows={3} required placeholder="Message..."
                className="bg-gray-100 px-2 py-1 lg:px-4 lg:py-2 border-2 border-gray-200 rounded-lg" />
            </div>

            <button type='submit' className="text-lg lg:text-xl font-semibold tracking-wide bg-transparent border-2 border-sky-900 hover:bg-sky-900 hover:text-white text-sky-900 mt-5 w-fit px-5 py-2 rounded-md">
              Submit
            </button>
          </form>
        </div>

        <div className='flex flex-col justify-center h-fit my-auto border-2 rounded-2xl bg-gray-100 shadow-sm shadow-gray-400'>
          <div className='flex flex-col items-center lg:items-start px-8 py-10 border-b-2'>
            <PhoneCallIcon className="h-[4rem] w-auto text-orange-500 mb-3" />
            <h3 className="text-xl font-[500] text-sky-900">To Call Us:</h3>
            <Link href={'tel:+254768258491'} className="text-2xl font-bold text-sky-900 border-b border-orange-500">
              +254768258491
            </Link>
          </div>

          <div className='flex flex-col items-center lg:items-start px-8 py-10 border-b-2'>
            <MailOpen className="h-[4rem] w-auto text-orange-500 mb-3" />
            <h3 className="text-xl font-[500] text-sky-900">To Mail Us:</h3>
            <Link href={'mailto:hr@workhorizon.pk'} className="text-2xl font-bold text-sky-900 border-b border-orange-500">
              info@kazibase.com
            </Link>
          </div>

          <div className='flex flex-col items-center lg:items-start px-8 py-10'>
            <MapPin className="h-[4rem] w-auto text-orange-500 mb-3" />
            <h3 className="text-xl font-[500] text-sky-900">Located At:</h3>
            <Link href={'https://maps.app.goo.gl/8wxyANfpWtUkDN878'} className="text-2xl font-bold text-sky-900 border-b border-orange-500">
             Nairobi, Kenya.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
