"use client";

import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface SidebarItemProps {
  label: string;
  onClick: () => void;  // onClick プロパティを追加
  isOpen: boolean;
  menuIcon: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, onClick, isOpen, menuIcon }) => {

  return (
    <li className={`flex flex-col items-start my-2 py-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-200 ease-in-out shadow-sm z-50 ${isOpen ? "bg-teal-100" : "bg-white"}`} >
      <div
        className="flex items-center w-full text-gray-800"
        onClick={onClick}
      >
        <img src={menuIcon} alt="Menu Icon" className="mx-2 w-8 h-6" />
        <span>{label}</span>
        {isOpen ? (
          <IoIosArrowBack className="ml-auto" />
        ) : (
          <IoIosArrowForward className="ml-auto" />
        )}
      </div>
    </li>
  );
};

export default SidebarItem;