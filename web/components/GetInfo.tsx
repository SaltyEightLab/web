import React, { useContext, useEffect, useState } from "react";
import { StudentContext, LayoutContext, isAfterSeatArrangeContext, perfectSeatArrangeModeContext, fixedByGenderModeContext, seatClosestTeacherContext } from "@/app/page";
import { ForOutputStudent } from "@/types/ForOutputStudent";
import { IsAfterSeatArrangeContextType } from "@/types/IsAfterSeatArrangeType";
import { Gender } from "@/types/Gender";
import { StudentType } from "@/types/StudentType";
import { EachLabelContext } from "@/context/EachLabelContext";

const GetInfo: React.FC = () => {
  const studentsContext = useContext(StudentContext);
  const layout = useContext(LayoutContext);
  const perfectSeatArrangeMode = useContext(perfectSeatArrangeModeContext);
  const isAfterSeatArrangeContextValue = useContext<IsAfterSeatArrangeContextType | null>(isAfterSeatArrangeContext);
  const fixedByGenderMode = useContext(fixedByGenderModeContext);
  const seatClosestTeacher = useContext(seatClosestTeacherContext);
  const eachLabelContext = useContext(EachLabelContext);

  const [studentsFromDB, setStudentsFromDB] = useState<StudentType[]>([]);

  

  useEffect(() => {
    if (studentsFromDB && studentsContext) {
      console.log("Updated studentsFromDB from GetInfo:", studentsFromDB);
      console.log("studentsContext from GetInfo:", studentsContext);
      studentsFromDB.forEach((studentFromDB) => {
        const student = studentsContext.find((s) => s.IDforBackend === studentFromDB.IDforBackend);
        if (student) {
          student.name = studentFromDB.name;
          student.gender = studentFromDB.gender;
          student.assignedSeat = {
            from_front: studentFromDB.assignedSeat.from_front,
            from_right: studentFromDB.assignedSeat.from_right,
          };
          student.prefersFrontRow = studentFromDB.prefersFrontRow;
          student.prefersFrontTwoRows = studentFromDB.prefersFrontTwoRows;
          student.prefersBackRow = studentFromDB.prefersBackRow;
          student.prefersBackTwoRows = studentFromDB.prefersBackTwoRows;
          student.prefersLeftColumn = studentFromDB.prefersLeftColumn;
          student.prefersRightColumn = studentFromDB.prefersRightColumn;
          student.prefersNearTeacher = studentFromDB.prefersNearTeacher;
          student.studentsToPlaceNextTo = studentFromDB.studentsToPlaceNextTo;
          student.studentsToPlaceWithinTwoSeats = studentFromDB.studentsToPlaceWithinTwoSeats;
          student.studentsToPlaceAwayOneSeat = studentFromDB.studentsToPlaceAwayOneSeat;
          student.studentsToPlaceAwayTwoSeats = studentFromDB.studentsToPlaceAwayTwoSeats;
        }
      });
    }
    console.log("After studentsContext from GetInfo:", studentsContext);
  }, [studentsFromDB]);

  const getInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8081/userdata/e047f972-d5cc-49dc-a76c-24940ec9f71a`, {
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
      setStudentsFromDB(decodedData.students);
    } catch (error: unknown) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <button className="w-full px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring flex items-center justify-center" onClick={getInfo}>
      データを受け取る
    </button>
  );
};

export default GetInfo;
