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

export const LayoutContext = createContext<LayoutType | null>(null);
export const StudentContext = createContext<Array<StudentType> | null>(null);
export const isAfterSeatArrangeContext = createContext<IsAfterSeatArrangeContextType | null>(null);
export const perfectSeatArrangeModeContext = createContext<PerfectSeatArrangeModeType | null>(null);
export const fixedByGenderModeContext = createContext<FixedByGenderModeType | null>(null);
export const seatClosestTeacherContext = createContext<SeatClosestTeacherType | null>(null);

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

  useEffect(() => {
    console.log("isAfterSeatArrange:" + isAfterSeatArrange);
  }, [isAfterSeatArrange]);

  return (
      <LayoutContext.Provider value={layoutValue}>
        <StudentContext.Provider value={students}>
          <isAfterSeatArrangeContext.Provider value={isAfterSeatArrangeValue}>
            <perfectSeatArrangeModeContext.Provider value={perfectSeatArrangeModeValue}>
              <fixedByGenderModeContext.Provider value={fixedByGenderModeValue}>
                <seatClosestTeacherContext.Provider value={seatClosestTeacherValue}>
                  <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="flex-1 flex flex-col items-center justify-start p-12">
                      <BeforeDisplay />
                      {isAfterSeatArrange && <AfterDisplayBeta />}
                    </main>
                  </div>
                </seatClosestTeacherContext.Provider>
              </fixedByGenderModeContext.Provider>
            </perfectSeatArrangeModeContext.Provider>
          </isAfterSeatArrangeContext.Provider>
        </StudentContext.Provider>
      </LayoutContext.Provider>
  );
};

export default Home;
