"use client";

import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import ClassLayoutConf from "./ClassLayoutConf";
import StudentToggleList from "./StudentToggleList"; // 新しいコンポーネントをインポート
import StudentSelecter from "./StudentSelecter";

const Sidebar: React.FC = () => {
  const items = [
    { label: "最前列", parameter: "prefersFrontRow" },
    { label: "前２列", parameter: "prefersFrontTwoRows" },
    { label: "最後列", parameter: "prefersBackRow" },
    { label: "後２列", parameter: "prefersBackTwoRows" },
    { label: "最右列", parameter: "prefersRightColumn" },
    { label: "最左列", parameter: "prefersLeftColumn" },
    { label: "教師の近く", parameter: "prefersNearTeacher" },
    { label: "隣", parameter: "studentsToPlaceNextTo" },
    { label: "２席以内", parameter: "studentsToPlaceWithinTwoSeats" },
    { label: "１席離す", parameter: "studentsToPlaceAwayOneSeat" },
    { label: "２席離す", parameter: "studentsToPlaceAwayTwoSeats" },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [activeParameter, setActiveParameter] = useState<string | null>(null);
  const [tempIsActive, setTempIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (activeIndex !== null) {
      setActiveLabel(items[activeIndex].label);
      setActiveParameter(items[activeIndex].parameter);
      setTempIsActive(false);
      setTimeout(() => {
        setTempIsActive(true);
      }, 250);
    } else {
      setActiveLabel(null);
      setActiveParameter(null);
      setTempIsActive(false);
    }
  }, [activeIndex]); // activeIndex が変更されたときに activeLabel を更新

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const labelsForStudentToggleList = [
    "最前列",
    "前２列",
    "最後列",
    "後２列",
    "最右列",
    "最左列",
    "教師の近く",
  ];
  const studentToggleListIsActive =
    tempIsActive &&
    activeIndex !== null &&
    labelsForStudentToggleList.includes(items[activeIndex].label);

  const labelsForStudentSelecter = [
    "隣",
    "２席以内",
    "１席離す",
    "２席離す",
  ];
  const studentSelecterIsActive =
    tempIsActive &&
    activeIndex !== null &&
    labelsForStudentSelecter.includes(items[activeIndex].label);

  return (
    <aside className="w-64 min-h-screen bg-white text-gray-800 p-5 flex">
      <div>
        <ClassLayoutConf />
        <ul>
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              label={item.label}
              onClick={() => handleToggle(index)}
              isOpen={activeIndex === index}
            />
          ))}
        </ul>
      </div>
      <StudentToggleList
        isActive={studentToggleListIsActive}
        label={activeLabel}
        parameter={activeParameter}
      />
      <StudentSelecter
        isActive={studentSelecterIsActive}
        label={activeLabel}
      />
    </aside>
  );
};

export default Sidebar;