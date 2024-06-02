"use client";

import React, { useState, useEffect, useContext } from "react";
import SidebarItem from "./SidebarItem";
import ClassLayoutConf from "./ClassLayoutConf";
import StudentToggleList from "./StudentToggleList"; // 新しいコンポーネントをインポート
import StudentSelecterBeta from "./StudentSelecterBeta";
import { EachLabelContextProvider } from "@/context/EachLabelContext"; // EachLabelContextProviderをインポート
import SendStudentsButton from "./SendStudentsButton";
import Hello from "./Hello";
import LogStudentsButton from "./LogStudentsButton";
import SeatArrangeButton from "./SeatArrangeButton";

const Sidebar: React.FC = () => {
  const items = [
    { label: "最前列", icon: "/menuIcon/saizenretsu.png" },
    { label: "前２列", icon: "/menuIcon/mae2retsu.png" },
    { label: "最後列", icon: "/menuIcon/saikouretsu.png" },
    { label: "後２列", icon: "/menuIcon/ushiro2retsu.png" },
    { label: "最右列", icon: "/menuIcon/saiuretsu.png" },
    { label: "最左列", icon: "/menuIcon/saisaretsu.png" },
    { label: "教師の近く", icon: "/menuIcon/kyoushinotikaku.png" },
    { label: "隣", icon: "/menuIcon/tonari.png" },
    { label: "２席以内", icon: "/menuIcon/2sekiinai.png" },
    { label: "１席離す", icon: "/menuIcon/1sekihanasu.png" },
    { label: "２席離す", icon: "/menuIcon/2sekihanasu.png" },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [tempIsActive, setTempIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (activeIndex !== null) {
      setActiveLabel(items[activeIndex].label);
      setTempIsActive(false);
      setTimeout(() => {
        setTempIsActive(true);
      }, 250);
    } else {
      setActiveLabel(null);
      setTempIsActive(false);
    }
  }, [activeIndex]); // activeIndex が変更されたときに activeLabel を更新

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const labelsForStudentToggleList = ["最前列", "前２列", "最後列", "後２列", "最右列", "最左列", "教師の近く"];
  const studentToggleListIsActive = tempIsActive && activeIndex !== null && labelsForStudentToggleList.includes(items[activeIndex].label);

  const labelsForStudentSelecterBeta = ["隣", "２席以内", "１席離す", "２席離す"];

  const studentSelecterBetaIsActive = tempIsActive && activeIndex !== null && labelsForStudentSelecterBeta.includes(items[activeIndex].label);

  return (
    <aside className="min-h-screen text-gray-800 p-5 flex" style={{backgroundColor: "#E0E9E5"}}>
      <div className="pr-2">
        <ClassLayoutConf />
        <ul>
          {items.map((item, index) => (
            <SidebarItem key={index} label={item.label} onClick={() => handleToggle(index)} isOpen={activeIndex === index} menuIcon={item.icon} />
          ))}
        </ul>
        <Hello />
        <SendStudentsButton />
        <LogStudentsButton />
        <SeatArrangeButton />
      </div>
      <StudentToggleList isActive={studentToggleListIsActive} label={activeLabel} />
      <EachLabelContextProvider>
        <StudentSelecterBeta isActive={studentSelecterBetaIsActive} label={activeLabel} />
      </EachLabelContextProvider>
    </aside>
  );
};

export default Sidebar;