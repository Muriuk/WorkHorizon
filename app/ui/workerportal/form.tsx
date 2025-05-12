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

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/workerdash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      setData(result);
    }

    fetchData();
  }, [email]);

  if (!data) return <div>Loading...</div>;

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
