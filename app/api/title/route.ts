    import Notes from "@/modals/Notes";
    import connect from "@/utils/db";
    import { NextResponse } from "next/server";

    export const POST = async (request: any) =>{
        try {
            const body = await request.json();
            await connect(); 
            const { noteId, newTitle } = body;
            console.log(noteId, newTitle);
    
            const result = await Notes.updateOne(
                { _id: noteId },
                { title: newTitle }
            ).exec();

            console.log(result);
    
            if (result.modifiedCount === 1) {
                return NextResponse.json({ message: 'Title updated successfully' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Note not found' }, { status: 404 });
            }
        } catch (error) {
            console.error('Error updating title:', error);
            return NextResponse.json({ message: 'Failed to update title' }, { status: 500 });
        }
    }
    