import { useContext } from "react";
import { StudentContext } from "@/app/page";
import { LayoutContext } from "@/app/page";
import NewSeat from "@/components/storage/NewSeat";

const AfterDisplay = () => {

  const students = useContext(StudentContext);
  const layout = useContext(LayoutContext);

  if (!students || !layout) return;

  const culculateStudentsForDisplay = () => {
    const studentsForDisplay = students.map(student => ({
        ...student,
        currentSeat: { ...student.currentSeat },
        assignedSeat: { ...student.assignedSeat },
        studentsToPlaceNextTo: student.studentsToPlaceNextTo.map(s => ({ ...s })),
        studentsToPlaceWithinTwoSeats: student.studentsToPlaceWithinTwoSeats.map(s => ({ ...s })),
        studentsToPlaceAwayOneSeat: student.studentsToPlaceAwayOneSeat.map(s => ({ ...s })),
        studentsToPlaceAwayTwoSeats: student.studentsToPlaceAwayTwoSeats.map(s => ({ ...s }))
      }));
      studentsForDisplay.sort((a, b) => {
        const aValue = a.assignedSeat.from_front * layout.columns + -1 * (a.assignedSeat.from_right + 1 - layout.columns);
        const bValue = b.assignedSeat.from_front * layout.columns + -1 * (b.assignedSeat.from_right + 1 - layout.columns);
        return aValue - bValue;
      });
      console.log("studentsForDisplay:", studentsForDisplay);
      return studentsForDisplay;
  };

  const studentsForDisplay = culculateStudentsForDisplay();

  return (
    <div>
      <p className="p-5 text-center text-2xl font-bold text-gray-500">After</p>
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: `${layout.columns * 112}px` }}>
        {studentsForDisplay.map((student) => (
          <NewSeat key={student.index} student={student} />
        ))}
      </div>
    </div>
  );
};

export default AfterDisplay;
