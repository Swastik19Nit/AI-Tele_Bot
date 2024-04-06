// "use client"
// import Link from "next/link";
// import { CgProfile } from "react-icons/cg";
// const Sidebar = () => {
//   const BASE_URL = "/dashboard"
//   return (
//     <>
//       <div className="w-full md:w-72 flex md:flex-col p-3 items-center justify-between bg-green-800">
//         <div className="flex w-96 md:w-full md:flex-col gap-2">
//           <SidebarComponent text="Recent" url={BASE_URL + "/"} />
//           <SidebarComponent text="Archive" url={BASE_URL + "/archive"} />
//           <SidebarComponent text="Trash" url={BASE_URL + "/trash"} />
//         </div>

//         <Link href={BASE_URL + "/profile"}>
//           <div className="w-20 md:w-40 h-10 rounded-lg hover:cursor-pointer font-medium flex gap-x-2 items-center justify-center bg-[#D7D9DD] hover:text-gray-800 text-[#555558]">
//             <CgProfile size={"1.4em"} />
//             <div className="hidden md:block">UserName</div>
//           </div>
//         </Link>
//       </div>
//     </>
//   );
// }

// const SidebarComponent = (props: { text: string, url: string }) => {
//   return (
//     <>
//       <Link href={props.url}>
//         <div className="w-full h-10 rounded-lg hover:cursor-pointer font-medium flex items-center justify-center
//       bg-gray-200 hover:bg-gray-300 active:bg-gray-300 hover:text-gray-800 text-[#555558]">{props.text}</div>
//       </Link>
//     </>
//   )
// }

// export default Sidebar;
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { RiHomeLine } from "react-icons/ri";
import { CgTrashEmpty } from "react-icons/cg";
import { IoArchiveOutline } from "react-icons/io5";
const Sidebar = () => {
  const BASE_URL = "/dashboard"
  return (
    <>
      <div className=" w-full md:w-56 bg-[#004C42] flex md:flex-col p-3 items-center justify-between">
        <div className="flex w-96 md:w-full md:flex-col gap-2">
          <SidebarComponent text="Recent" url={BASE_URL} />
          <SidebarComponent text="Archive" url={BASE_URL + "/archive"} />
          <SidebarComponent text="Trash" url={BASE_URL + "/trash"} />
        </div>

        <Link href={BASE_URL + "/profile"}>
          <div className=" w-20 md:w-40 h-10 rounded-lg hover:cursor-pointer font-medium flex gap-x-2 items-center justify-center bg-[#003A33] text-slate-200">
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

const SidebarComponent = (props: {
  text: string,
  url: string
}) => {
  const route = usePathname();
  return (
    <>
      <Link href={props.url}>
        <div className={`w-full h-10 rounded-[18px] p-4  hover:cursor-pointer  flex items-center
      gap-x-2 text-slate-200`}>
        {"Recent"==props.text&&<RiHomeLine size={"1.5em"} className={`${props.url==route?"text-[#D9F47B]":"text-slate-200"}`} />}
        {"Archive"==props.text&&<IoArchiveOutline size={"1.5em"} className={`${props.url==route?"text-[#D9F47B]":"text-slate-200"}`} />}
        {"Trash"==props.text&&<CgTrashEmpty size={"1.5em"} className={`${props.url==route?"text-[#D9F47B]":"text-slate-200"}`} />}
        <span className=" text-md">{props.text}</span>
      </div>
    </Link >
    </>
  )
}
// 
export default Sidebar;
