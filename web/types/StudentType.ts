import { Gender } from './Gender';
import { SeatType } from './SeatType';

export interface StudentType {
  index: number;
  IDforBackend: number;
  name: string;
  currentSeat: SeatType;
  assignedSeat: SeatType;
  prefersFrontRow: boolean; 
  prefersFrontTwoRows: boolean;
  prefersBackRow: boolean;
  prefersBackTwoRows: boolean;
  prefersLeftColumn: boolean;
  prefersRightColumn: boolean;
  prefersNearTeacher: boolean;
  gender: Gender;
  setStudentName: (index: number, name: string) => void;
  setGender: (index: number, gender: Gender) => void; // 追加
  studentsToPlaceNextTo: Array<StudentType>;
  studentsToPlaceWithinTwoSeats: Array<StudentType>;
  studentsToPlaceAwayOneSeat: Array<StudentType>;
  studentsToPlaceAwayTwoSeats: Array<StudentType>;
}