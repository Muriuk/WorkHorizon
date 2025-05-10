'use client'
import { User } from '@/app/lib/elements';
import DashboardBody from '@/app/ui/portal/dashboard';
import { useEffect, useState } from 'react';

export default function DashboardMainBody() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Mock the user for development purposes
        const mockUser = {
            id: 1,
            email: 'admin@example.com',
            full_name: 'Admin User',
            role: 'admin',
            created_at: '2025-05-10T00:00:00Z',
            updated_at: '2025-05-10T00:00:00Z',
            name: 'Admin User',  // Added missing property
            gender: 'Male',      // Added missing property
            post: 'Developer',   // Added missing property
        };

        setUser(mockUser);  // Directly set the mock user
    },[])

    return (
        <DashboardBody user={user} />
    )
}
