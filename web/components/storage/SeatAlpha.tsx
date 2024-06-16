import React, { useState } from 'react';
import { StudentType } from '@/types/StudentType';
import { Gender } from '@/types/Gender';

interface SeatAlphaProps {
  student: StudentType;
}

const SeatAlpha: React.FC<SeatAlphaProps> = ({ student }) => {
  const { index, name: studentName, gender, setStudentName, setGender } = student;
  const [isFocused, setIsFocused] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStudentName(index, event.target.value);
  };

  const handleGenderClick = () => {
    if (isFocused) {
      const nextGender = gender === Gender.UNISEX ? Gender.MALE : gender === Gender.MALE ? Gender.FEMALE : gender === Gender.FEMALE ? Gender.IsNotToBeUsed : Gender.UNISEX;
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
      case Gender.IsNotToBeUsed:
        return '#FFFFFF'; // 真っ白
      default:
        return '#f3f4f6'; // デフォルトの背景色
    }
  };

  return (
    <div onClick={handleGenderClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', width: '96px', margin: '8px', backgroundColor: getBackgroundColor(), borderRadius: '0.375rem', border: '1px solid #f3f4f6', boxShadow: gender === Gender.IsNotToBeUsed ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <textarea
        id={`studentName-${index}`}
        value={gender === Gender.IsNotToBeUsed ? "" : studentName}
        onChange={gender === Gender.IsNotToBeUsed ? undefined : handleNameChange}
        onBlur={handleBlur}
        placeholder={gender === Gender.IsNotToBeUsed ? "座席なし" : "生徒の名前"}
        style={{
          width: '96px',
          height: '64px',
          padding: '8px',
          margin: '8px',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#1f2937',
          fontSize: '0.75rem',
          textAlign: 'center',
          resize: 'none',
          overflow: 'hidden',
          display: 'flex',
          // alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}
        readOnly={gender === Gender.IsNotToBeUsed}
      />
    </div>
  );
};

export default SeatAlpha;

