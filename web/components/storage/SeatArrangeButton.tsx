import React, { useContext } from "react";
import { StudentContext, LayoutContext, isAfterSeatArrangeContext, perfectSeatArrangeModeContext, fixedByGenderModeContext } from "@/app/page";
import { ForOutputStudent } from "@/types/ForOutputStudent";
import { IsAfterSeatArrangeContextType } from "@/types/IsAfterSeatArrangeType";

const SeatArrangeButton: React.FC = () => {
  const students = useContext(StudentContext);
  const layout = useContext(LayoutContext);
  const perfectSeatArrangeMode = useContext(perfectSeatArrangeModeContext);
  const isAfterSeatArrangeContextValue = useContext<IsAfterSeatArrangeContextType | null>(isAfterSeatArrangeContext);
  const fixedByGenderMode = useContext(fixedByGenderModeContext);

  if (!isAfterSeatArrangeContextValue) {
    throw new Error("isAfterSeatArrangeContext is undefined");
  }

  const setIsAfterSeatArrange = isAfterSeatArrangeContextValue.setIsAfterSeatArrange;

  const seatArrange = async () => {
    if (!students || !layout || !perfectSeatArrangeMode || !fixedByGenderMode) return;

    const dataToSend = {
      rows: layout.rows,
      columns: layout.columns,
      perfectSeatArrangeMode: perfectSeatArrangeMode.perfectSeatArrangeMode,
      fixedByGenderMode: fixedByGenderMode.fixedByGenderMode,
      students: students.map((student) => ({
        ...student,
        currentSeat: { ...student.currentSeat },
        assignedSeat: { ...student.assignedSeat },
        studentsToPlaceNextTo: student.studentsToPlaceNextTo.map((s) => ({ name: s.name, IDforBackend: s.IDforBackend })),
        studentsToPlaceWithinTwoSeats: student.studentsToPlaceWithinTwoSeats.map((s) => ({ name: s.name, IDforBackend: s.IDforBackend })),
        studentsToPlaceAwayOneSeat: student.studentsToPlaceAwayOneSeat.map((s) => ({ name: s.name, IDforBackend: s.IDforBackend })),
        studentsToPlaceAwayTwoSeats: student.studentsToPlaceAwayTwoSeats.map((s) => ({ name: s.name, IDforBackend: s.IDforBackend })),
      })),
    };

    // 送信データをコンソールに出力
    console.log("Sending data:", JSON.stringify(dataToSend, null, 2));

    const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/seatarrange`;

    try {
      setIsAfterSeatArrange(false);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result: ForOutputStudent[] = await response.json();
      console.log("Received data:", result);
      // 受け取ったデータをStudentContextに反映
      result.forEach((resStudent) => {
        const student = students.find((s) => s.IDforBackend === resStudent.id);
        if (student) {
          student.assignedSeat = {
            from_front: resStudent.assignedSeatFromFront,
            from_right: resStudent.assignedSeatFromRight,
          };
        }
      });
      console.log("Updated students:", students);
      
      setIsAfterSeatArrange(true);
      
    } catch (error) {
      console.error("Error during seat arrangement:", error);
    }
  };

  return (
    <div className="flex flex-col px-4 py-1 rounded-md items-center justify-center bg-gray-100">
      <button className="px-4 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring" onClick={seatArrange}>
        SeatArrange
      </button>
    </div>
  );
};

export default SeatArrangeButton;
