import React from 'react';
import { StudentType } from '../app/page'; // StudentType をインポート

interface SeatProps {
  student: StudentType;
}

const Seat: React.FC<SeatProps> = ({ student }) => {
  const { index, studentName, setStudentName } = student;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentName(index, event.target.value);
  };

  return (
    <input
      type="text"
      id={`studentName-${index}`}
      value={studentName}
      onChange={handleNameChange}
      placeholder="生徒の名前"
      style={{
        width: '96px',
        height: '64px',
        padding: '8px',
        margin: '8px',
        backgroundColor: '#f3f4f6',
        borderRadius: '0.375rem',
        border: '1px solid #f3f4f6',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        color: '#1f2937',
        fontSize: '0.875rem',
        textAlign: 'center'
      }}
    />
  );
};

export default Seat;