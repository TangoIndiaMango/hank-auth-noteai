import { $notes } from '@/lib/db/schema';
import { db } from "@/lib/db"
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { uploadFileToFirebase } from '@/lib/firebase';

export async function POST(req:Request){
    try {
        const {noteId} = await req.json()
        // extract imageurl
        const note = await db.select().from($notes).where(eq($notes.id, parseInt(noteId)))
        if (!note[0].imageUrl) {
            return new NextResponse("No image Url returned", {status: 400})
        }
        // save to firebase

        const firebase_url = await uploadFileToFirebase(note[0].imageUrl, note[0].name)
        await db.update($notes).set({
            imageUrl: firebase_url,
        }).where(eq($notes.id, parseInt(noteId)))
        return new NextResponse('ok', {status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse('error', {status:500})
    }
}