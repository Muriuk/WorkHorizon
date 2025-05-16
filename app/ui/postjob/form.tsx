"use client";

import { useState } from "react";

export default function PostJobForm() {
  const [loading, setLoading] = useState(false);

  interface ToastState {
    show: boolean;
    message: string;
    type: string;
  }

  interface JobData {
    client_name?: string;
    title?: string;
    description?: string;
    county?: string;
    number_of_workers?: number | string;
    gender?: string;
    duration?: string;
    budget?: number | string;
    phone?: string;
    whatsapp?: string;
    id?: string;
    [key: string]: string | number | undefined;
  }

  interface ModalState {
    show: boolean;
    title: string;
    jobData?: JobData;
  }

  const [toast, setToast] = useState<ToastState>({ show: false, message: "", type: "" });
  const [modal, setModal] = useState<ModalState>({ show: false, title: "" });

  const showToast = (message: string, type: string): void => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 4000);
  };

  const showSuccessModal = (title: string, jobData: JobData): void => {
    setModal({ show: true, title, jobData });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/postJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        showToast("Job posted successfully", "success");
        showSuccessModal("Success!", result.job || data);
      } else {
        showToast("Failed to post job", "error");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      showToast("Failed to post job", "error");
    }

    setLoading(false);
  };

  const viewJobDetails = () => {
    window.location.href = "/jobspage";
    setModal({ show: false, title: "" });
  };

  const viewInterestedWorkers = () => {
    window.location.href = "/login";
    setModal({ show: false, title: "" });
  };

  const closeModal = () => {
    setModal({ show: false, title: "" });
  };

  return (
    <div className="container mx-auto max-w-xl px-4 py-8 relative">
      {toast.show && (
        <div
          className={`fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-4 rounded-lg shadow-lg transition-all duration-300 z-40
                ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          <div className="flex items-center justify-between">
            <span>{toast.message}</span>
            <button
              onClick={() => setToast({ show: false, message: "", type: "" })}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

     {modal.show && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
    <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6 z-10 relative">
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
      
      {/* Safety Disclaimer */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="text-sm font-semibold text-yellow-800 mb-2">⚠️ Important Safety Notice</h4>
        <p className="text-xs text-yellow-700 leading-relaxed">
  Thank you for posting your job with Kazibase. To ensure your safety and that of our workers, please make sure the worker you select presents their original national ID card upon arrival. This is to verify their identity by matching their face to the ID. If this step is skipped, Kazibase will not be responsible for any cases of fraud or theft.

  Please note that communication and supervision are entirely your responsibility. Kazibase does not moderate interactions between you and the worker.

  All payments must be made directly to the worker—Kazibase does not handle or process any transactions.

  Thank you for understanding and supporting our privacy and safety measures.
</p>

      </div>
      
      <div className="text-center mb-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Posted Successfully!</h3>
        <p className="text-sm text-gray-500">Your job has been posted successfully. What would you like to do next?</p>
      </div>
      <div className="flex flex-col space-y-3">
        <button
          onClick={viewJobDetails}
          className="w-full py-2 px-4 bg-sky-900 hover:bg-sky-800 text-white rounded font-medium"
        >
          View Posted Job
        </button>
        <button
          onClick={viewInterestedWorkers}
          className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded font-medium"
        >
          Login to See Interested Workers
        </button>
      </div>
    </div>
  </div>
)}
      <h2 className="text-2xl font-semibold text-sky-900 mb-6 text-center border-b pb-2 border-orange-500">Post your Job</h2>
<div className="border border-yellow-500 bg-yellow-50 text-red-700 p-3 rounded-md mb-4 text-sm sm:text-base text-center">
  Please fill in all your details carefully. After submitting, take a moment to review our privacy notice and confirm that your job has been posted by checking the <span className="font-semibold text-sky-900">Jobs View</span> page.
</div>
 <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-sm font-medium mb-1">Your Name:</label>
        <input
          name="client_name"
          required
          className="w-full bg-gray-200 px-3 py-2 rounded-lg mb-4 shadow"
          placeholder="Your full name"
        />

        <label className="block text-sm font-medium mb-1">Job Category / Title:</label>
        <select
          name="title"
          required
          className="w-full bg-gray-200 px-3 py-2 rounded-lg mb-4 shadow"
        >
          <option value="">-- Select job category --</option>
          {[
            "Construction Worker", "Plumber", "Electrician", "Carpenter", "Painter",
            "Cleaner", "Gardener", "Driver", "Delivery Personnel", "Mechanic",
            "Cook/Chef", "Tailor", "Welder", "Hair & Beauty", "Security Guard",
            "Farm Worker", "Other"
          ].map((title) => (
            <option key={title} value={title.toLowerCase().replace(/ /g, "_")}>{title}</option>
          ))}
        </select>

        <label className="block text-sm font-medium mb-1">Job Description:</label>
        <textarea
          name="description"
          required
          rows={4}
          className="w-full bg-gray-200 px-3 py-2 rounded-lg mb-4 shadow"
          placeholder="Describe the job clearly..."
        ></textarea>

        <label className="block text-sm font-medium mb-1">Preferred County:</label>
        <select
          name="county"
          required
          className="w-full bg-gray-200 px-3 py-2 rounded-lg mb-4 shadow"
        >
          <option value="">-- Select county --</option>
          {[
            "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay",
            "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii",
            "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera",
            "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
            "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River",
            "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
          ].map((county) => (
            <option key={county} value={county.toLowerCase()}>{county}</option>
          ))}
        </select>

        <label className="block text-sm font-medium mb-1">How Many People Do You Need?</label>
        <select
          name="number_of_workers"
          required
          className="w-full bg-gray-200 px-3 py-2 rounded-lg mb-4 shadow"
        >
          <option value="">-- Select number --</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>

        <label className="block text-sm font-medium mb-1">Preferred Gender:</label>
        <select
          name="gender"
          required
          className="w-full bg-gray-200 px-3 py-2 rounded-lg mb-4 shadow"
        >
          <option value="">-- Select gender preference --</option>
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label className="block text-sm font-medium mb-1">How Long Will the Job Take?</label>
        <input
          name="duration"
          required
          className="w-full bg-gray-200 px-3 py-2 rounded-lg mb-4 shadow"
          placeholder="e.g. 3 days, 2 weeks"
        />

        <label className="block text-sm font-medium mb-1">Proposed Budget (Ksh):</label>
        <input
          type="number"
          name="budget"
          required
          className="w-full bg-gray-200 px-3 py-2 rounded-lg mb-4 shadow"
          placeholder="e.g. 5000"
        />

        <label className="block text-sm font-medium mb-1">Your Phone Number:</label>
        <input
          type="tel"
          name="phone"
          pattern="[0-9]{10}"
          required
          className="w-full bg-gray-200 px-3 py-2 rounded-lg mb-4 shadow"
          placeholder="07XXXXXXXX"
        />

        <label className="block text-sm font-medium mb-1">WhatsApp Number:</label>
        <input
          type="tel"
          name="whatsapp"
          pattern="[0-9]{10}"
          className="w-full bg-gray-200 px-3 py-2 rounded-lg mb-4 shadow"
          placeholder="07XXXXXXXX"
        />

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-sky-900 hover:bg-sky-800'}`}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
