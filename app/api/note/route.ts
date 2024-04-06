import connect from "@/utils/db";
import Note from "@/modals/Notes";
import { NextResponse } from "next/server";
import { getUserId } from "./getNotes/route";
import { generateImage } from "@/lib/openai";
import { uploadImageToFirebase } from "@/lib/storage";

export async function POST(request: any) {
  await connect();
  try {
    const { email, title, reminderDate, reminderTime } = await request.json();
    const imageUrl = await generateImage(title);
    const user_id = await getUserId(email);
    const remindDateTime = reminderDate && reminderTime ? new Date(`${reminderDate}T${reminderTime}`) : null;
    console.log(remindDateTime);

    if (imageUrl) {
      const imageBlob = await fetch(imageUrl).then((res) => res.blob());
      const imageFile = new File([imageBlob], `${title}.png`, { type: "image/png" });
      const firebaseImageUrl = await uploadImageToFirebase(imageFile, title);

     await Note.create({
        title: title,
        content: "NEW NOTE",
        user_id: user_id,
        created_date: new Date(),
        updated_date: new Date(),
        remind_date: new Date(),
        imageUrl: firebaseImageUrl,
        
      });
      // await newNote.save();

      const responseBody = JSON.stringify({ message: "Note created successfully" });
      const headers = { "Content-Type": "application/json" };
      return new NextResponse(responseBody, { status: 200, headers });
    } else {
      const responseBody = JSON.stringify({ error: "Failed to generate image" });
      const headers = { "Content-Type": "application/json" };
      return new NextResponse(responseBody, { status: 500, headers });
    }
  } catch (error) {
    console.error("Error creating new note:", error);
    const responseBody = JSON.stringify({ error: "Internal Server Error" });
    const headers = { "Content-Type": "application/json" };
    return new NextResponse(responseBody, { status: 500, headers });
  }
}

export async function DELETE(request: any) {
  await connect();
  try {
    const { id } = await request.json();
    console.log(id);
    const deletednote = await Note.findByIdAndDelete(id);
    console.log(deletednote);
    if (!deletednote) {
      return new NextResponse(
        JSON.stringify({ error: "No notes found for the user" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const responseBody = JSON.stringify({ message: "Note deleted successfully" });
    const headers = {
      "Content-Type": "application/json",
    };
    return new NextResponse(responseBody, { status: 200, headers });
  } catch (error) {
    console.error("Error deleting notes:", error);
    const responseBody = JSON.stringify({ error: "Internal Server Error" });
    const headers = {
      "Content-Type": "application/json",
    };
    return new NextResponse(responseBody, { status: 500, headers });
  }
}