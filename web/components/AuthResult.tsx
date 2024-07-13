import { auth } from "@/auth";
import { useEffect } from "react";

const AuthResult = async () => {
    
    useEffect(() => {
        console.log("GITHUB_ID:", process.env.AUTH_GITHUB_ID);
        console.log("GITHUB_SECRET:", process.env.AUTH_GITHUB_SECRET);
        console.log("GOOGLE_ID:", process.env.AUTH_GOOGLE_ID);
        console.log("GOOGLE_SECRET:", process.env.AUTH_GOOGLE_SECRET);
        console.log("AUTH_SECRET:", process.env.AUTH_SECRET);
        console.log("AUTH_URL:", process.env.AUTH_URL);
    }, []);

    const session = await auth();
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold mb-4">AuthResult</div>
            <pre>{JSON.stringify(session, null, 2)}</pre>

        </div>
    );
}

export default AuthResult;