"use client";

import { useEffect, useState } from "react";

export default function Dashboard({ email }: { email: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/workerdash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        {data.availableJobs.map((job: any) => (
          <li key={job.id}>{job.title} - {job.budget} KES</li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl">Jobs You've Applied For</h2>
      <ul className="list-disc ml-6">
        {data.appliedJobs.map((job: any) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
}
