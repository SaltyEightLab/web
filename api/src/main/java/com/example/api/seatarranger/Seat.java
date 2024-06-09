package com.example.api.seatarranger;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Seat {

  @JsonProperty("from_front")
  private final int FROM_FRONT;

  @JsonProperty("from_right")
  private final int FROM_RIGHT;

  private boolean isToBeUsed = true;

  private Student currentStudent;

  private Student assignedStudent;

  private boolean isNearTeacher = false;

  private Gender seatGender = Gender.UNISEX;

  private List<Seat> innerSurroundingSeats = new ArrayList<>(); // 直接囲む生徒のリスト

  private List<Seat> outerSurroundingSeats = new ArrayList<>(); // さらに外側を囲む生徒のリスト

  private ClassRoom classRoom;

  public Seat(@JsonProperty("from_front") int fromFront, @JsonProperty("from_right") int fromRight) {
    // if (fromFront < 0 || fromFront >= classRoom.getRows()) {
    // throw new IllegalArgumentException("無効なfromFront値です。");
    // }
    // if (fromRight < 0 || fromRight >= classRoom.getColumns()) {
    // throw new IllegalArgumentException("無効なfromRight値です。");
    // }
    this.FROM_FRONT = fromFront;
    this.FROM_RIGHT = fromRight;
  }

  public void setClassRoom(ClassRoom classRoom) {
    this.classRoom = classRoom;
  }

  // コンストラクタ
  public Seat(int fromFront, int fromRight, ClassRoom classRoom) {
    if (fromFront < 0 || fromFront >= classRoom.getRows()) {
      throw new IllegalArgumentException("無効なfromFront値です。");
    }
    if (fromRight < 0 || fromRight >= classRoom.getColumns()) {
      throw new IllegalArgumentException("無効なfromRight値です。");
    }
    this.FROM_FRONT = fromFront;
    this.FROM_RIGHT = fromRight;
    this.classRoom = classRoom;
  }

  public String toString() {
    return "(" + this.FROM_FRONT + "," + this.FROM_RIGHT + "), " + this.seatGender;
  }

  // 座席の位置情報を取得するメソッド
  public int getFromFront() {
    return FROM_FRONT;
  }

  public int getFromBack() {
    return classRoom.getRows() - FROM_FRONT - 1;
  }

  public int getFromRight() {
    return FROM_RIGHT;
  }

  public int getFromLeft() {
    return classRoom.getColumns() - FROM_RIGHT - 1;
  }

  public boolean isToBeUsed() {
    return isToBeUsed;
  }

  public void setToBeUsed(boolean isToBeUsed) {
    this.isToBeUsed = isToBeUsed;
  }

  public Student getCurrentStudent() {
    return currentStudent;
  }

  public void setCurrentStudent(Student currentStudent) {
    if (!this.isToBeUsed) {
      throw new IllegalArgumentException("isToBeUsedがfalseの座席にcurrentStudentを割り振ることはできません。");
    }
    if (currentStudent == null) {
      throw new IllegalArgumentException("currentStudentはnullにできません。");
    }
    if (!currentStudent.getCurrentSeat().equals(this)) {
      throw new IllegalArgumentException("指定された生徒はすでにcurrentSeatが割り当てられています。");
    }
    this.currentStudent = currentStudent;
  }

  public Student getAssignedStudent() {
    return assignedStudent;
  }

  public void setAssignedStudent(Student assignedStudent) {
    if (!this.isToBeUsed) {
      throw new IllegalArgumentException("isToBeUsedがfalseの座席にassignedStudentを割り振ることはできません。");
    }
    if (assignedStudent == null) {
      throw new IllegalArgumentException("assignedStudentはnullにできません。");
    }
    if (!assignedStudent.getAssignedSeat().equals(this)) {
      throw new IllegalArgumentException(assignedStudent + "にはすでにassignedSeatが割り当てられています。");
    }
    this.assignedStudent = assignedStudent;
  }

  public boolean isNearTeacher() {
    return isNearTeacher;
  }

  public void setNearTeacher(boolean isNearTeacher) {
    this.isNearTeacher = isNearTeacher;
  }

  public Gender getSeatGender() {
    return seatGender;
  }

  public void setSeatGender(Gender seatGender) {
    this.seatGender = seatGender;
  }

  public List<Seat> getInnerSurroundingSeats() {
    return innerSurroundingSeats;
  }

  public List<Seat> getOuterSurroundingSeats() {
    return outerSurroundingSeats;
  }

  // この座席に隣接する８つの座席を取得し、innerSurroundingSeatに代入します。
  public void findAndSetInnerSurroundingSeats() {
    List<Seat> temporaryInnerSurroundingSeats = new ArrayList<>();
    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        if (i == 0 && j == 0)
          continue; // スキップ

        int neighborFromRight = this.FROM_RIGHT + i;
        int neighborFromFront = this.FROM_FRONT + j;

        if (neighborFromRight >= 0 &&
            neighborFromFront >= 0 &&
            neighborFromRight < classRoom.getColumns() &&
            neighborFromFront < classRoom.getRows()) {
          Seat seat = classRoom.getSeatAtPosition(neighborFromFront, neighborFromRight);
          if (seat != null) {
            temporaryInnerSurroundingSeats.add(seat);
          }
        }
      }
    }
    this.innerSurroundingSeats = temporaryInnerSurroundingSeats;
  }

  public void findAndSetOuterSurroundingSeats() {
    List<Seat> temporaryOuterSurroundingSeats = new ArrayList<>();
    for (int i = -2; i <= 2; i++) {
      for (int j = -2; j <= 2; j++) {
        if (i >= -1 && i <= 1 && j >= -1 && j <= 1)
          continue;

        int outerNeighborFromRight = this.FROM_RIGHT + i;
        int outerNeighborFromFront = this.FROM_FRONT + j;

        if (outerNeighborFromRight >= 0 &&
            outerNeighborFromFront >= 0 &&
            outerNeighborFromRight < classRoom.getColumns() &&
            outerNeighborFromFront < classRoom.getRows()) {
          Seat seat = classRoom.getSeatAtPosition(outerNeighborFromFront, outerNeighborFromRight);
          if (seat != null) {
            temporaryOuterSurroundingSeats.add(seat);
          }
        }
      }
    }
    this.outerSurroundingSeats = temporaryOuterSurroundingSeats;
  }
}
