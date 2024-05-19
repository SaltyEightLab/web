import { SeatType } from "./SeatType";
import { Gender } from "./Gender";

export interface Student {
  currentSeat: SeatType | null;
  assignedSeat: SeatType | null;
  ID: number;
  name: string;
  studentsToPlaceNextTo: Array<Student>;
  studentsToPlaceWithinTwoSeats: Array<Student>;
  studentsToPlaceAwayOneSeat: Array<Student>;
  studentsToPlaceAwayTwoSeats: Array<Student>;
  studentsWantingNextToMe: Array<Student>;
  studentsWantingWithinTwoSeatsOfMe: Array<Student>;
  studentsWantingAwayOneSeatFromMe: Array<Student>;
  studentsWantingAwayTwoSeatsFromMe: Array<Student>;
  prefersFrontRow: boolean;
  prefersFrontTwoRows: boolean;
  prefersBackRow: boolean;
  prefersBackTwoRows: boolean;
  prefersLeftColumn: boolean;
  prefersRightColumn: boolean;
  prefersNearTeacher: boolean;
  gender: Gender | null;
  setName: (ID: number, name: string) => void;
}