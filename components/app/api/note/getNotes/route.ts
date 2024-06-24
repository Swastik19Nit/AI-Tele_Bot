import connect from "@/utils/db";
import Note from "@/modals/Notes";
import { NextResponse } from "next/server";
import User from "@/modals/User";

export async function getUserId(email: string) {
  try {
    const user = await User.where("email").equals(email)
      .select("_id")
      .exec();
    return user[0];

  } catch (err) {
    console.error('Error', err);
  }
}

export async function POST(request: any) {
  const body = await request.json();
  if (body) {
    const { email, method, title } = body;
    const userId = await getUserId(email);
    try {
      switch (method) {
        case "search": {
          const regex = new RegExp(title, 'i');
          const notes = await Note.find({ user_id: userId, title: { $regex: regex } });
          return getResponseInstance({ notes: notes }, 200, "Success");
        }
        case "getRecentNotes": {
          const notes = await Note.find({ user_id: userId, archived: false, trashed: false });
          return getResponseInstance({ notes: notes }, 200, "Success");
        }
        case "getArchivedNotes": {
          const notes = await Note.find({ user_id: userId, archived: true, trashed: false });
          return getResponseInstance({ notes: notes }, 200, "Success");
        }
        case "getTrashedNotes": {
          const notes = await Note.find({ user_id: userId, trashed: true });
          return getResponseInstance({ notes: notes }, 200, "Success");
        }
        default:
          return getResponseInstance({}, 500, "No method found");
      }
    } catch (err) {
      console.log("Error", err);
    }
  }
}


function getResponseInstance(data: any, status: number, message: String) {
  let responseBody;
  if (status === 500)
    responseBody = JSON.stringify({ error: message });
  else if (status === 200)
    responseBody = JSON.stringify({ data, message: message });
  return new NextResponse(responseBody, {
    status: status,
    headers: { "Content-Type": "application/json" }
  });
}