'use client'

import React from 'react';
import SidebarItem from './SidebarItem';
import ClassLayoutConf from './ClassLayoutConf';
import SidebarItemBeta from './SidebarItemBeta';

const Sidebar: React.FC = () => {
  const items = [
    "最前列", "前２列", "最後列", "後２列", 
    "最右列", "最左列", "教師の近く", "隣", "２席以内",
    "１席離す", "２席離す"
  ];
  const itemsBeta = [
    "席を指定", "座席入れ替え"
  ];

  return (
    <aside className="w-64 min-h-screen bg-white text-gray-800 p-5">
      <ClassLayoutConf />
      <ul>
        {items.map((item, index) => (
          <SidebarItem key={index} label={item} />
        ))}
        {itemsBeta.map((item, index) => (
          <SidebarItemBeta key={index} label={item} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;