// api/createNoteBook

import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { generateImage, generateImagePropmt } from "@/lib/openai"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST(req: NextResponse) {
    const { userId } = auth()
    if (!userId) {
        return new NextResponse("unauthorized", { status: 401 })
    }
    const body = await req.json()
    const { name } = body;
    console.log(name)
    const image_description = await generateImagePropmt(name);

    console.log({ image_description })
    if (!image_description) {
        return new NextResponse('failed to generate image description', { status: 500 })
    }

    const image_url = await generateImage(image_description)
    if (!image_url) {
        return new NextResponse('failed to generate image', { status: 500 })
    }

    const notes_ids = await db.insert($notes).values({
        name,
        userId,
        imageUrl: image_url,
    }).returning({
        insertedId: $notes.id
    })

    return NextResponse.json({
        note_id: notes_ids[0].insertedId
    });
}
