
import Image from "next/image";
import MenuLink from "./menulink/menuLink";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogoutButton } from "../auth/logout-button";
import { auth } from "@/auth"
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
  } from "react-icons/md";

const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Users",
          path: "/dashboard/users",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Products",
          path: "/dashboard/products",
          icon: <MdShoppingBag />,
        },
        {
          title: "Transactions",
          path: "/dashboard/transactions",
          icon: <MdAttachMoney />,
        },
      ],
    },
    {
      title: "Analytics",
      list: [
        {
          title: "Revenue",
          path: "/dashboard/revenue",
          icon: <MdWork />,
        },
        {
          title: "Reports",
          path: "/dashboard/reports",
          icon: <MdAnalytics />,
        },
        {
          title: "Teams",
          path: "/dashboard/teams",
          icon: <MdPeople />,
        },
      ],
    },
    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];

const Sidebar = async () => {
    const session = await auth()

  return (
    <div className=" w-full h-full flex-col px-3">
        <div className=" flex">
            <div className="flex items-center  mb-20 mt-10">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col ml-4 ">
                    <span className="font-medium text-white">
                        {session?.user?.name}
                    </span>
                    <span className="font-medium text-white">
                        Administrador
                    </span>
                </div>
            </div>
        </div>
        <ul className=''>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className='text-white font-bold text-xl'>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>

        <div>
            
            <LogoutButton >
                <button className="bg-red-400 rounded p-1 text-white mt-10 font-bold">
                    Cerrar sesion
                </button>
            </LogoutButton>
        </div>
    </div>
  );
};

export default Sidebar;
