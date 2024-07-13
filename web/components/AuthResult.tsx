import { auth } from "@/auth";

const AuthResult = async () => {
    const session = await auth();
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold mb-4">AuthResult</div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <div>{"GITHUB_ID: " + process.env.AUTH_GITHUB_ID}</div>
            <div>{"GITHUB_SECRET: " + process.env.AUTH_GITHUB_SECRET}</div>
            <div>{"GOOGLE_ID: " + process.env.AUTH_GOOGLE_ID}</div>
            <div>{"GOOGLE_SECRET: " + process.env.AUTH_GOOGLE_SECRET}</div>
            <div>{"AUTH_SECRET: " + process.env.AUTH_SECRET}</div>
            <div>{"AUTH_URL: " + process.env.AUTH_URL}</div>
        </div>
    );
}

export default AuthResult;