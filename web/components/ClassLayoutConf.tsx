'use client'

import React, { useContext } from 'react';
import { IoIosStar } from 'react-icons/io';
import { LayoutContext } from '../app/page';

const ClassLayoutConf = () => {
  const layout = useContext(LayoutContext);

  if (!layout) {
    // LayoutContext が null の場合の処理
    return <div>ロード中...</div>;
  }

  const { rows, columns, setRows, setColumns } = layout;

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 10) {
      setRows(value);
    }
  };

  const handleColumnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 10) {
      setColumns(value);
    }
  };

  return (
    <div className="flex items-center py-1 bg-white hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-200 ease-in-out shadow-sm">
      <img src="/menuIcon/layout.png" alt="Menu Icon" className="mx-2 w-8 h-6" />
      <label className="text-gray-700 font-semibold text-sm font-sans">
        <input type="number" value={rows} onChange={handleRowsChange} min="1" max="10" className="p-1.5 border border-gray-300 rounded bg-gray-50 transition-colors mx-1" />
      </label>
      <span className="text-gray-800 font-normal text-sm mx-1">×</span>
      <label className="text-gray-700 font-semibold text-sm font-sans">
        <input type="number" value={columns} onChange={handleColumnsChange} min="1" max="10" className="p-1.5 border border-gray-300 rounded bg-gray-50 transition-colors mx-1" />
      </label>
    </div>
  );
};

export default ClassLayoutConf;