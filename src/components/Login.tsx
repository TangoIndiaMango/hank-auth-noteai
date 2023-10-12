"use client"

import { register, Hanko } from '@teamhanko/hanko-elements';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const hankoApi: string = process.env.NEXT_PUBLIC_HANKO_API_URL!;

const Login = () => {
    const router = useRouter();

    const [hanko, setHanko] = useState<Hanko>();

    useEffect(() => {
        import("@teamhanko/hanko-elements").then(({ Hanko }) =>
            setHanko(new Hanko(hankoApi))
        );
    }, []);

    const redirectAfterLogin = useCallback(() => {
        // successfully logged in, redirect to a page in your application
        router.replace("/dashboard");
    }, [router]);

    useEffect(
        () =>
            hanko?.onAuthFlowCompleted(() => {
                redirectAfterLogin();
            }),
        [hanko, redirectAfterLogin]
    );

    useEffect(() => {
        register(hankoApi).catch((error) => {
            console.log(error)
        });
    }, []);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white p-5 rounded-2xl shadow-lg">
                <hanko-auth />
            </div>
        </div>
    );
};

export default Login;


