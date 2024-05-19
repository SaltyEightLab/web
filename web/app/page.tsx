'use client'

import React, { useState, createContext, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Seat from '@/components/Seat';
import { Gender } from '@/types/Gender';
import { StudentType } from '@/types/StudentType';
import { LayoutType } from '@/types/LayoutType';

export const LayoutContext = createContext<LayoutType | null>(null);
export const StudentContext = createContext<Array<StudentType> | null>(null);

const Home: React.FC = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(4);
  const [students, setStudents] = useState<Array<StudentType>>([]);
  
  const layoutValue = { rows, columns, setRows, setColumns };
  
  const setStudentName = useCallback((index: number, name: string) => {
    setStudents(currentStudents =>
      currentStudents.map((student, i) =>
        i === index ? { ...student, studentName: name } : student
      )
    );
  }, []);

  useEffect(() => {
    const newStudents = Array.from({ length: rows * columns }, (_, index) => {
      const from_front = Math.floor(index / columns);
      const from_right = index % columns;
      return {
        index,
        studentName: '',
        currentSeat: { from_front, from_right },
        assignedSeat: { from_front: 0, from_right: 0 },
        studentsToPlaceNextTo: [],
        studentsToPlaceWithinTwoSeats: [],
        studentsToPlaceAwayOneSeat: [],
        studentsToPlaceAwayTwoSeats: [],
        studentsWantingNextToMe: [],
        studentsWantingWithinTwoSeatsOfMe: [],
        studentsWantingAwayOneSeatFromMe: [],
        studentsWantingAwayTwoSeatsFromMe: [],
        prefersFrontRow: false,
        prefersFrontTwoRows: false,
        prefersBackRow: false,
        prefersBackTwoRows: false,
        prefersLeftColumn: false,
        prefersRightColumn: false,
        prefersNearTeacher: false,
        gender: Gender.UNISEX,
        setStudentName
      };
    });
    setStudents(newStudents);
  }, [rows, columns, setStudentName]);

  return (
    <LayoutContext.Provider value={layoutValue}>
      <StudentContext.Provider value={students}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 flex flex-col items-center justify-start p-12">
            <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: `${columns * 112}px` }}>
              {students.map(student => (
                <Seat key={student.index} student={student} />
              ))}
            </div>
          </main>
        </div>
      </StudentContext.Provider>
    </LayoutContext.Provider>
  );
}

export default Home;