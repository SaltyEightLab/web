import { Gender } from './Gender';
import { SeatType } from './SeatType';

export interface StudentType {
  index: number;
  studentName: string;
  currentSeat: SeatType;
  assignedSeat: SeatType;
  studentsToPlaceNextTo: Array<StudentType>; // 隣に配置するべき生徒
  studentsToPlaceWithinTwoSeats: Array<StudentType>; // 二席以内に配置するべき生徒
  studentsToPlaceAwayOneSeat: Array<StudentType>; // 一席以上離れて配置するべき生徒
  studentsToPlaceAwayTwoSeats: Array<StudentType>; // 二席以上離れて配置するべき生徒
  studentsWantingNextToMe: Array<StudentType>; // 自分の隣にいたい生徒
  studentsWantingWithinTwoSeatsOfMe: Array<StudentType>; // 自分の二席以内にいたい生徒
  studentsWantingAwayOneSeatFromMe: Array<StudentType>; // 自分と一席以上離れたい生徒
  studentsWantingAwayTwoSeatsFromMe: Array<StudentType>; // 自分と二席以上離れたい生徒
  prefersFrontRow: boolean; 
  prefersFrontTwoRows: boolean;
  prefersBackRow: boolean;
  prefersBackTwoRows: boolean;
  prefersLeftColumn: boolean;
  prefersRightColumn: boolean;
  prefersNearTeacher: boolean;
  gender: Gender;
  setStudentName: (index: number, name: string) => void;
}