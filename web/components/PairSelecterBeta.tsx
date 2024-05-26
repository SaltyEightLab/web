"use client";

import React, { useContext, useState, useEffect } from "react";
import { StudentContext } from "@/app/page";

interface PairSelecterBetaProps {
  onRemove: () => void;
  label: string | null;
  onSelect: (student1: number, student2: number) => void;
  student1: number;
  student2: number;
}

const PairSelecterBeta: React.FC<PairSelecterBetaProps> = ({ onRemove, onSelect, student1, student2 }) => {
  const students = useContext(StudentContext); // StudentContextからstudentsを取得
  const [selectedStudentIndex, setSelectedStudentIndex] = useState<number>(student1);
  const [selectedPairIndex, setSelectedPairIndex] = useState<number>(student2);

  useEffect(() => {
    setSelectedStudentIndex(student1);
    setSelectedPairIndex(student2);
  }, [student1, student2]);
  
  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
    type: "student" | "pair"
  ) => {
    const value = Number(event.target.value);
    setter(value);
    onSelect(
      type === "student" ? value : selectedStudentIndex,
      type === "pair" ? value : selectedPairIndex
    );
  };
  
  if (!students) {
    return null; // studentsが存在しない場合は何も表示しない
  }
  
  return (
    <div className="flex justify-center space-x-4 mb-2">
      <div className="flex flex-col bg-blue-100 px-4 border border-gray-300 rounded-lg shadow-lg">
        <div className="flex items-center mt-2 mb-1">
          <select
            value={selectedStudentIndex}
            onChange={(e) => handleSelectChange(e, setSelectedStudentIndex, "student")}
            className="w-full pl-4 bg-white border border-gray-300 rounded-lg p-2 cursor-pointer text-gray-600 transition duration-150 ease-in-out"
          >
            <option value={-1} disabled>-- 生徒を選択 --</option>
            {students.map((student, index) => (
              <option key={student.index} value={index}>
                {student.studentName || `生徒 ${index + 1}`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center my-1 mb-2">
          <select
            value={selectedPairIndex}
            onChange={(e) => handleSelectChange(e, setSelectedPairIndex, "pair")}
            className="w-full pl-4 bg-white border border-gray-300 rounded-lg p-2 cursor-pointer text-gray-600 transition duration-150 ease-in-out"
          >
            <option value={-1} disabled>-- 生徒を選択 --</option>
            {students.map((student, index) => (
              <option key={student.index} value={index}>
                {student.studentName || `生徒 ${index + 1}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={onRemove}
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full shadow w-8 h-8 flex items-center justify-center"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default PairSelecterBeta;