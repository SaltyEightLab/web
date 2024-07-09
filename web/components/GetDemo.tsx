import React, { useContext, useEffect, useState } from "react";
import { StudentContext, LayoutContext, isAfterSeatArrangeContext, perfectSeatArrangeModeContext, fixedByGenderModeContext, seatClosestTeacherContext } from "@/app/page";
import { IsAfterSeatArrangeContextType } from "@/types/IsAfterSeatArrangeType";
import { StudentType } from "@/types/StudentType";
import { EachLabelContext } from "@/context/EachLabelContext";

const GetDemo: React.FC = () => {
  const studentsContext = useContext(StudentContext);
  const students = studentsContext?.students || [];
  const updateStudents = studentsContext?.updateStudents;
  const layout = useContext(LayoutContext);
  const perfectSeatArrangeMode = useContext(perfectSeatArrangeModeContext);
  const isAfterSeatArrangeContextValue = useContext<IsAfterSeatArrangeContextType | null>(isAfterSeatArrangeContext);
  const fixedByGenderMode = useContext(fixedByGenderModeContext);
  const seatClosestTeacher = useContext(seatClosestTeacherContext);
  const eachLabelContext = useContext(EachLabelContext);

  const [studentsFromDB, setStudentsFromDB] = useState<StudentType[]>([]);

  useEffect(() => {
    if (studentsFromDB && students && updateStudents) {
      const updatedStudents = students.map((student) => {
        const studentFromDB = studentsFromDB.find((s) => s.IDforBackend === student.IDforBackend);
        if (studentFromDB) {
          return {
            ...student,
            name: studentFromDB.name,
            gender: studentFromDB.gender,
            currentSeat: {
              from_front: studentFromDB.currentSeat.from_front,
              from_right: studentFromDB.currentSeat.from_right,
            },
            assignedSeat: {
              from_front: 0,
              from_right: 0,
            },
            prefersFrontRow: studentFromDB.prefersFrontRow,
            prefersFrontTwoRows: studentFromDB.prefersFrontTwoRows,
            prefersBackRow: studentFromDB.prefersBackRow,
            prefersBackTwoRows: studentFromDB.prefersBackTwoRows,
            prefersLeftColumn: studentFromDB.prefersLeftColumn,
            prefersRightColumn: studentFromDB.prefersRightColumn,
            prefersNearTeacher: studentFromDB.prefersNearTeacher,
            studentsToPlaceNextTo: studentFromDB.studentsToPlaceNextTo,
            studentsToPlaceWithinTwoSeats: studentFromDB.studentsToPlaceWithinTwoSeats,
            studentsToPlaceAwayOneSeat: studentFromDB.studentsToPlaceAwayOneSeat,
            studentsToPlaceAwayTwoSeats: studentFromDB.studentsToPlaceAwayTwoSeats,
          };
        }
        return student;
      });
      // 並び替え
      const columns = layout?.columns || 0;
      const rows = layout?.rows || 0;
      updatedStudents.sort((a, b) => {
        const aPosition = a.currentSeat.from_front * columns + (rows - a.currentSeat.from_right);
        const bPosition = b.currentSeat.from_front * columns + (rows - b.currentSeat.from_right);
        return aPosition - bPosition;
      });
      updateStudents(updatedStudents);
    }
  }, [studentsFromDB]);

  const getDemo = async () => {
    try {
      const response = await fetch(`http://localhost:8081/userdata/hachiman_hachi@icloud.com`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Received raw data:", data);
      let decodedData;
      if (data.length > 0 && data[0].jsonData) {
        decodedData = JSON.parse(data[0].jsonData);
        // console.log("Received decoded data:", decodedData);
      }
      if (decodedData.rows && decodedData.columns && layout && layout.setRows && layout.setColumns) {
        layout.setRows(decodedData.rows);
        layout.setColumns(decodedData.columns);
        // layoutの更新が完了するまで待機
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
      if (decodedData.fixedByGenderMode && fixedByGenderMode && fixedByGenderMode.setFixedByGenderMode) {
        fixedByGenderMode.setFixedByGenderMode(decodedData.fixedByGenderMode);
      }
      if (decodedData.perfectSeatArrangeMode && perfectSeatArrangeMode && perfectSeatArrangeMode.setPerfectSeatArrangeMode) {
        perfectSeatArrangeMode.setPerfectSeatArrangeMode(decodedData.perfectSeatArrangeMode);
      }
      if (decodedData.isAfterSeatArrange && isAfterSeatArrangeContextValue && isAfterSeatArrangeContextValue.setIsAfterSeatArrange) {
        isAfterSeatArrangeContextValue.setIsAfterSeatArrange(decodedData.isAfterSeatArrange);
      }
      if (decodedData.seatClosestTeacher && seatClosestTeacher && seatClosestTeacher.setSeatClosestTeacherFrom_front && seatClosestTeacher.setSeatClosestTeacherFrom_right) {
        seatClosestTeacher.setSeatClosestTeacherFrom_front(decodedData.seatClosestTeacher.from_front);
        seatClosestTeacher.setSeatClosestTeacherFrom_right(decodedData.seatClosestTeacher.from_right);
      }
      if (decodedData.nextToPairs && eachLabelContext && eachLabelContext.setNextToPairs) {
        eachLabelContext.setNextToPairs(decodedData.nextToPairs);
      }
      if (decodedData.withInTwoSeatsPairs && eachLabelContext && eachLabelContext.setWithInTwoSeatsPairs) {
        eachLabelContext.setWithInTwoSeatsPairs(decodedData.withInTwoSeatsPairs);
      }
      if (decodedData.awayOneSeatsPairs && eachLabelContext && eachLabelContext.setAwayOneSeatsPairs) {
        eachLabelContext.setAwayOneSeatsPairs(decodedData.awayOneSeatsPairs);
      }
      if (decodedData.awayTwoSeatsPairs && eachLabelContext && eachLabelContext.setAwayTwoSeatsPairs) {
        eachLabelContext.setAwayTwoSeatsPairs(decodedData.awayTwoSeatsPairs);
      }
      setStudentsFromDB(decodedData.students);
    } catch (error: unknown) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <button className="mt-2 w-full px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-black focus:outline-none focus:ring flex items-center justify-center" onClick={getDemo}>
      DEMOデータで試す
    </button>
  );
};

export default GetDemo;
