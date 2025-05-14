'use client'
import { signOut } from "next-auth/react"

export default function PortalHeader() {
  return (
    <div className='flex justify-start items-center gap-7'>
      <button 
        onClick={() => signOut({ callbackUrl: '/portal' })} 
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
      >
        Sign Out
      </button>
    </div>
  )
}
