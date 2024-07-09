"use client";

import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface GetRecordOnSidebarProps {
  isOpen: boolean;
  onClick: () => void;
}

const GetRecordOnSidebar: React.FC<GetRecordOnSidebarProps> = ({isOpen, onClick}) => {
  return (
      <div onClick={onClick} className={`flex items-center my-2 py-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-200 ease-in-out shadow-sm z-50 ${isOpen ? "bg-teal-100" : "bg-white"}`}>
        <img src="/menuIcon/rireki.png" alt="Menu Icon" className="ml-2 mr-3 w-7 h-6" />
        <span>履歴から復元</span>
        {isOpen ? <IoIosArrowBack className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
      </div>
  );
};

export default GetRecordOnSidebar;
