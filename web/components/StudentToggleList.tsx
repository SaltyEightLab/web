"use client";

import React, { useContext, useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { useSpring, animated } from "react-spring";
import { StudentContext } from "@/app/page";
import { Switch } from "@headlessui/react";

interface StudentToggleListProps {
  isActive: boolean;
  label: string | null;
  parameter: string | null;
}

const StudentToggleList: React.FC<StudentToggleListProps> = ({ isActive, label, parameter }) => {
  const students = useContext(StudentContext); // StudentContextからstudentsを取得
  const [toggles, setToggles] = useState<boolean[]>([]);

  useEffect(() => {
    if (students) {
      setToggles(new Array(students.length).fill(false));
    }
  }, [students]);

  const extensionAnimation = useSpring({
    to: {
      width: isActive ? "250px" : "0px",
      opacity: isActive ? 1 : 0,
    },
    from: {
      width: "0px",
      opacity: 0,
    },
    config: { tension: 500, friction: 50 },
  });

  const handleToggle = (index: number, isChecked: boolean) => {
    const newToggles = [...toggles];
    newToggles[index] = isChecked;
    setToggles(newToggles);
  };

  if (!students) {
    return null; // studentsが存在しない場合は何も表示しない
  }

  return (
    <animated.div
      style={extensionAnimation}
      className="bg-white flex-shrink-0 z-50 p-4 rounded-r-lg shadow-lg overflow-hidden"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{label}</h2>
      {students.map((student, index) => (
        <animated.div key={student.index} style={{ opacity: extensionAnimation.opacity }}>
          <li
            className="flex justify-between items-center mb-2 p-2 hover:bg-gray-100 rounded-md transition-colors duration-300 ease-in-out"
            onClick={() => handleToggle(index, !toggles[index])}
          >
            <span className="flex items-center">
              <IoIosStar className="text-blue-500 mr-2" />
              {student.studentName || `生徒${index + 1}`}
            </span>
            <Switch
              className={`${
                toggles[index] ? "bg-blue-500" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
            >
              <span
                className={`${
                  toggles[index] ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </li>
        </animated.div>
      ))}
    </animated.div>
  );
};

export default StudentToggleList;