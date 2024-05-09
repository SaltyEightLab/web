'use client'

import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward, IoIosStar } from 'react-icons/io';

interface SidebarItemProps {
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="flex flex-col items-start py-2 hover:bg-gray-800 cursor-pointer rounded-lg transition-colors duration-200 ease-in-out" onClick={toggleItem}>
      <div className="flex items-center w-full text-white">
        <IoIosStar className="text-yellow-400 mr-2 text-lg" /> {/* 左端のアイコン */}
        <span className="font-medium">{label}</span>
        {isOpen ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />} {/* 右端のアイコン */}
      </div>
      {isOpen && (
        <ul className="mt-2 w-full pl-4 text-gray-300">
          {/* 展開された内容、ここに人物名などをリスト表示 */}
          <li>人物名1</li>
          <li>人物名2</li>
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;