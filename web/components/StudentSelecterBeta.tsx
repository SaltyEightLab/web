import React, { useState, useEffect, useContext } from "react";
import PairSelecterBeta from "./PairSelecterBeta";
import { StudentContext } from "@/app/page";
import { EachLabelContext } from "@/context/EachLabelContext";

interface StudentSelecterProps {
  isActive: boolean;
  label: string | null;
}

const StudentSelecterBeta: React.FC<StudentSelecterProps> = ({ isActive, label }) => {
  const studentsContext = useContext(StudentContext);
  const students = studentsContext?.students || [];
  const updateStudents = studentsContext?.updateStudents;
  const eachLabelContext = useContext(EachLabelContext);

  if (!eachLabelContext) {
    throw new Error("StudentSelecter must be used within a EachLabelContextProvider");
  }

  const { nextToPairs, withInTwoSeatsPairs, awayOneSeatsPairs, awayTwoSeatsPairs, setNextToPairs, setWithInTwoSeatsPairs, setAwayOneSeatsPairs, setAwayTwoSeatsPairs } = eachLabelContext;

  const pairs = (() => {
    if (label === "隣") {
      return nextToPairs;
    } else if (label === "２席以内") {
      return withInTwoSeatsPairs;
    } else if (label === "１席離す") {
      return awayOneSeatsPairs;
    } else if (label === "２席離す") {
      return awayTwoSeatsPairs;
    } else {
      return [];
    }
  })();

  const setPairs = (() => {
    if (label === "隣") {
      return setNextToPairs;
    } else if (label === "２席以内") {
      return setWithInTwoSeatsPairs;
    } else if (label === "１席離す") {
      return setAwayOneSeatsPairs;
    } else if (label === "２席離す") {
      return setAwayTwoSeatsPairs;
    } else {
      return () => {};
    }
  })();

  const addPairSelecter = () => {
    setPairs([...pairs, { index: pairs.length, student1: -1, student2: -1 }]);
  };

  const removePairSelecter = (id: number) => {
    setPairs(pairs.filter((pair) => pair.index !== id));
  };

  const handleSelectChange = (id: number, student1: number, student2: number) => {
    setPairs(pairs.map((pair) => (pair.index === id ? { ...pair, student1, student2 } : pair)));
  };

  useEffect(() => {
    if (students) {
      students.forEach((student) => {
        if (label === "隣") {
          student.studentsToPlaceNextTo = [];
        } else if (label === "２席以内") {
          student.studentsToPlaceWithinTwoSeats = [];
        } else if (label === "１席離す") {
          student.studentsToPlaceAwayOneSeat = [];
        } else if (label === "２席離す") {
          student.studentsToPlaceAwayTwoSeats = [];
        }
      });

      pairs.forEach((pair) => {
        if (pair.student1 !== -1 && pair.student2 !== -1) {
          if (label === "隣") {
            students[pair.student1].studentsToPlaceNextTo.push(students[pair.student2]);
          } else if (label === "２席以内") {
            students[pair.student1].studentsToPlaceWithinTwoSeats.push(students[pair.student2]);
          } else if (label === "１席離す") {
            students[pair.student1].studentsToPlaceAwayOneSeat.push(students[pair.student2]);
          } else if (label === "２席離す") {
            students[pair.student1].studentsToPlaceAwayTwoSeats.push(students[pair.student2]);
          }
        }
      });
    }
  }, [pairs, students, label]);

  return (
    <div className={`ml-5 bg-gray-50 flex-shrink-0 z-50 p-4 rounded-lg overflow-hidden ${isActive ? "block" : "hidden"}`} style={{ width: isActive ? "300px" : "0px", opacity: isActive ? 1 : 0 }}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{label}</h2>
      {pairs.map((pair) => (
        <PairSelecterBeta
          key={pair.index}
          onRemove={() => removePairSelecter(pair.index)}
          label={label}
          onSelect={(student1, student2) => handleSelectChange(pair.index, student1, student2)}
          student1={pair.student1}
          student2={pair.student2}
        />
      ))}
      <button onClick={addPairSelecter} className="mt-4 ml-8 px-4 py-2 bg-yellow-300 text-black rounded-lg shadow hover:bg-yellow-200 transition duration-300">
        組み合わせを追加
      </button>
    </div>
  );
};

export default StudentSelecterBeta;