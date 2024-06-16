import React, { useContext } from "react";
import { StudentContext, LayoutContext, isAfterSeatArrangeContext, perfectSeatArrangeModeContext, fixedByGenderModeContext, seatClosestTeacherContext } from "@/app/page";
import { ForOutputStudent } from "@/types/ForOutputStudent";
import { IsAfterSeatArrangeContextType } from "@/types/IsAfterSeatArrangeType";
import { Gender } from "@/types/Gender";

const SeatArrangeButtonBeta: React.FC = () => {
  const students = useContext(StudentContext);
  const layout = useContext(LayoutContext);
  const perfectSeatArrangeMode = useContext(perfectSeatArrangeModeContext);
  const isAfterSeatArrangeContextValue = useContext<IsAfterSeatArrangeContextType | null>(isAfterSeatArrangeContext);
  const fixedByGenderMode = useContext(fixedByGenderModeContext);
  const seatClosestTeacher = useContext(seatClosestTeacherContext);

  if (!isAfterSeatArrangeContextValue) {
    throw new Error("isAfterSeatArrangeContext is undefined");
  }

  if (!students || !layout || !perfectSeatArrangeMode || !fixedByGenderMode || !seatClosestTeacher) return;

  const setIsAfterSeatArrange = isAfterSeatArrangeContextValue.setIsAfterSeatArrange;

  const studentsOnSeatNotToBeUsed = students.filter((student) => student.gender === Gender.IsNotToBeUsed);
  const seatsNotToBeUsed = studentsOnSeatNotToBeUsed.map((student) => student.currentSeat);
  studentsOnSeatNotToBeUsed.forEach((student) => {
    student.assignedSeat.from_front = student.currentSeat.from_front;
    student.assignedSeat.from_right = student.currentSeat.from_right;
    student.gender = Gender.IsNotToBeUsed;
  }); //修正必要

  const seatClosestTeacherToSend = {
    from_front: seatClosestTeacher.seatClosestTeacherFrom_front,
    from_right: seatClosestTeacher.seatClosestTeacherFrom_right,
  };

  const seatArrange = async () => {
    const dataToSend = {
      rows: layout.rows,
      columns: layout.columns,
      perfectSeatArrangeMode: perfectSeatArrangeMode.perfectSeatArrangeMode,
      fixedByGenderMode: fixedByGenderMode.fixedByGenderMode,
      isNotToBeUsed: seatsNotToBeUsed,
      seatClosestTeacher: seatClosestTeacherToSend,
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
    };

    // 送信データをコンソールに出力
    console.log("Sending data:", JSON.stringify(dataToSend, null, 2));

    const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/seatarrangeBeta`;

    let errorCount = 0;
    const maxRetries = 5;

    while (errorCount < maxRetries) {
      try {
        setIsAfterSeatArrange(false); //前回の席替え結果を一度非表示;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ForOutputStudent[] = await response.json();
        console.log("Received data:", result);
        // 受け取ったデータをStudentContextに反映
        result.forEach((resStudent) => {
          const student = students.find((s) => s.IDforBackend === resStudent.IDforBackend);
          if (student) {
            student.assignedSeat = {
              from_front: resStudent.assignedSeatFromFront,
              from_right: resStudent.assignedSeatFromRight,
            };
          }
        });
        console.log("Updated students:", students);

        setIsAfterSeatArrange(true);
        break; // 成功した場合はループを抜ける
      } catch (error) {
        errorCount++;
        console.error(`Error during seat arrangement (attempt ${errorCount}):`, error);
        if (errorCount >= maxRetries) {
          console.error("Max retries reached. Aborting.");
          alert("席替えに失敗しました。席替えの条件に競合があるか、条件の組み合わせが難しい可能性があります。後者の場合、再試行によって成功する可能性があります。");
        }
      }
    }
  };

  return (
    <button className="w-full px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring flex items-center justify-center" onClick={seatArrange}>
      席替えをする
    </button>
    // <div className="flex flex-col px-4 py-1 rounded-md items-center justify-center bg-gray-100">
    //   <button className="px-4 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring" onClick={seatArrange}>
    //     SeatArrangeBeta
    //   </button>
    // </div>
  );
};

export default SeatArrangeButtonBeta;
