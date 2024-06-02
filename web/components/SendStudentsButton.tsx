import React, { useContext } from "react";
import { StudentContext, LayoutContext } from "@/app/page";

const SendStudentsButton: React.FC = () => {
  const students = useContext(StudentContext);
  const layout = useContext(LayoutContext);

  const sendStudents = async () => {
    if (!students || !layout) return;
  
    const dataToSend = {
      rows: layout.rows,
      columns: layout.columns,
      students: students.map(student => ({
        ...student,
        currentSeat: { ...student.currentSeat },
        assignedSeat: { ...student.assignedSeat },
        studentsToPlaceNextTo: student.studentsToPlaceNextTo.map(s => ({ name: s.name, IDforBackend: s.IDforBackend })),
        studentsToPlaceWithinTwoSeats: student.studentsToPlaceWithinTwoSeats.map(s => ({ name: s.name, IDforBackend: s.IDforBackend })),
        studentsToPlaceAwayOneSeat: student.studentsToPlaceAwayOneSeat.map(s => ({ name: s.name, IDforBackend: s.IDforBackend })),
        studentsToPlaceAwayTwoSeats: student.studentsToPlaceAwayTwoSeats.map(s => ({ name: s.name, IDforBackend: s.IDforBackend }))
      }))
    };

    // 送信データをコンソールに出力
    console.log("Sending data:", JSON.stringify(dataToSend, null, 2));
  
    const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/students`;
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <button className="px-4 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring" onClick={sendStudents}>
        Send Students
      </button>
    </div>
  );
};

export default SendStudentsButton;