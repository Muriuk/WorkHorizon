"use client";

import { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  budget?: number;
};

type DashboardData = {
  name: string;
  county: string;
  greeting: string;
  availableJobs: Job[];
  appliedJobs: Job[];
};

export default function Dashboard({ email }: { email: string }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch("/api/workerdash", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred while fetching data");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [email]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">
        {data.greeting}, {data.name} 👋
      </h1>

      <h2 className="mt-6 text-xl">Available Jobs in {data.county}</h2>
      <ul className="list-disc ml-6">
        {data.availableJobs.map((job) => (
          <li key={job.id}>
            {job.title} - {job.budget ?? "N/A"} KES
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl">Jobs You&apos;ve Applied For</h2>
      <ul className="list-disc ml-6">
        {data.appliedJobs.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
}
