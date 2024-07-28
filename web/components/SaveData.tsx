import React, { useContext, useEffect, useState } from "react";
import { StudentContext, LayoutContext, isAfterSeatArrangeContext, perfectSeatArrangeModeContext, fixedByGenderModeContext, seatClosestTeacherContext } from "@/app/page";
import { IsAfterSeatArrangeContextType } from "@/types/IsAfterSeatArrangeType";
import { Gender } from "@/types/Gender";
import { EachLabelContext } from "@/context/EachLabelContext";
import { useSession } from "next-auth/react";

const SaveData = () => {
  const studentsContext = useContext(StudentContext);
  const students = studentsContext?.students || [];
  const layout = useContext(LayoutContext);
  const perfectSeatArrangeMode = useContext(perfectSeatArrangeModeContext);
  const isAfterSeatArrangeContextValue = useContext<IsAfterSeatArrangeContextType | null>(isAfterSeatArrangeContext);
  const fixedByGenderMode = useContext(fixedByGenderModeContext);
  const seatClosestTeacher = useContext(seatClosestTeacherContext);
  const eachLabelContext = useContext(EachLabelContext);

  const { data: session, status } = useSession();
  
  if (!studentsContext || !layout || !perfectSeatArrangeMode || !isAfterSeatArrangeContextValue || !fixedByGenderMode || !seatClosestTeacher || !eachLabelContext || !session?.user?.email) {
    return null;
  }

  const handleSave = async () => {
    const dataForSave = {
      email: session?.user?.email,
      dataDate: new Date().toLocaleString("sv-SE", { timeZone: "Asia/Tokyo" }).replace(" ", "T"),  // 日本時間のISO形式のタイムスタンプに変更
      jsonData: JSON.stringify({
        rows: layout.rows,
        columns: layout.columns,
        perfectSeatArrangeMode: perfectSeatArrangeMode.perfectSeatArrangeMode,
        fixedByGenderMode: fixedByGenderMode.fixedByGenderMode,
        seatClosestTeacher: {
          from_front: seatClosestTeacher.seatClosestTeacherFrom_front,
          from_right: seatClosestTeacher.seatClosestTeacherFrom_right,
        },
        nextToPair: eachLabelContext.nextToPairs,
        withinTwoSeats: eachLabelContext.withInTwoSeatsPairs,
        awayOneSeat: eachLabelContext.awayOneSeatsPairs,
        awayTwoSeats: eachLabelContext.awayTwoSeatsPairs,
        students: students
          .map((student) => ({
            ...student,
            currentSeat: { ...student.currentSeat },
            assignedSeat: { ...student.assignedSeat },
            studentsToPlaceNextTo: student.studentsToPlaceNextTo.map((s) => ({ name: s.name, IDforBackend: s.IDforBackend })),
            studentsToPlaceWithinTwoSeats: student.studentsToPlaceWithinTwoSeats.map((s) => ({ name: s.name, IDforBackend: s.IDforBackend })),
            studentsToPlaceAwayOneSeat: student.studentsToPlaceAwayOneSeat.map((s) => ({ name: s.name, IDforBackend: s.IDforBackend })),
            studentsToPlaceAwayTwoSeats: student.studentsToPlaceAwayTwoSeats.map((s) => ({ name: s.name, IDforBackend: s.IDforBackend })),
          }))
          .filter((student) => student.gender !== Gender.IsNotToBeUsed),
      })
    };

    try {
      // await registerUserIfNotExists();
      const response = await fetch(`${process.env.NEXT_PUBLIC_USERDATA_SERVER}/userdata/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForSave),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Data saved successfully:", result);
    } catch (error) {
      console.error("Error saving data:", error);
      console.log(dataForSave);
    }
  };

  return (
    <button className="w-40 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring flex items-center justify-center" onClick={handleSave}>
      履歴に保存する
    </button>
  );
};

export default SaveData;