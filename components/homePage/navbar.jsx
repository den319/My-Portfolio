"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";




export default function Navbar() {

    const pathName = usePathname();


    return (
        <header className="header">
            <Link href={"/"}
                className="w-10 h-10 rounded-lg bg-white 
                    flex items-center justify-center font-bold shadow-md">
                <p className="blue-gradient_text">
                    DV
                </p>
            </Link>
            <nav className="flex text-lg gap-7 font-medium">
                <Link href={"/about"} className={pathName === "/about" ?  
                    "text-blue-500" : "text-black"}>
                    <p>
                        About
                    </p>
                </Link>
                <Link href={"/projects"} className={pathName === "/projects" ?
                    "text-blue-500" : "text-black"}>
                    <p>
                        Projects
                    </p>
                </Link>
            </nav>
        </header>
    )
}