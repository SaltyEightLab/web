import React from "react";

const ProtectedPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)] bg-gray-100">
            <h1 className="text-xl font-semibold text-gray-800">Protected Page</h1>
            <a href="http://localhost:3000" className="text-blue-500 hover:text-blue-700 transition-colors">ホームに戻る</a>
        </div>
    );
}

export default ProtectedPage;

