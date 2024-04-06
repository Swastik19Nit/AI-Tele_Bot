import Notes from "@/modals/Notes";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: any) =>{
    try {
        const body = await request.json();
        await connect(); 
        const { noteId, newContent } = body;
        console.log(noteId, newContent);

        const result = await Notes.updateOne(
            { _id: noteId },
            { content: newContent },
        ).exec();

        console.log(result);

        if (result.modifiedCount === 1) {
            return NextResponse.json({ message: 'Content updated successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Note not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating content:', error);
        return NextResponse.json({ message: 'Failed to update content' }, { status: 500 });
    }
}