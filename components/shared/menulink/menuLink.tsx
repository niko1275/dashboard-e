"use client"

import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'
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
import path from 'path';

interface MenuItem {
    title: string;
    path: string; // Asegúrate de que href siempre tenga un valor aquí
    icon: JSX.Element;
}
  
interface MenuLinkProps {
  item: MenuItem;
}  

const MenuLink = ({item}:MenuLinkProps) => {

  const pathname = usePathname()
  console.log(pathname)
  return (
    <>
        {/* {menuItems.map((link) => {

        return(
        
        <Link key={link.name} href={link.href } className={`flex h-[48px] grow items-center mb-2 justify-center gap-2 rounded-md text-white p-3 text-sm font-medium hover:bg-sky-100  md:flex-none md:justify-start md:p-2 md:px-3
        ${pathname === link.href ? 'bg-sky-100 text-blue-600 ': ''} `}>
            <p className='hidden md:block'>
                {link.name}
            </p>
        </Link>
        )
        })} */}
       <Link href={item.path} className={`text-white flex p-3 items-center gap-2 rounded ${pathname=== item.path && 'bg-slate-900' }`}>
          {item.icon}
          {item.title}
       </Link>
    </>
  )
}

export default MenuLink