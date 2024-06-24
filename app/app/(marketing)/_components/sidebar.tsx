"use client"
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
const Sidebar = () => {
  const BASE_URL = "/dashboard"
  return (
    <>
      <div className=" w-full md:w-44  flex md:flex-col p-3 items-center justify-between">
        <div className="flex w-96 md:w-full md:flex-col gap-2">
          <SidebarComponent text="Recent" url={BASE_URL + "/"} />
          <SidebarComponent text="Archive" url={BASE_URL + "/archive"} />
          <SidebarComponent text="Trash" url={BASE_URL + "/trash"} />
        </div>

        <Link href={BASE_URL + "/profile"}>
          <div className=" w-20 md:w-40 h-10 rounded-lg hover:cursor-pointer font-medium flex gap-x-2 items-center justify-center bg-[#D7D9DD] hover:text-gray-800 text-[#555558]">
            <CgProfile size={"1.4em"} />
            <div className="hidden md:block">
              UserName
            </div>
          </div>
        </Link>

      </div>
    </>
  );
}

const SidebarComponent = (props: { text: string, url: string }) => {
  return (
    <>
      <Link href={props.url}>
        <div className="w-full h-10 rounded-lg hover:cursor-pointer font-medium flex items-center justify-center
      bg-gray-200 hover:bg-gray-300 active:bg-gray-300 hover:text-gray-800 text-[#555558]">{props.text}</div>
      </Link>
    </>
  )
}

export default Sidebar;
