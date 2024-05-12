'use client'

import React, { useContext, useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward, IoIosStar } from 'react-icons/io';
import { StudentContext } from '@/app/page'; // StudentContextのインポート

interface SidebarItemBetaProps {
  label: string;
}

const SidebarItemBeta: React.FC<SidebarItemBetaProps> = ({ label }) => {
  const students = useContext(StudentContext); // StudentContextからstudentsを取得
  const [isOpen, setIsOpen] = useState(false); // 項目が展開されているかどうかの状態
  const [selectedStudentIndex, setSelectedStudentIndex] = useState<number>(0); // 選択された学生のインデックスを管理

  const toggleItem = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.stopPropagation(); // ここでイベントの伝播を停止
    setSelectedStudentIndex(Number(event.target.value));
  };

  return (
    <li className="flex flex-col items-start py-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-200 ease-in-out shadow-sm" onClick={toggleItem}>
      <div className="flex items-center w-full text-gray-800">
        <IoIosStar className="text-yellow-500 mr-2 text-lg" />
        <span className="font-semibold">{label}</span>
        {isOpen ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
      </div>
      {isOpen && (
        <select
          value={selectedStudentIndex}
          onChange={handleSelectChange}
          onClick={(e) => e.stopPropagation()} // またはここでクリックイベントの伝播を停止
          className="mt-2 w-48 pl-4 bg-white border-2 border-gray-300 rounded-lg p-2 cursor-pointer text-gray-600 transition duration-150 ease-in-out"
        >
          <option value="">--- 生徒を選択 ---</option>
          {students && students.map((student, index) => (
            <option key={student.index} value={index}>
              {student.studentName || `生徒 ${index + 1}`}
            </option>
          ))}
        </select>
      )}
    </li>
  );
};

export default SidebarItemBeta;