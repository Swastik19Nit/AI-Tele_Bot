"use client"
import { useScrolltop } from "@/hooks/scroll";
import Link from "next/link";
import { FaPencilAlt } from 'react-icons/fa';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { data: session } = useSession();
    const scrolled = useScrolltop();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false }); 
        router.push('/');
    };

    return (
        <div className={`z-50 bg-background fixed top-0 flex items-center w-full p-6 ${scrolled ? "border-b shadow-sm" : ""}`}>
            <FaPencilAlt
            size={"2em"}
            className="cursor-pointer"
          />
            <div className="md:ml-auto justify-end  w-full flex items-center gap-x-2">
                {!session ? (
                    <Link href="/login">
                        Login
                    </Link>
                ) : (
                    <button onClick={handleSignOut}>Logout</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
