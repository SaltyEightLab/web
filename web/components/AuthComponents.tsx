import React from "react";
import { signIn, signOut } from "@/auth";

export const SignIn = ({ provider, label, ...props }: { provider?: string; label?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <form action={async () => {
        "use server";
        await signIn(provider);
    }} className="w-48">
      <button className={`w-full p-2 text-white rounded hover:transition-colors ${label === "Google" ? "bg-blue-500 hover:bg-blue-600" : label === "GitHub" ? "bg-green-500 hover:bg-green-600" : ""}`} {...props}>{label + "でサインイン"}</button>
    </form>
  );
};

export const SignOut = ({ provider, ...props }: { provider?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <form action={async () => {
            "use server";
            await signOut();
        }} className="w-full">
          <button className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors" {...props}>ログアウト</button>
        </form>
      );
};