"use client";

import React, { useContext } from "react";
import { StudentContext } from "@/app/page";

const LogStudentsButton: React.FC = () => {
  const students = useContext(StudentContext);

  const logStudentsToConsole = () => {
    console.log(students);
  };

  return (
    <div className="pb-2 flex flex-col items-center justify-center bg-gray-100">
      <button onClick={logStudentsToConsole} className="px-4 py-1 mt-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring">
        Log Students
      </button>
    </div>
  );
};

export default LogStudentsButton;
