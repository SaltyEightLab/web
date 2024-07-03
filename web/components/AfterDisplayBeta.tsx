import { useContext, useState, useEffect } from "react";
import { StudentContext, LayoutContext, isAfterSeatArrangeContext } from "@/app/page";
import { SeatSwapMode } from "@/types/SeatSwapMode";
import { StudentType } from "@/types/StudentType";
import NewSeatBeta from "@/components/NewSeatBeta";
import { IsAfterSeatArrangeContextType } from "@/types/IsAfterSeatArrangeType";

const AfterDisplayBeta: React.FC = () => {
  const studentsContext = useContext(StudentContext);
  const layout = useContext(LayoutContext);
  const isAfterSeatArrangeContextValue = useContext<IsAfterSeatArrangeContextType | null>(isAfterSeatArrangeContext);

  const [students, setStudents] = useState(studentsContext);
  const [seatSwapMode, setSeatSwapMode] = useState(SeatSwapMode.INACTIVE);
  const [student1, setStudent1] = useState<StudentType | null>(null);
  const [student2, setStudent2] = useState<StudentType | null>(null);

  if (!students || !layout || !isAfterSeatArrangeContextValue) return;

  const setIsAfterSeatArrange = isAfterSeatArrangeContextValue.setIsAfterSeatArrange;

  const calculateStudentsForDisplay = () => {
    const studentsForDisplay = students.map((student) => ({
      ...student,
      currentSeat: { ...student.currentSeat },
      assignedSeat: { ...student.assignedSeat },
      studentsToPlaceNextTo: student.studentsToPlaceNextTo.map((s) => ({ ...s })),
      studentsToPlaceWithinTwoSeats: student.studentsToPlaceWithinTwoSeats.map((s) => ({ ...s })),
      studentsToPlaceAwayOneSeat: student.studentsToPlaceAwayOneSeat.map((s) => ({ ...s })),
      studentsToPlaceAwayTwoSeats: student.studentsToPlaceAwayTwoSeats.map((s) => ({ ...s })),
    }));
    studentsForDisplay.sort((a, b) => {
      const aValue = a.assignedSeat.from_front * layout.columns + -1 * (a.assignedSeat.from_right + 1 - layout.columns);
      const bValue = b.assignedSeat.from_front * layout.columns + -1 * (b.assignedSeat.from_right + 1 - layout.columns);
      return aValue - bValue;
    });
    // console.log("studentsForDisplay:", studentsForDisplay);
    return studentsForDisplay;
  };

  const studentsForDisplay = calculateStudentsForDisplay();

  const seatSwap = (student1: StudentType, student2: StudentType) => {
    setIsAfterSeatArrange(false);
    const student1Index = students.findIndex((s) => s.IDforBackend === student1.IDforBackend);
    const student2Index = students.findIndex((s) => s.IDforBackend === student2.IDforBackend);

    if (student1Index !== -1 && student2Index !== -1) {
      const updatedStudents = [...students];
      updatedStudents[student1Index].assignedSeat.from_front = student2.assignedSeat.from_front;
      updatedStudents[student1Index].assignedSeat.from_right = student2.assignedSeat.from_right;
      updatedStudents[student2Index].assignedSeat.from_front = student1.assignedSeat.from_front;
      updatedStudents[student2Index].assignedSeat.from_right = student1.assignedSeat.from_right;
      setStudents(updatedStudents);
      setStudent1(null);
      setStudent2(null);
    }
    setSeatSwapMode(SeatSwapMode.INACTIVE);
    setIsAfterSeatArrange(true);
  };

  const handleSeatSwapMode = () => {
    if (seatSwapMode === SeatSwapMode.INACTIVE) {
      setSeatSwapMode(SeatSwapMode.CELECTING);
    } else if (seatSwapMode === SeatSwapMode.CELECTING || seatSwapMode === SeatSwapMode.CELECTED) {
      setSeatSwapMode(SeatSwapMode.INACTIVE);
      setStudent1(null);
      setStudent2(null);
    }
  };

  const handleStudentClick = (student: StudentType) => {
    if (!student1) {
      setStudent1(student);
    } else if (!student2) {
      setStudent2(student);
    }
  };

  return (
    <div>
      <p className="p-5 mt-12 text-center text-2xl font-bold text-gray-500">After</p>
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: `${layout.columns * 112}px` }}>
        {studentsForDisplay.map((student) => (
          <NewSeatBeta key={student.index} student={student} seatSwapMode={seatSwapMode} onStudentClick={handleStudentClick} />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <button onClick={handleSeatSwapMode} className={`px-4 py-2 mt-12 text-white ${seatSwapMode === SeatSwapMode.INACTIVE ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} rounded focus:outline-none focus:ring`}>
          {seatSwapMode === SeatSwapMode.INACTIVE ? "座席を入れ替える" : "入れ替えを中止する"}
        </button>
        {student1 && student2 && (
          <button onClick={() => seatSwap(student1, student2)} className="px-4 py-2 mt-8 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring">
            入れ替え実行
          </button>
        )}
      </div>
    </div>
  );
};

export default AfterDisplayBeta;