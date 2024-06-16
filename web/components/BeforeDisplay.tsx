import { useContext } from "react";
import { StudentContext } from "@/app/page";
import { LayoutContext } from "@/app/page";
import SeatBeta from "./SeatBeta";

const BeforeDisplay = () => {
  const students = useContext(StudentContext);
  const layout = useContext(LayoutContext);

  if (!students || !layout) return;

  const columns = layout.columns;

  return (
    <div>
      <p className="p-5 text-center text-2xl font-bold text-gray-500">Before</p>
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: `${columns * 112}px` }}>
        {students.map((student) => (
          <SeatBeta key={student.index} student={student} />
        ))}
      </div>
    </div>
  );
};

export default BeforeDisplay;
