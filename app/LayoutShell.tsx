// app/LayoutShell.tsx
'use client'

import { usePathname } from 'next/navigation'
import MainHeader from '@/app/ui/header'
import Footer from '@/app/ui/footer'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith('/portal');

  return (
    <>
      {!isPortal && <MainHeader />}
      <div className="bg-white">
        {children}
      </div>
      {!isPortal && <Footer />}
    </>
  );
}
