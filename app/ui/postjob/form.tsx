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

                        <div className="text-center mb-6">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Posted Successfully!</h3>
                            <p className="text-sm text-gray-500">
                                Job title: <strong>{modal.jobData?.title?.toString().replace(/_/g, " ")}</strong>
                            </p>
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

            <h2 className="text-2xl font-semibold text-sky-900 mb-6 text-center border-b pb-2 border-orange-500">Post a Job</h2>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            required
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="county" className="block text-sm font-medium text-gray-700">County</label>
                        <input
                            type="text"
                            id="county"
                            name="county"
                            required
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="number_of_workers" className="block text-sm font-medium text-gray-700">Number of Workers</label>
                        <input
                            type="number"
                            id="number_of_workers"
                            name="number_of_workers"
                            required
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Preferred Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            required
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="any">Any</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (e.g. 1 week, 2 days)</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            required
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
                        <input
                            type="number"
                            id="budget"
                            name="budget"
                            required
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                        <input
                            type="tel"
                            id="whatsapp"
                            name="whatsapp"
                            required
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className={`mt-4 w-full py-2 px-4 ${loading ? "bg-gray-300" : "bg-sky-900"} text-white rounded font-medium`}
                            disabled={loading}
                        >
                            {loading ? "Posting..." : "Post Job"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
