'use client'

import React, { useState, createContext, useEffect } from 'react';
import LayoutValuesDisplay from '@/components/LayoutValuesDisplay';
import Sidebar from '@/components/Sidebar';
import Seat from '@/components/Seat';

interface LayoutType {
  rows: number;
  columns: number;
  setRows: (rows: number) => void;
  setColumns: (columns: number) => void;
}

export interface StudentType {
  index: number;
  studentName: string;
  setStudentName: (index: number, name: string) => void;
}

export const LayoutContext = createContext<LayoutType | null>(null);
export const StudentContext = createContext<Array<StudentType> | null>(null);

const Home: React.FC = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(4);
  const [students, setStudents] = useState<Array<StudentType>>([]); // 初期値を空の配列に設定

  const setStudentName = (index: number, name: string) => {
    setStudents(currentStudents =>
      currentStudents.map((student, i) =>
        i === index ? { ...student, studentName: name } : student
      )
    );
  };

  useEffect(() => {
    setStudents(
      new Array(rows * columns).fill(null).map((_, index) => ({
        index,
        studentName: '',
        setStudentName: (idx, name) => setStudentName(idx, name) // 正しい関数シグネチャを使用
      }))
    );
  }, [rows, columns]);

  const layoutValue = {
    rows,
    columns,
    setRows,
    setColumns
  };

  // return (
  //   <LayoutContext.Provider value={layoutValue}>
  //     <div className="flex min-h-screen">
  //       <Sidebar />
  //       <main className="flex-1 flex flex-col items-center justify-start p-12">
  //         <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: `${columns * 112}px` }}>
  //           {students.map((student, index) => (
  //             <StudentContext.Provider key={index} value={student}>
  //               <Seat />
  //             </StudentContext.Provider>
  //           ))}
  //         </div>
  //       </main>
  //     </div>
  //   </LayoutContext.Provider>
  // );
  return (
    <LayoutContext.Provider value={layoutValue}>
      <StudentContext.Provider value={students}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 flex flex-col items-center justify-start p-12">
            <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: `${columns * 112}px` }}>
              {students.map((student, index) => (
                <Seat key={index} student={student} />
              ))}
            </div>
          </main>
        </div>
      </StudentContext.Provider>
    </LayoutContext.Provider>
  );
}

export default Home;