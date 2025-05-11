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
        [key: string]: string | number | undefined; // Allow for additional properties
    }

    interface ModalState {
        show: boolean;
        title: string;
        jobData?: JobData;
    }

    const [toast, setToast] = useState<ToastState>({ show: false, message: "", type: "" });
    const [modal, setModal] = useState<ModalState>({ show: false, title: "" });
    const [jobPosted, setJobPosted] = useState<JobData | null>(null);

    // Function to show toast message
    const showToast = (message: string, type: string): void => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: "", type: "" });
        }, 4000); // Hide after 4 seconds
    };

    // Function to show success modal
    const showSuccessModal = (title: string, jobData: JobData): void => {
        setJobPosted(jobData);
        setModal({ show: true, title, jobData });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Send data to the backend API
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
                // Show success modal instead of enhanced toast
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
        // Navigate to /jobspage route
        window.location.href = "/jobspage";
        setModal({ show: false, title: "" }); // Close modal
    };

    const viewInterestedWorkers = () => {
        // Navigate to /login route
        window.location.href = "/login";
        setModal({ show: false, title: "" }); // Close modal
    };

    const closeModal = () => {
        setModal({ show: false, title: "" });
    };

    return (
        <div className="container mx-auto max-w-xl px-4 py-8 relative">
            {/* Regular Toast notification */}
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
            
            {/* Success Modal - Separate from toast */}
            {modal.show && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
                    
                    {/* Modal */}
                    <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6 z-10 relative">
                        {/* Close button */}
                        <button 
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            ×
                        </button>
                        
                        {/* Modal content */}
                        <div className="text-center mb-6">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Posted Successfully!</h3>
                            <p className="text-sm text-gray-500">Your job has been posted successfully. What would you like to do next?</p>
                        </div>
                        
                        {/* Action buttons */}
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
                    <option value="construction">Construction Worker</option>
                    <option value="plumbing">Plumber</option>
                    <option value="electrical">Electrician</option>
                    <option value="carpentry">Carpenter</option>
                    <option value="painting">Painter</option>
                    <option value="cleaning">Cleaner</option>
                    <option value="gardening">Gardener</option>
                    <option value="driving">Driver</option>
                    <option value="delivery">Delivery Personnel</option>
                    <option value="mechanic">Mechanic</option>
                    <option value="cooking">Cook/Chef</option>
                    <option value="tailoring">Tailor</option>
                    <option value="welding">Welder</option>
                    <option value="hair_beauty">Hair & Beauty</option>
                    <option value="security">Security Guard</option>
                    <option value="farming">Farm Worker</option>
                    <option value="other">Other</option>
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

                <label className="block text-sm font-medium mb-1">WhatsApp Number (optional):</label>
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
