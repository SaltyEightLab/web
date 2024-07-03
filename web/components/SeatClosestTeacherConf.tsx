"use client";

import React, { useContext, useState, useEffect } from "react";
import { seatClosestTeacherContext, LayoutContext } from "../app/page";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SeatClosestTeacherConf = () => {
  const seatClosestTeacher = useContext(seatClosestTeacherContext);
  const layout = useContext(LayoutContext);

  const [isOpen, setIsOpen] = useState(false);

  if (!layout || !seatClosestTeacher) {
    return null;
  }

  const { rows, columns } = layout;
  const { seatClosestTeacherFrom_front, seatClosestTeacherFrom_right, setSeatClosestTeacherFrom_front, setSeatClosestTeacherFrom_right } = seatClosestTeacher;

  useEffect(() => {
    // rowsやcolumnsが変更されたときに初期値を再計算
    setSeatClosestTeacherFrom_front(0);
    setSeatClosestTeacherFrom_right(columns - 1);
  }, [rows, columns, setSeatClosestTeacherFrom_front, setSeatClosestTeacherFrom_right]);

  useEffect(() => {
    // seatClosestTeacherFrom_frontやseatClosestTeacherFrom_rightが変更されたときに再レンダリング
  }, [seatClosestTeacherFrom_front, seatClosestTeacherFrom_right]);

  const handleSeatClosestTeacherFrom_frontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= rows) {
      setSeatClosestTeacherFrom_front(value - 1);
    }
  };

  const handleSeatClosestTeacherFrom_rightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= columns) {
      setSeatClosestTeacherFrom_right(value - 1);
    }
  };

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="flex flex-col items-start my-2 py-2 cursor-pointer rounded-lg transition-colors duration-200 ease-in-out shadow-sm z-50 bg-white">
      <div className="flex items-center w-full text-gray-800" onClick={onClick}>
        <img src="/menuIcon/kyousinoiti.png" alt="Menu Icon" className="mx-3 w-6 h-6" />
        <span>教師最寄り席</span>
        {isOpen ? <IoIosArrowBack className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
      </div>
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"} flex justify-center`}>
        <div className="flex flex-col items-center w-full">
          <label className="text-gray-700 font-semibold text-sm font-sans flex items-center mb-2 justify-center">
            <span>　　前から</span>
            <input
              type="number"
              value={seatClosestTeacherFrom_front + 1}
              onChange={handleSeatClosestTeacherFrom_frontChange}
              min="1"
              max={rows}
              className="p-1.5 border border-gray-300 rounded bg-gray-50 transition-colors mx-1"
            />
            <span>番目</span>
          </label>
          <label className="text-gray-700 font-semibold text-sm font-sans flex items-center justify-center">
            <span>　　右から</span>
            <input
              type="number"
              value={seatClosestTeacherFrom_right + 1}
              onChange={handleSeatClosestTeacherFrom_rightChange}
              min="1"
              max={columns}
              className="p-1.5 border border-gray-300 rounded bg-gray-50 transition-colors mx-1"
            />
            <span>番目</span>
          </label>
        </div>
      </div>
    </li>
  );
};

export default SeatClosestTeacherConf;