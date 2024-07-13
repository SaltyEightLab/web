import { auth } from "@/auth";

const AuthResult = async () => {
    const session = await auth();
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold mb-4">AuthResult</div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <div>{process.env.AUTH_GITHUB_ID}</div>
            <div>{process.env.AUTH_GITHUB_SECRET}</div>
            <div>{process.env.AUTH_GOOGLE_ID}</div>
            <div>{process.env.AUTH_GOOGLE_SECRET}</div>
        </div>
    );
}

export default AuthResult;