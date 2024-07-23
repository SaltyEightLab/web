"use client";

import React, { useState, createContext, useEffect, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import { Gender } from "@/types/Gender";
import { StudentType } from "@/types/StudentType";
import { LayoutType } from "@/types/LayoutType";
import { IsAfterSeatArrangeContextType } from "@/types/IsAfterSeatArrangeType";
import BeforeDisplay from "@/components/BeforeDisplay";
import PerfectSeatArrangeModeType from "@/types/PerfectSeatArrangeModeType";
import FixedByGenderModeType from "@/types/FixedByGenderModeType";
import SeatClosestTeacherType from "@/types/SeatClosestTeacherType";
import AfterDisplayBeta from "@/components/AfterDisplayBeta";
import { SessionProvider } from "next-auth/react";
import { EachLabelContextProvider } from "@/context/EachLabelContext";

export const LayoutContext = createContext<LayoutType>({rows: 5, columns: 6, setRows: () => {}, setColumns: () => {}});
export const StudentContext = createContext<{
  students: Array<StudentType>;
  updateStudents: (updatedStudents: Array<StudentType>) => void;
} | null>(null);
export const isAfterSeatArrangeContext = createContext<IsAfterSeatArrangeContextType | null>(null);
export const perfectSeatArrangeModeContext = createContext<PerfectSeatArrangeModeType | null>(null);
export const fixedByGenderModeContext = createContext<FixedByGenderModeType | null>(null);
export const seatClosestTeacherContext = createContext<SeatClosestTeacherType>({seatClosestTeacherFrom_front: 0, seatClosestTeacherFrom_right: 6, setSeatClosestTeacherFrom_front: () => {}, setSeatClosestTeacherFrom_right: () => {}});

const Home: React.FC = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(4);
  const [students, setStudents] = useState<Array<StudentType>>([]);
  const [isAfterSeatArrange, setIsAfterSeatArrange] = useState(false);
  const [perfectSeatArrangeMode, setPerfectSeatArrangeMode] = useState(false);
  const [fixedByGenderMode, setFixedByGenderMode] = useState(false);
  const [seatClosestTeacherFrom_front, setSeatClosestTeacherFrom_front] = useState(0);
  const [seatClosestTeacherFrom_right, setSeatClosestTeacherFrom_right] = useState(columns - 1);

  const layoutValue = { rows, columns, setRows, setColumns };
  const isAfterSeatArrangeValue = { isAfterSeatArrange, setIsAfterSeatArrange };
  const perfectSeatArrangeModeValue = { perfectSeatArrangeMode, setPerfectSeatArrangeMode };
  const fixedByGenderModeValue = { fixedByGenderMode, setFixedByGenderMode };
  const seatClosestTeacherValue = { seatClosestTeacherFrom_front, seatClosestTeacherFrom_right, setSeatClosestTeacherFrom_front, setSeatClosestTeacherFrom_right };

  const setStudentName = useCallback((index: number, name: string) => {
    setStudents((currentStudents) => currentStudents.map((student, i) => (i === index ? { ...student, name: name } : student)));
  }, []);

  const setGender = useCallback((index: number, gender: Gender) => {
    setStudents((currentStudents) => currentStudents.map((student, i) => (i === index ? { ...student, gender } : student)));
  }, []);

  const updateStudents = (updatedStudents: Array<StudentType>) => {
    setStudents(updatedStudents);
  };

  useEffect(() => {
    setSeatClosestTeacherFrom_front(0);
    setSeatClosestTeacherFrom_right(columns - 1);
  }, [rows, columns]);

  useEffect(() => {
    const newStudents = Array.from({ length: rows * columns }, (_, index) => {
      const from_right = columns - 1 - (index % columns);
      const from_front = Math.floor(index / columns);
      return {
        index,
        IDforBackend: from_right * rows + from_front,
        name: "",
        currentSeat: { from_front, from_right },
        assignedSeat: { from_front: 0, from_right: 0 },
        studentsToPlaceNextTo: [],
        studentsToPlaceWithinTwoSeats: [],
        studentsToPlaceAwayOneSeat: [],
        studentsToPlaceAwayTwoSeats: [],
        prefersFrontRow: false,
        prefersFrontTwoRows: false,
        prefersBackRow: false,
        prefersBackTwoRows: false,
        prefersLeftColumn: false,
        prefersRightColumn: false,
        prefersNearTeacher: false,
        gender: Gender.UNISEX,
        setStudentName,
        setGender,
      };
    });
    setStudents(newStudents);
  }, [rows, columns, setStudentName, setGender]);

  return (
    <LayoutContext.Provider value={layoutValue}>
      <StudentContext.Provider value={{ students, updateStudents }}>
        <isAfterSeatArrangeContext.Provider value={isAfterSeatArrangeValue}>
          <perfectSeatArrangeModeContext.Provider value={perfectSeatArrangeModeValue}>
            <fixedByGenderModeContext.Provider value={fixedByGenderModeValue}>
              <seatClosestTeacherContext.Provider value={seatClosestTeacherValue}>
                <EachLabelContextProvider>
                  <SessionProvider>
                    <div className="flex min-h-screen">
                      <Sidebar />
                      <main className="flex-1 flex flex-col items-center justify-start p-12">
                        <BeforeDisplay />
                        {isAfterSeatArrange && <AfterDisplayBeta />}
                      </main>
                    </div>
                  </SessionProvider>
                </EachLabelContextProvider>
              </seatClosestTeacherContext.Provider>
            </fixedByGenderModeContext.Provider>
          </perfectSeatArrangeModeContext.Provider>
        </isAfterSeatArrangeContext.Provider>
      </StudentContext.Provider>
    </LayoutContext.Provider>
  );
};

export default Home;
