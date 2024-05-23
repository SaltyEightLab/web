import React, { useState, useEffect, useContext } from "react";
import { useSpring, animated } from "react-spring";
import PairSelecter from "./PairSelecter";
import { StudentContext } from "@/app/page";

interface StudentSelecterProps {
  isActive: boolean;
  label: string | null;
}

const StudentSelecter: React.FC<StudentSelecterProps> = ({ isActive, label }) => {
  const students = useContext(StudentContext); // StudentContextからstudentsを取得
  const [pairSelecters, setPairSelecters] = useState<{ id: number; student1: number; student2: number }[]>([
    { id: 0, student1: -1, student2: -1 },
  ]);

  const addPairSelecter = () => {
    setPairSelecters([...pairSelecters, { id: pairSelecters.length, student1: -1, student2: -1 }]);
  };

  const removePairSelecter = (id: number) => {
    setPairSelecters(pairSelecters.filter((pair) => pair.id !== id));
  };

  const handleSelectChange = (id: number, student1: number, student2: number) => {
    setPairSelecters(pairSelecters.map((pair) => (pair.id === id ? { ...pair, student1, student2 } : pair)));
  };

  useEffect(() => {
    if (students) {
      students.forEach((student) => (student.studentsToPlaceNextTo = []));
      pairSelecters.forEach((pair) => {
        if (pair.student1 !== -1 && pair.student2 !== -1) {
          students[pair.student1].studentsToPlaceNextTo.push(students[pair.student2]);
        }
      });
    }
  }, [pairSelecters, students]);

  const logFirstStudents = () => {
    pairSelecters.forEach((pair, index) => {
      if (pair.student1 !== -1 && students) {
        console.log(`Student ${index}:`, students[pair.student1]);
      }
    });
  };

  const extensionAnimation = useSpring({
    to: { width: isActive ? "300px" : "0px", opacity: isActive ? 1 : 0 },
    from: { width: "0px", opacity: 0 },
    config: { tension: 500, friction: 50 },
  });

  return (
    <animated.div style={extensionAnimation} className="bg-white flex-shrink-0 z-50 p-4 rounded-lg shadow-sm overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{label}</h2>
      {pairSelecters.map((pair) => (
        <PairSelecter
          key={pair.id}
          onRemove={() => removePairSelecter(pair.id)}
          label={label}
          onSelect={(student1, student2) => handleSelectChange(pair.id, student1, student2)}
        />
      ))}
      <button onClick={addPairSelecter} className="mt-4 ml-8 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300">
        組み合わせを追加
      </button>
      <button onClick={logFirstStudents} className="mt-4 ml-8 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300">
        仮のボタン
      </button>
    </animated.div>
  );
};

export default StudentSelecter;