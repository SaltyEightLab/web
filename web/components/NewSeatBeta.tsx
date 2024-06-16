import React, { useState, useEffect } from "react";
import { StudentType } from "@/types/StudentType";
import { Gender } from "@/types/Gender";
import { SeatSwapMode } from "@/types/SeatSwapMode";

interface NewSeatProps {
  student: StudentType;
  seatSwapMode: SeatSwapMode;
  onStudentClick: (student: StudentType) => void;
}

const NewSeatBeta: React.FC<NewSeatProps> = ({ student, seatSwapMode, onStudentClick }) => {
  const { index, name: studentName, gender, setStudentName, setGender } = student;
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    onStudentClick(student);
    if (seatSwapMode !== SeatSwapMode.INACTIVE) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (seatSwapMode === SeatSwapMode.INACTIVE) {
      setIsFocused(false);
    }
  }, [seatSwapMode]);

  const getBackgroundColor = () => {
    switch (gender) {
      case Gender.MALE:
        return '#d0e7ff'; // 薄い青
      case Gender.FEMALE:
        return '#ffd0e7'; // 薄いピンク
      case Gender.IsNotToBeUsed:
        return '#FFFFFF'; // 真っ白
      default:
        return '#f3f4f6'; // デフォルトの背景色
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
        border: seatSwapMode === SeatSwapMode.INACTIVE ? "1px solid #f3f4f6" : isFocused ? "2px solid #3b82f6" : "1px solid #f3f4f6", // フォーカス時の枠線を変更
        boxShadow: gender === Gender.IsNotToBeUsed ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)',
        color: "#1f2937",
        fontSize: "0.75rem",
        textAlign: "center",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        wordWrap: "break-word",
        whiteSpace: "normal",
      }}
    >
      {studentName}
    </div>
  );
};

export default NewSeatBeta;