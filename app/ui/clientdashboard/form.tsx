import React, { useEffect, useState } from 'react';

interface ClientInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: {
    county: string;
    subcounty: string;
    area: string;
  };
}

export default function ClientDashboard() {
  const [client, setClient] = useState<ClientInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClientProfile() {
      try {
        const res = await fetch('/api/client/me'); // You need to implement this API route
        const data = await res.json();
        if (data.success) {
          setClient(data.user);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching client profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchClientProfile();
  }, []);

  if (loading) return <p>Loading client profile...</p>;
  if (!client) return <p>Unable to load client data.</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Client Dashboard</h2>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Name:</strong> {client.name}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>County:</strong> {client.location.county}</p>
        <p><strong>Subcounty:</strong> {client.location.subcounty}</p>
        <p><strong>Area:</strong> {client.location.area}</p>
      </div>
    </div>
  );
}
