"use client";
import { usePathname } from "next/navigation";

import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full bg-slate-800 justify-between p-5  rounded-xl text-white"  >
      <div className="" >{pathname.split("/").pop()}</div>
      <div className="flex items-center ">
        <div className="flex items-center gap-10 bg-gray-400 p-2 rounded-lg">
          <MdSearch />
          <input type="text" placeholder="Search..." className="bg-transparent text-gray-800 focus:outline-none"/>
        </div>
        <div className="flex gap-4 ml-4">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
