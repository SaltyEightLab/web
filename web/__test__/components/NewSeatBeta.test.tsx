import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewSeatBeta from '../../components/NewSeatBeta';
import { StudentType } from '../../types/StudentType';
import { Gender } from '../../types/Gender';
import { SeatSwapMode } from '../../types/SeatSwapMode';

const mockStudent: StudentType = {
  index: 0,
  IDforBackend: 1,
  name: 'テスト 太郎',
  currentSeat: { from_front: 0, from_right: 0 },
  assignedSeat: { from_front: 0, from_right: 0 },
  prefersFrontRow: false,
  prefersFrontTwoRows: false,
  prefersBackRow: false,
  prefersBackTwoRows: false,
  prefersLeftColumn: false,
  prefersRightColumn: false,
  prefersNearTeacher: false,
  gender: Gender.MALE,
  setStudentName: jest.fn(),
  setGender: jest.fn(),
  studentsToPlaceNextTo: [],
  studentsToPlaceWithinTwoSeats: [],
  studentsToPlaceAwayOneSeat: [],
  studentsToPlaceAwayTwoSeats: [],
};

const mockOnStudentClick = jest.fn();

describe('NewSeatBeta', () => {
  it('正しく生徒名を表示する', () => {
    render(<NewSeatBeta student={mockStudent} seatSwapMode={SeatSwapMode.INACTIVE} onStudentClick={mockOnStudentClick} />);
    expect(screen.getByText('テスト 太郎')).toBeInTheDocument();
  });

  it('クリック時にonStudentClickが呼ばれる', () => {
    render(<NewSeatBeta student={mockStudent} seatSwapMode={SeatSwapMode.INACTIVE} onStudentClick={mockOnStudentClick} />);
    fireEvent.click(screen.getByText('テスト 太郎'));
    expect(mockOnStudentClick).toHaveBeenCalledWith(mockStudent);
  });

  it('性別に応じて正しい背景色が設定される', () => {
    const { rerender } = render(<NewSeatBeta student={mockStudent} seatSwapMode={SeatSwapMode.INACTIVE} onStudentClick={mockOnStudentClick} />);
    expect(screen.getByText('テスト 太郎')).toHaveStyle('background-color: #d0e7ff');

    const femaleStudent = { ...mockStudent, gender: Gender.FEMALE };
    rerender(<NewSeatBeta student={femaleStudent} seatSwapMode={SeatSwapMode.INACTIVE} onStudentClick={mockOnStudentClick} />);
    expect(screen.getByText('テスト 太郎')).toHaveStyle('background-color: #ffd0e7');
  });

  it('SeatSwapModeに応じて正しいボーダースタイルが設定される', () => {
    const { rerender } = render(<NewSeatBeta student={mockStudent} seatSwapMode={SeatSwapMode.INACTIVE} onStudentClick={mockOnStudentClick} />);
    expect(screen.getByText('テスト 太郎')).toHaveStyle('border: 1px solid #f3f4f6');

    rerender(<NewSeatBeta student={mockStudent} seatSwapMode={SeatSwapMode.CELECTING} onStudentClick={mockOnStudentClick} />);
    fireEvent.click(screen.getByText('テスト 太郎'));
    expect(screen.getByText('テスト 太郎')).toHaveStyle('border: 2px solid #3b82f6');
  });

  it('Gender.IsNotToBeUsedの場合、正しい背景色とボックスシャドウが設定される', () => {
    const notToBeUsedStudent = { ...mockStudent, gender: Gender.IsNotToBeUsed };
    render(<NewSeatBeta student={notToBeUsedStudent} seatSwapMode={SeatSwapMode.INACTIVE} onStudentClick={mockOnStudentClick} />);
    const studentElement = screen.getByText('テスト 太郎');
    expect(studentElement).toHaveStyle('background-color: #FFFFFF');
    expect(studentElement).toHaveStyle('box-shadow: none');
  });

  it('SeatSwapMode.CELECTEDの場合、正しいボーダースタイルが設定される', () => {
    render(<NewSeatBeta student={mockStudent} seatSwapMode={SeatSwapMode.CELECTED} onStudentClick={mockOnStudentClick} />);
    const studentElement = screen.getByText('テスト 太郎');
    fireEvent.click(studentElement);
    expect(studentElement).toHaveStyle('border: 2px solid #3b82f6');
  });

  it('SeatSwapModeがINACTIVEに変更されたとき、フォーカスが解除される', () => {
    const { rerender } = render(<NewSeatBeta student={mockStudent} seatSwapMode={SeatSwapMode.CELECTING} onStudentClick={mockOnStudentClick} />);
    const studentElement = screen.getByText('テスト 太郎');
    fireEvent.click(studentElement);
    expect(studentElement).toHaveStyle('border: 2px solid #3b82f6');

    rerender(<NewSeatBeta student={mockStudent} seatSwapMode={SeatSwapMode.INACTIVE} onStudentClick={mockOnStudentClick} />);
    expect(studentElement).toHaveStyle('border: 1px solid #f3f4f6');
  });

  it('onBlurイベントでフォーカスが解除される', () => {
    render(<NewSeatBeta student={mockStudent} seatSwapMode={SeatSwapMode.CELECTING} onStudentClick={mockOnStudentClick} />);
    const studentElement = screen.getByText('テスト 太郎');
    fireEvent.click(studentElement);
    expect(studentElement).toHaveStyle('border: 2px solid #3b82f6');

    fireEvent.blur(studentElement);
    expect(studentElement).toHaveStyle('border: 1px solid #f3f4f6');
  });

  it('デフォルトの性別の場合、正しい背景色が設定される', () => {
    const defaultGenderStudent = { ...mockStudent, gender: 'UNKNOWN' as Gender };
    render(<NewSeatBeta student={defaultGenderStudent} seatSwapMode={SeatSwapMode.INACTIVE} onStudentClick={mockOnStudentClick} />);
    expect(screen.getByText('テスト 太郎')).toHaveStyle('background-color: #f3f4f6');
  });

  it('SeatSwapMode.CELECTINGの場合でクリックしない場合、ボーダースタイルが変更されない', () => {
    render(<NewSeatBeta student={mockStudent} seatSwapMode={SeatSwapMode.CELECTING} onStudentClick={mockOnStudentClick} />);
    expect(screen.getByText('テスト 太郎')).toHaveStyle('border: 1px solid #f3f4f6');
  });
});