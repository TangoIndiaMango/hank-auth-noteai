import TypewriterTitle from '@/components/TypewriterTitle'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='bg-gradient-to-r min-h-screen from-slate-400 to-slate-700'>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className='font-semibold text-7xl text-center'> AI <span className='font-bold text-slate-300'>Note taking assistant</span></h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700"> <TypewriterTitle/> </h2>

        <div className="mt-8">  </div>
        <div className="flex justify-center">
        <Link href='/dashboard'>
          <Button className="bg-slate-400">
            Get Started <ArrowRight className='ml-2 w-5 h-5' strokeWidth={3}/>
          </Button>
        </Link>
        </div>
      </div>
    </div>
  )
}
