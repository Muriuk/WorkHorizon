'use client'
import { User } from '@/app/lib/elements';
import DashboardBody from '@/app/ui/portal/dashboard';
import { useEffect, useState } from 'react';

export default function DashboardMainBody() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const mockUser: User = {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin User',
            gender: 'Male',
            post: 'Developer',
        };

        setUser(mockUser);
    }, []);

    return <DashboardBody user={user} />;
}
