import React, { useState } from "react";
import { StudentType } from "@/types/StudentType";
import { Gender } from "@/types/Gender";

interface NewSeatProps {
  student: StudentType;
}

const NewSeat: React.FC<NewSeatProps> = ({ student }) => {
  const { index, name: studentName, gender, setStudentName, setGender } = student;
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {};

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getBackgroundColor = () => {
    switch (gender) {
      case Gender.MALE:
        return "#d0e7ff"; // 薄い青
      case Gender.FEMALE:
        return "#ffd0e7"; // 薄いピンク
      default:
        return "#f3f4f6"; // デフォルトの背景色
    }
  };

  return (
    <div
      onClick={handleClick}
      id={`studentName-${index}`}
      onBlur={handleBlur}
      style={{
        width: "96px",
        height: "64px",
        padding: "8px",
        margin: "8px",
        backgroundColor: getBackgroundColor(),
        borderRadius: "0.375rem",
        border: "1px solid #f3f4f6",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        color: "#1f2937",
        fontSize: "0.875rem",
        textAlign: "center",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {studentName}
    </div>
  );
};

export default NewSeat;
