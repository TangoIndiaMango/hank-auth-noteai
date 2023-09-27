import CreateNoteDialog from '@/components/CreateNoteDialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { $notes } from '@/lib/db/schema';
import { UserButton, auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';

type Props = {}

const DashBoardPage = async (props: Props) => {
    

    const { userId } = auth()
    if (!userId) {
        toast.error("Please Login Again")
        redirect("/")
        
    }
    const notes = await db.select().from($notes).where(eq($notes.userId, userId!))
    return (
        <div className="bg-slate-200 min-h-screen">
            <div className="max-w-7xl mx-auto p-10">
                <div className="h-14"></div>
                <div className='flex justify-between items-center md:flex-row flex-col'>
                    <div className='flex items-center'>
                        <Link href="/">
                            <Button className='bg-slate-700' size="sm">
                                <ArrowLeft className='mr-1 w-4 h-4' />Back</Button>
                        </Link>

                        <div className='w-4'></div>
                        <h1 className='text-3xl font-bold text-gray-800'>All Notes</h1>
                        <div className="w-4"></div>
                        <UserButton />
                    </div>
                </div>

                <div className="h-8"></div>

                <Separator />
                <div className="h-8"></div>
                {/* list all the notes */}
                {notes.length === 0 && (<div className="text-center">
                    <h2 className='text-xl text-gray-500'>No notes available currently...</h2>
                </div>)}


                {/* display notes */}
                <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                    <CreateNoteDialog />
                    {notes.map((note) => {
                        return (
                            <a href={`/notebook/${note.id}`} key={note.id}>
                                <div className='border border-stone-200 overflow-hidden rounded-lg flex flex-col hover:shadow-xl transition hover:-translate-y-1'>

                                    <Image src={note.imageUrl || ""} width={400} height={200} alt={note.name || ""} />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-gray-900">{note.name}</h3>
                                        <div className="h-1"></div>
                                        <p className='text-sm text-gray-500'>
                                            {new Date(note.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DashBoardPage;