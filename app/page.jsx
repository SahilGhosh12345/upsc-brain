// "use client"



// import { IntroNav } from '@/components/IntroNav';
// import { Button } from '@/components/ui/button'
// import { api } from '@/convex/_generated/api';
// import { useUser } from '@clerk/nextjs';
// import { useMutation } from 'convex/react'
// import Link from 'next/link'
// import { useEffect } from 'react';


// export default function Home() {
//   const {user} = useUser();
 
//   const createUser = useMutation(api.user.createUser);
  
//   const checkUser = async()=>{
//    const result= await createUser({
//      userName: user?.fullName,
//      email:user?.emailAddresses[0].emailAddress,
//      imageUrl:user?.imageUrl
//     }) 
//   }
 
//   useEffect(() => {
//     user && checkUser();
//   }, [user])
//   return (
//     <div className="min-h-screen flex flex-col">
//       <IntroNav/>
//       <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//         <div className="max-w-4xl mx-auto text-center text-white p-8">
//           <h1 className="text-5xl font-extrabold mb-6">Welcome to UPSC Prep AI</h1>
//           <p className="text-xl mb-12">
//             Your AI-powered companion for UPSC preparation. Personalized study plans, real-time exam simulations, intelligent document analysis, and performance tracking.
//           </p>
//           <div className="space-x-4">
//             <Button>
//             <Link href="/dashboard">Login</Link>
//             </Button>
//             <Button>
//               <Link href="/dashboard">Get Started</Link>
//             </Button>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }


"use client"
import { IntroNav } from '@/components/IntroNav'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedBackground } from '@/components/animated-background'
import { BorderBeam } from '@/components/ui/border-beam'
import SparklesText from "@/components/ui/sparkles-text"
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEffect } from 'react'




export default function Home() {
 const {user} = useUser();
 
 const createUser = useMutation(api.user.createUser);
 
 const checkUser = async()=>{
  const result= await createUser({
    userName: user?.fullName,
    email:user?.emailAddresses[0].emailAddress,
    imageUrl:user?.imageUrl
   }) 
 }

 useEffect(() => {
   user && checkUser();
 }, [user])
 
  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <IntroNav />
      <main className="flex-grow">
        <section className="py-20 px-6">
          <div className="max-w-[1200px] mx-auto text-center space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-sm mb-8 bg-white/5 backdrop-blur-sm">
              <span className="flex items-center gap-1.5" role="text">
                ✨ Introducing AI Learning Platform →
              </span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-[1.1]">
            Welcome to UPSC Brain AI, <span className="inline-block"><SparklesText sparklesCount={15} text={"prepare"} className="text-6xl sm:text-7xl md:text-8xl text-white/80" /></span> well.
             
            </h1>
           
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your AI-powered companion for UPSC preparation. Personalized study plans, real-time exam simulations, intelligent document analysis, and performance tracking.
              
            </p>
            <div className="flex justify-center mt-8">
              <Link href="/dashboard" aria-label="Get started with our learning platform">
                <Button 
                  size="lg" 
                  className="text-lg h-12 px-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  aria-label="Get started for free"
                >
                  Get Started for free
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-6 pb-20">
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
              <div className="relative z-10">
                <Image 
                  src="/dashboard.png" 
                  alt="AI Learning Platform Interface Preview" 
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto"
                />
                <BorderBeam borderWidth={3.5} size={250} duration={12} delay={9} />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 filter blur-3xl opacity-50 animate-pulse"></div>
          </div>
        </section>
      </main>
    </div>
  )
}


