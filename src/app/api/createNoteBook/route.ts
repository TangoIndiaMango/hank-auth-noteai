// api/createNoteBook

import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { generateImage, generateImagePropmt } from "@/lib/openai"
import { NextResponse } from "next/server"
import { cookies } from "next/headers";
import * as jose from "jose";
import { redirect } from "next/navigation";
// export const runtime = "edge";

export async function userID() {
    
    try {
        const token = cookies().get("hanko")?.value;
        const payload = jose.decodeJwt(token ?? "");
        // console.log(payload)
        return payload.sub;
    } catch (error) {
        console.log(error)
        redirect("/login")
    }
  }
  

export async function POST(req: Request) {
    const  userId  = await userID()
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
        userId: userId,
        imageUrl: image_url,
    }).returning({
        insertedId: $notes.id
    })

    return NextResponse.json({
        note_id: notes_ids[0].insertedId
    });
}
