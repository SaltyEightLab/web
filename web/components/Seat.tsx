import React, { useState } from 'react';
import { StudentType } from '@/types/StudentType';
import { Gender } from '@/types/Gender';

interface SeatProps {
  student: StudentType;
}

const Seat: React.FC<SeatProps> = ({ student }) => {
  const { index, name: studentName, gender, setStudentName, setGender } = student;
  const [isFocused, setIsFocused] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentName(index, event.target.value);
  };

  const handleGenderClick = () => {
    if (isFocused) {
      const nextGender = gender === Gender.MALE ? Gender.FEMALE : gender === Gender.FEMALE ? Gender.UNISEX : Gender.MALE;
      setGender(index, nextGender);
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getBackgroundColor = () => {
    switch (gender) {
      case Gender.MALE:
        return '#d0e7ff'; // 薄い青
      case Gender.FEMALE:
        return '#ffd0e7'; // 薄いピンク
      default:
        return '#f3f4f6'; // デフォルトの背景色
    }
  };

  return (
    <div onClick={handleGenderClick} style={{ cursor: 'pointer' }}>
      <input
        type="text"
        id={`studentName-${index}`}
        value={studentName}
        onChange={handleNameChange}
        onBlur={handleBlur}
        placeholder="生徒の名前"
        style={{
          width: '96px',
          height: '64px',
          padding: '8px',
          margin: '8px',
          backgroundColor: getBackgroundColor(),
          borderRadius: '0.375rem',
          border: '1px solid #f3f4f6',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          color: '#1f2937',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}
      />
    </div>
  );
};

export default Seat;