"use client";
import React from "react";
import { useSession } from "next-auth/react";

const SignUp = () => {
  const { data: session } = useSession();

  const registerUser = async () => {
    const email = session?.user?.email;
    const username = session?.user?.name;
    // ユーザーが存在しない場合、新規ユーザーを作成
    await fetch(`${process.env.NEXT_PUBLIC_USERDATA_SERVER}/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email }),
    });
    console.log("user created");
  };

  const handleSignUp = async () => {
    try {
      await registerUser();
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <button className="w-40 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring flex items-center justify-center" onClick={handleSignUp}>
      Sign Up
    </button>
  );
};

export default SignUp;
