"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostJobForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
            if (response.ok) {
                alert("Job posted successfully");
                router.push("/portal/dashboard"); // Navigate to dashboard
            } else {
                alert("Failed to post job");
            }
        } catch (error) {
            console.error("Error posting job:", error);
            alert("Failed to post job");
        }

        setLoading(false);
    };

    return (
        <div className="container mx-auto max-w-xl px-4 py-8">
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
