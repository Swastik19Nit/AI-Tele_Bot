"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email:any) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e:any) => {
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

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("Hi",res);

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex justify-center items-center min-h-screen mt-30">
        <div className="w-[1000px] h-[700px] flex items-center justify-center rounded-md  overflow-hidden outline-none">
          <div className="bg-[#ede0c8] flex items-center h-[500px] mt-10 w-[900px] justify-between rounded-md shadow-md p-8">
            <div className="w-1/2">
              <img
                src="/undraw_welcome_re_h3d9.svg"
                alt="Welcome"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-[40%]">
              <h1 className="text-4xl font-semibold mb-8 text-center">Login</h1>
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
                  Sign In
                </button>
                <p className="text-red-600 text-[16px] mt-2">{error && error}</p>
              </form>
              <button
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 mt-4"
                onClick={() => {
                  signIn("github");
                }}
              >
                Sign In with Github
              </button>
              <div className="text-center text-gray-500 mt-4">- OR -</div>
              <Link
                href="/register"
                className="block text-center text-blue-500 hover:underline mt-2"
              >
                Register Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
