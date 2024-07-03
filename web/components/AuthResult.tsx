import { auth } from "@/auth";

const AuthResult = async () => {
    const session = await auth();
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold mb-4">AuthResult</div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}

export default AuthResult;

