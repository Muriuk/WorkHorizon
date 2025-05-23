'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HiringProcess() {
  const [childBtns, setChildBtns] = useState(false);

  const HP = [
    {
      image: '/assets/post-job.jpg',
      head: 'Post a Job',
      text: 'Describe the work you need done—cleaning, delivery, repair, etc. Fill out a quick form in seconds.',
    },
    {
      image: '/assets/select-worker.jpg',
      head: 'Pick a Worker',
      text: 'Browse nearby workers, read reviews, and choose the one you trust to do the job well.',
    },
    {
      image: '/assets/contact-whatsapp.jpg',
      head: 'Contact via WhatsApp',
      text: 'Call or message directly on WhatsApp to the worker you have selected — no delays, no third parties.',
    },
    {
      image: '/assets/work-done.jpg',
      head: 'Job Gets Done',
      text: 'The worker you choose comes and completes your job quickly and reliably.',
    },
    {
      image: '/assets/feedback.jpg',
      head: 'Give Feedback (Rate & Review)',
      text: 'After the job is done, leave feedback and a rating to help others get better service.',
    },
    {
      image: '/assets/disclaimer.jpg',
      head: 'Disclaimer (Important Notice)',
      text: 'Kazibase does not collect or receive payments. All payments are made directly between the client and the worker.',
    },
  ];

  return (
    <div className="container flex flex-col my-14 lg:my-28 overflow-hidden">
      <h3 className="text-3xl xl:text-4xl capitalize font-bold xl:mb-3 text-center" data-aos="fade-up">
        Get To Know <span className="text-sky-900">Kazi</span><span className="text-orange-500">base</span>
      </h3>

      <p className="text-md lg:text-xl font-normal tracking-wide text-center" data-aos="fade-up">
        We believe in a transparent and efficient environment for both worker and the employer to bring the best work solving mechanism.
        Here is how <span className="text-sky-900 font-semibold">Kazi</span><span className="text-orange-500 font-semibold">base</span> works:
      </p>

      {/* Steps 1–3 */}
      <div className="relative grid grid-cols-1 lg:grid-cols-[27%,9.5%,27%,9.5%,27%] items-center mt-14" data-aos="fade-right">
        {HP.slice(0, 3).map((step, index) => (
          <div key={index} className="contents">
            <div className="relative flex flex-row">
              <div className="bg-dullWhite grid grid-cols-[25%,75%] shadow-md z-10 relative rounded-2xl">
                <div className="p-4 bg-sky-900 flex items-center justify-center rounded-l-2xl">
                  <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-bold uppercase text-gray-100 tracking-wider text-center">
                    Step 0{index + 1}
                  </h3>
                </div>
                <div className="py-4 pl-2 pr-6 rounded-r-2xl border-2 border-sky-900">
                  <h3 className="font-bold text-lg">{step.head}</h3>
                  <p className="text-gray-600">{step.text}</p>
                </div>
              </div>
            </div>
            {index < 2 && (
              <Image
                className="my-5 mx-auto w-auto h-auto lg:-rotate-90 object-contain"
                src="/assets/icons/home/down.png"
                alt="Arrow to next step"
                width={50}
                height={100}
              />
            )}
          </div>
        ))}
      </div>

      {/* Arrow to next row */}
      <div className="relative grid grid-cols-1 lg:grid-cols-[27%,9.5%,27%,9.5%,27%] justify-start items-center mt-2" data-aos="fade-left">
        <div />
        <div />
        <div />
        <div />
        <div>
          <Image className="my-5 mx-auto lg:rotate-[50deg] object-contain" src="/assets/icons/home/down.png" alt="Arrow" width={50} height={100} />
        </div>
      </div>

      {/* Steps 4–5 */}
      <div className="relative grid grid-cols-1 lg:grid-cols-[17.25%,28%,9.5%,27%,18.25%] xl:grid-cols-[18.25%,27%,9.5%,27%,18.25%] items-center" data-aos="fade-left">
        <div />
        <div className="flex flex-row">
          <div className="bg-dullWhite grid grid-cols-[25%,75%] shadow-md z-10 relative rounded-2xl">
            <div className="p-4 bg-sky-900 flex items-center justify-center rounded-l-2xl">
              <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-bold uppercase text-gray-100 tracking-wider text-center">Step 04</h3>
            </div>
            <div className="py-4 px-2 rounded-r-2xl border-2 border-sky-900">
              <h3 className="font-bold text-lg">{HP[3].head}</h3>
              <p className="text-gray-600">{HP[3].text}</p>
            </div>
          </div>
        </div>
        <Image className="my-5 mx-auto lg:rotate-90 object-contain" src="/assets/icons/home/down.png" alt="Arrow" width={50} height={100} />
        <div className="flex flex-row">
          <div className="bg-dullWhite grid grid-cols-[25%,75%] shadow-md z-10 relative rounded-2xl">
            <div className="p-4 bg-sky-900 flex items-center justify-center rounded-l-2xl">
              <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-bold uppercase text-gray-100 tracking-wider text-center">Step 05</h3>
            </div>
            <div className="py-4 px-2 rounded-r-2xl border-2 border-sky-900">
              <h3 className="font-bold text-lg">{HP[4].head}</h3>
              <p className="text-gray-600">{HP[4].text}</p>
            </div>
          </div>
        </div>
        <div />
      </div>

      {/* Step 6 */}
      <div className="relative flex flex-col items-center mt-10" data-aos="fade-up">
        <Image className="mb-5 w-auto h-auto object-contain" src="/assets/icons/home/down.png" alt="Arrow" width={50} height={100} />
        <div className="bg-dullWhite grid grid-cols-[25%,75%] w-full max-w-3xl shadow-md z-10 rounded-2xl">
          <div className="p-4 bg-sky-900 flex items-center justify-center rounded-l-2xl">
            <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-bold uppercase text-gray-100 tracking-wider text-center">Step 06</h3>
          </div>
          <div className="py-4 px-2 rounded-r-2xl border-2 border-sky-900">
            <h3 className="font-bold text-lg">{HP[5].head}</h3>
            <p className="text-gray-600">{HP[5].text}</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center justify-center lg:grid gap-5 lg:grid-cols-[35%,65%] lg:items-start mt-6">
        <button
          onClick={() => setChildBtns(!childBtns)}
          className="relative text-md lg:text-lg text-orange-500 hover:text-sky-900 font-semibold inline-flex items-center gap-4 w-fit border hover:border border-x-transparent border-t-transparent hover:border-sky-900 hover:rounded-xl border-b-sky-900 px-2 lg:pl-2 lg:pr-1 transition duration-200 hover:scale-[1.1]"
        >
          Connect With Us (click) <ArrowRight className="w-5 hidden lg:block" />
        </button>
        <div className={`transition-all duration-500 relative ${childBtns ? 'flex' : 'hidden'} flex-col items-center lg:items-start lg:w-full`}>
          <Link
            href="/contact-us"
            className="text-md lg:text-lg text-sky-900 font-semibold inline-flex items-center gap-4 w-fit border border-sky-900 rounded-xl px-3 py-1 transition duration-200 hover:scale-[1.05]"
          >
            Get in Touch
          </Link>
          <Link
            href="/jobspage"
            className="text-md lg:text-lg text-gray-100 font-semibold inline-flex items-center gap-4 mt-4 w-fit border hover:border border-transparent hover:border-sky-900 rounded-xl bg-sky-900 px-3 py-1 transition duration-200 hover:scale-[1.1]"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
