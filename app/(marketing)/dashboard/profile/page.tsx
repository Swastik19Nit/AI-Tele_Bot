"use client"
import { getUserId } from "@/app/api/note/getNotes/route";
import { useSession } from "next-auth/react";

const profile=async ()=>{

    const { data: session, status: sessionStatus } = useSession();
    const email = session?.user?.email;
    // let user;
    // if(email){
    //     user=await getUserId(email);
    // }
    // console.log(email);
    return<>
    <div className="w-full h-full flex justify-center ">
        <div className="w-1/2 h-3/4 p-4 flex flex-col justify-evenly items-center bg-slate-600">
            <img className="h-72 w-64 object-cover object-top rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <div className="w-full ">Harshit Thakur</div>
        </div>
    </div>
    </>
}
export default profile;