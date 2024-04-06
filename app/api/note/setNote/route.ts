import Notes from "@/modals/Notes";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
async function toggleTrash(noteId: String) {
    try {
        const note = await Notes.findById(noteId).exec();
        note.trashed = !note.trashed;
        await note.save();
    } catch (err) {
        console.log("Error ", err);
    }
}

async function toggleArchived(noteId: String) {
    try {
        const note = await Notes.findById(noteId).exec();
        note.archived = !note.archived;
        await note.save();
    } catch (err) {
        console.log("Error ", err);
    }

}

export async function POST(request: any) {
    const body = await request.json();
    await connect();
    if (body) {
        console.log(body);
        const { noteId, method } = body;
        try {
            switch (method) {
                case "toggleTrash":
                    console.log(noteId);
                    await toggleTrash(noteId);
                    return getResponseInstance(200);
                case "toggleArchive":
                    await toggleArchived(noteId);
                    return getResponseInstance(200);
                case "toggleDel":
                    await Notes.findOneAndDelete({ _id: noteId }).exec();
                    return getResponseInstance(200);
                case "getNote":
                    const note = await Notes.findById(noteId).exec();
                    return new NextResponse(JSON.stringify({ note, message: "Success" }), {
                        status: 200,
                        headers: { "Content-Type": "application/json" }
                    });
                default:
                    return getResponseInstance(500);
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
}


function getResponseInstance(status: number) {
    let responseBody;
    if (status === 500)
        responseBody = JSON.stringify({ error: "Error in responding" });
    else if (status === 200)
        responseBody = JSON.stringify({ message: "Success" });
    return new NextResponse(responseBody, {
        status: status,
        headers: { "Content-Type": "application/json" }
    });
}