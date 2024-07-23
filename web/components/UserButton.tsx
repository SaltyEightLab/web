import React from "react";
import { SignIn, SignOut } from "./AuthComponents";
import { auth } from "@/auth";

const UserButton: React.FC = async () => {
    const session = await auth();

    if (!session) {
        return (
            <div className="flex space-x-4">
                {/* <SignIn provider="github" label="GitHub" /> */}
                <SignIn provider="google" label="Google"/> 
            </div>
        );
    }

    if (!session.user) {
        return <div>ユーザー情報がありません</div>;
    }

    return (
        <div className="relative group flex items-center space-x-4">
            {session.user.image && (
                <img
                    src={session.user.image}
                    alt={session.user.name ?? ""}
                    className="w-8 h-8 rounded-full"
                />
            )}
            <SignOut />
            <div className="absolute top-full mt-2 p-2 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2 space-y-2">
                <div className="text-sm font-bold">{session.user.name}</div>
                <div className="text-xs">{session.user.email}</div>
            </div>
        </div>
    );
};

export default UserButton;