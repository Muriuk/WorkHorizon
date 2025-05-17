'use client'

import { usePathname } from 'next/navigation'
import MainHeader from '@/app/ui/header'
import Footer from '@/app/ui/footer'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Exclude layout for /portal and /workerjob paths
  const hideLayout = pathname.startsWith('/portal') || pathname.startsWith('/workerjob');

  return (
    <>
      {!hideLayout && <MainHeader />}
      <div className="bg-white">
        {children}
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}
