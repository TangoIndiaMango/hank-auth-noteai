"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Hanko } from "@teamhanko/hanko-elements";
import { hankoApi } from "./Login";
import { LogOut } from "lucide-react";


export const Logout = () => {
    const router = useRouter();
    const [hanko, setHanko] = useState<Hanko>();

    useEffect(() => {
        import("@teamhanko/hanko-elements").then(({ Hanko }: any) =>
            setHanko(new Hanko(hankoApi))
        );
    }, []);

    const logout = () => { hanko?.user.logout().then(() => {
                router.push("/");
                router.refresh();
                return;
            })
            .catch((error: any) => {
                console.log(error);
            });
    };
    return (
        <>
            <button type="button" onClick={logout}><LogOut className="w-10 h-8 bg-slate-300 rounded-md shadow-md" /></button>
        </>
    );
};