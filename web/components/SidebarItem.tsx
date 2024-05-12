"use client";

import React, { useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoIosStar } from "react-icons/io";
import { useSpring, animated } from "react-spring";
import { StudentContext } from "@/app/page"; // StudentContextのインポート
import { Switch } from "@headlessui/react"; // Headless UIのSwitchコンポーネントをインポート

interface SidebarItemProps {
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const students = useContext(StudentContext); // StudentContextからstudentsを取得
  const [toggles, setToggles] = useState<boolean[]>([]); // 各生徒のトグル状態を管理する配列

  const toggleItem = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle = (index: number, isChecked: boolean) => {
    const newToggles = [...toggles];
    newToggles[index] = isChecked;
    setToggles(newToggles);
  };

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
    <li
      className="flex flex-col items-start py-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-200 ease-in-out shadow-sm"
      onClick={toggleItem}
    >
      <div className="flex items-center w-full text-gray-800">
        <IoIosStar className="text-yellow-500 mr-2 text-lg" />
        <span className="font-semibold">{label}</span>
        {isOpen ? (
          <IoIosArrowDown className="ml-auto" />
        ) : (
          <IoIosArrowForward className="ml-auto" />
        )}
      </div>
      <animated.ul
        style={expandAnimation}
        className="mt-2 w-full pl-4 text-gray-600"
      >
        {students &&
          students.map((student, index) => (
            <li
              key={student.index}
              className="flex justify-between items-center mb-2"
              onClick={(event) => event.stopPropagation()} // ここでクリックイベントの伝播を停止
            >
              <span className="flex items-center">
                {student.studentName || `生徒${index + 1}`}
              </span>
              <Switch
                checked={toggles[index] || false}
                onChange={(isChecked) => handleToggle(index, isChecked)}
                className={`${
                  toggles[index] ? "bg-blue-500" : "bg-gray-200"
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              >
                <span
                  className={`${
                    toggles[index] ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </Switch>
            </li>
          ))}
      </animated.ul>
    </li>
  );
};

export default SidebarItem;
