import SideBar from "@/components/Dashboard/SideBar";
import { ReactNode } from "react";

export default function Layout({children}:{children:ReactNode}){
    return(
        <>
        <div className="flex h-screen bg-gray-950 text-white">
            <SideBar/>
            <div className="flex-1 hidden md:block">{children}</div>
        </div>
        </>
    )
}