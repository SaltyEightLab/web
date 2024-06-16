package com.example.api.seatarranger;

import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;

public class ClassRoomManager {

  private ClassRoom classRoom;
  private List<Student> students = new ArrayList<>();

  // コンストラクタ: ClassRoom オブジェクトを受け取り、メンバ変数に保存します。
  public ClassRoomManager(ClassRoom classRoom) {
    this.classRoom = classRoom;
  }

  // 教室の初期化: ClassRoom オブジェクトが持つ列数と行数に基づいて、Line オブジェクトと Seat オブジェクトを生成します。
  public void initializeClassRoom() {
    for (int i = 0; i < classRoom.getColumns(); i++) {
      Line line = new Line(i, classRoom);
      classRoom.addLineToClassRoom(line);
      for (int j = 0; j < classRoom.getRows(); j++) {
        Seat seat = new Seat(j, i, classRoom);
        line.addSeatToSeats(seat);
      }
    }

    for (Seat seat : classRoom.getAllSeats()) {
      seat.findAndSetInnerSurroundingSeats();
      seat.findAndSetOuterSurroundingSeats();
    }
  }

  // 生徒をリストに追加: 未配置の生徒をリストに追加します。
  public void addUnseatedStudent(Student student) {
    students.add(student);
  }

  // 生徒のリストを取得: 未配置の生徒のリストを返します。
  public List<Student> getUnseatedStudents() {
    List<Student> unseatedStudents = new ArrayList<>();
    for (Student student : students) {
      if (student.getAssignedSeat() == null) {
        unseatedStudents.add(student);
      }
    }
    return unseatedStudents;
  }

  // 座席数分の生徒を生み出し、List<Student> studentsに追加します。
  public void generateStudents() {
    List<Student> students = new ArrayList<>();
    List<Seat> allSeatsToBeUsed = classRoom.getSeatsToBeUsed();

    for (int i = 0; i < classRoom.getSeatsToBeUsed().size(); i++) {
      Student student = new Student(allSeatsToBeUsed.get(i), i);
      students.add(student);
      allSeatsToBeUsed.get(i).setCurrentStudent(student);
    }

    this.students = students;
  }

  public void setNameForStudentAtPosition(int row, int column, String name) {
    if (row < 0 || row >= classRoom.getRows()) {
      throw new IllegalArgumentException("不正なrow値です。");
    }
    if (column < 0 || column >= classRoom.getColumns()) {
      throw new IllegalArgumentException("不正なcolumns値です。");
    }
    if (name == null) {
      throw new IllegalArgumentException("nameをnullにはできません。");
    }
    classRoom.getSeatAtPosition(row, column).getCurrentStudent().setName(name);
  }

  public Student getStudentAtPosition(int row, int column) {
    if (row < 0 || row >= classRoom.getRows()) {
      throw new IllegalArgumentException("不正なrow値です。");
    }
    if (column < 0 || column >= classRoom.getColumns()) {
      throw new IllegalArgumentException("不正なcolumns値です。");
    }

    return classRoom.getSeatAtPosition(row, column).getCurrentStudent();
  }

  // private List<Student> studentsToPlaceNextTo = new ArrayList<>(); //
  // 隣に配置するべき生徒
  // private List<Student> studentsToPlaceWithinTwoSeats = new ArrayList<>(); //
  // 二席以内に配置するべき生徒
  // private List<Student> studentsToPlaceAwayOneSeat = new ArrayList<>(); //
  // 一席以上離れて配置するべき生徒
  // private List<Student> studentsToPlaceAwayTwoSeats = new ArrayList<>(); //
  // 二席以上離れて配置するべき生徒

  // private boolean prefersFrontRow = false; // 前から一行目を希望
  // private boolean prefersFrontTwoRows = false; // 前から一行目と二行目を希望
  // private boolean prefersBackRow = false; // 後ろから一行目を希望
  // private boolean prefersBackTwoRows = false; // 後ろから一行目と二行目を希望
  // private boolean prefersLeftColumn = false; // 左から一列目を希望
  // private boolean prefersRightColumn = false; // 右から一列目を希望
  // private boolean prefersNearTeacher = false; // 教師の近くを希望
  public void setSeatPreferenceForStudentAtPosition(
      int row,
      int column,
      SeatPreference seatPreference,
      boolean isPrefer) {
    if (row < 0 || row >= classRoom.getRows()) {
      throw new IllegalArgumentException("不正なrow値です。");
    }
    if (column < 0 || column >= classRoom.getColumns()) {
      throw new IllegalArgumentException("不正なcolumns値です。");
    }
    if (seatPreference == null) {
      throw new IllegalArgumentException("seatPreferenceはnullにできません。");
    }

    Student student = classRoom.getSeatAtPosition(row, column).getCurrentStudent();
    switch (seatPreference) {
      case BACK_ROW:
        student.setPrefersBackRow(isPrefer);
        break;
      case BACK_TWO_ROWS:
        student.setPrefersBackTwoRows(isPrefer);
        break;
      case FRONT_ROW:
        student.setPrefersFrontRow(isPrefer);
        break;
      case FRONT_TWO_ROWS:
        student.setPrefersFrontTwoRows(isPrefer);
        break;
      case LEFT_COLUMN:
        student.setPrefersLeftColumn(isPrefer);
        break;
      case NEAR_TEACHER:
        student.setPrefersNearTeacher(isPrefer);
        break;
      case RIGHT_COLUMN:
        student.setPrefersRightColumn(isPrefer);
        break;
    }
  }

  // private Gender studentGender = Gender.UNISEX;
  public void setGenderForStudentAtPosition(int row, int column, Gender gender) {
    if (row < 0 || row >= classRoom.getRows()) {
      throw new IllegalArgumentException("不正なrow値です。");
    }
    if (column < 0 || column >= classRoom.getColumns()) {
      throw new IllegalArgumentException("不正なcolumns値です。");
    }
    if (gender == null) {
      throw new IllegalArgumentException("genderをnullにはできません。");
    }
    classRoom.getSeatAtPosition(row, column).getCurrentStudent().setGender(gender);
  }

  public List<ForOutputStudent> getStudentsForOutput() {

    List<ForOutputStudent> outputStudents = new ArrayList<>();
    for (Student student : students) {
      ForOutputStudent outputStudent = new ForOutputStudent(
          student.getIDforBackend(),
          student.getName(),
          student.getAssignedSeat().getFromFront(),
          student.getAssignedSeat().getFromRight());
      outputStudents.add(outputStudent);
    }

    return outputStudents;
  }
}
