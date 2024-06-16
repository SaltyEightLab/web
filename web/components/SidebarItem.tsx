"use client";

import React, { useContext, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoIosStar } from "react-icons/io";
import { useSpring } from "react-spring";
import { StudentContext } from "@/app/page"; // StudentContextのインポート

interface SidebarItemProps {
  label: string;
  onClick: () => void;  // onClick プロパティを追加
  isOpen: boolean;
  menuIcon: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, onClick, isOpen, menuIcon }) => {
  const students = useContext(StudentContext); // StudentContextからstudentsを取得

  const itemHeight = 32; // この値は実際のデザインに合わせて調整してください

  const expandAnimation = useSpring({
    from: { height: 0, opacity: 0, transform: "scaleY(0)" },
    to: {
      height: isOpen ? itemHeight * (students ? students.length : 0) : 0,
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? "scaleY(1)" : "scaleY(0)",
    },
  });

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