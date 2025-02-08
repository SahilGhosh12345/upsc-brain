"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { UserButton, useUser } from '@clerk/nextjs'

export function IntroNav() {
  const { user } = useUser();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/50 backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-semibold text-white">
        UPSC Brain
        </Link>
      </div>
      <div className="flex items-center space-x-4">
      <ModeToggle />
        {user ?
        (<Link href="/dashboard">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
            Dashboard
          </Button>
          
        </Link>
        
        
        )
        :
        (<Link href="/sign-in">
          <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 transition-colors duration-300">
            Sign-in
          </Button>
        </Link>)
        }
        {user &&  <UserButton/>}
        
        
      </div>
    </nav>
  )
}
