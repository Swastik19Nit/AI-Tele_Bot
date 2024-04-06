"use client"
import Link from 'next/link'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e:any) => {
        const isValidEmail = (email:any) => {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return emailRegex.test(email);
        };

        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        if (!password || password.length < 8) {
            setError("Password is invalid");
            return;
        }

        try{
            const res= await fetch("/api/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            if (res.status === 400) {
                setError("This email is already registered");
              }
              if (res.status === 200) {
                setError("");
                router.push("/login");
              }
            } catch (error) {
              setError("Error, try again");
              console.log(error);
            }
          };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className=" w-[1000px] h-[700px] flex items-center justify-center rounded-md overflow-hidden">
                <div className="bg-[#ede0c8] flex items-center h-[500px] w-[900px] justify-between rounded-md shadow-md p-8">
                    <div className="w-1/2">
                        <img
                            src="/undraw_welcome_re_h3d9.svg"
                            alt="Welcome"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="w-[40%]">
                        <h1 className="text-4xl font-semibold mb-8 text-center">Register</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Register
                            </button>
                            <p className="text-red-600 text-[16px] mt-2">{error && error}</p>
                        </form>
                        <div className="text-center text-gray-500 mt-4">- OR -</div>
                        <Link
                            href="/login"
                            className="block text-center text-blue-500 hover:underline mt-2"
                        >
                            Login with an existing account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
