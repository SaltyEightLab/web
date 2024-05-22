package com.example.api.seatarranger;

import java.util.ArrayList;
import java.util.List;

public class Student {

  private Seat currentSeat;
  private Seat assignedSeat;
  private final int ID;
  private String name;
  private List<Student> studentsToPlaceNextTo = new ArrayList<>(); // 隣に配置するべき生徒
  private List<Student> studentsToPlaceWithinTwoSeats = new ArrayList<>(); // 二席以内に配置するべき生徒
  private List<Student> studentsToPlaceAwayOneSeat = new ArrayList<>(); // 一席以上離れて配置するべき生徒
  private List<Student> studentsToPlaceAwayTwoSeats = new ArrayList<>(); // 二席以上離れて配置するべき生徒
  private List<Student> studentsWantingNextToMe = new ArrayList<>(); // 自分の隣にいたい生徒
  private List<Student> studentsWantingWithinTwoSeatsOfMe = new ArrayList<>(); // 自分の二席以内にいたい生徒
  private List<Student> studentsWantingAwayOneSeatFromMe = new ArrayList<>(); // 自分と一席以上離れたい生徒
  private List<Student> studentsWantingAwayTwoSeatsFromMe = new ArrayList<>(); // 自分と二席以上離れたい生徒
  private boolean prefersFrontRow = false; // 前から一行目を希望
  private boolean prefersFrontTwoRows = false; // 前から一行目と二行目を希望
  private boolean prefersBackRow = false; // 後ろから一行目を希望
  private boolean prefersBackTwoRows = false; // 後ろから一行目と二行目を希望
  private boolean prefersLeftColumn = false; // 左から一列目を希望
  private boolean prefersRightColumn = false; // 右から一列目を希望
  private boolean prefersNearTeacher = false; // 教師の近くを希望
  private Gender gender = Gender.UNISEX;
  private int difficultyScore = 10;
  private Student backtrackStudent = null;
  private boolean isVisited = false;
  private int DFSChainScore;

  public Student(Seat currentSeat, int ID) {
    if (currentSeat == null) {
      throw new IllegalArgumentException("currentSeatをnullにはできません。");
    }
    if (ID < 0) {
      throw new IllegalArgumentException("IDが不正な値です。");
    }
    this.currentSeat = currentSeat;
    this.ID = ID;
  }

  public String toString() {
    return (
      this.name +
      " , DFSChainScore:" +
      this.DFSChainScore +
      " , DifficultyScore" +
      this.difficultyScore +
      " , ID:" +
      this.ID +
      " , currentSeat:" +
      this.getCurrentSeat() +
      " , assignedSeat:" +
      this.assignedSeat
    );
  }

  public int getID() {
    return ID;
  }

  public Student getBacktrackStudent() {
    return backtrackStudent;
  }

  public void setBacktrackStudent(Student backtrackStudent) {
    this.backtrackStudent = backtrackStudent;
  }

  public boolean isVisited() {
    return isVisited;
  }

  public void setVisited(boolean isVisited) {
    this.isVisited = isVisited;
  }

  public int getDFSChainScore() {
    return DFSChainScore;
  }

  public void setDFSChainScore(int dFSChainScore) {
    DFSChainScore = dFSChainScore;
  }

  public Seat getCurrentSeat() {
    return currentSeat;
  }

  public void setCurrentSeat(Seat currentSeat) {
    if (currentSeat == null) {
      throw new IllegalArgumentException("currentSeatをnullにはできません。");
    }
    if (!currentSeat.isToBeUsed()) {
      throw new IllegalArgumentException("curentSeat.isToBeUsedがfalseです。");
    }
    this.currentSeat = currentSeat;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Seat getAssignedSeat() {
    return assignedSeat;
  }

  public void setAssignedSeat(Seat assignedSeat) {
    if (assignedSeat == null) {
      throw new IllegalArgumentException("assignedSeatをnullにはできません。");
    }
    if (!assignedSeat.isToBeUsed()) {
      throw new IllegalArgumentException("assignedSeat.isToBeUsedがfalseです。");
    }
    if (assignedSeat.getAssignedStudent() != null) {
      throw new IllegalArgumentException(
        "この座席にはすでに、" + assignedSeat.getAssignedStudent() + "が割り当てられています。"
      );
    }
    this.assignedSeat = assignedSeat;
  }

  public List<Student> getStudentsToPlaceNextTo() {
    return studentsToPlaceNextTo;
  }

  public List<Student> getStudentsToPlaceWithinTwoSeats() {
    return studentsToPlaceWithinTwoSeats;
  }

  public List<Student> getStudentsToPlaceAwayOneSeat() {
    return studentsToPlaceAwayOneSeat;
  }

  public List<Student> getStudentsToPlaceAwayTwoSeats() {
    return studentsToPlaceAwayTwoSeats;
  }

  // 一席以内に配置するべき生徒を追加するメソッド
  public void addStudentsToPlaceNextTo(Student... students) {
    for (Student student : students) {
      if (student == null) {
        throw new IllegalArgumentException("追加する生徒はnullであってはなりません。");
      }
      if (this.equals(student)) {
        throw new IllegalArgumentException("生徒は自分自身を二席以内に配置するリストに追加できません。");
      }
      if (!studentsToPlaceNextTo.contains(student)) {
        studentsToPlaceNextTo.add(student);
        addStudentsWantingNextToMe(student);
      } else {
        System.out.println(student + "は既にListに含まれているため追加しませんでした。");
      }
    }
  }

  // 二席以内に配置するべき生徒を追加するメソッド
  public void addStudentsToPlaceWithinTwoSeats(Student... students) {
    for (Student student : students) {
      if (student == null) {
        throw new IllegalArgumentException("追加する生徒はnullであってはなりません。");
      }
      if (this.equals(student)) {
        throw new IllegalArgumentException("生徒は自分自身を二席以内に配置するリストに追加できません。");
      }
      if (!studentsToPlaceWithinTwoSeats.contains(student) && !studentsToPlaceAwayOneSeat.contains(student)) {
        studentsToPlaceWithinTwoSeats.add(student);
        addStudentsWantingWithinTwoSeatsOfMe(student);
      } else {
        System.out.println(
          student +
          "は既にstudentsToPlaceWithinTwoSeatsまたはstudentsToPlaceAwayOneSeatに含まれているため追加しませんでした。"
        );
      }
    }
  }

  // 二席以上離れて配置するべき生徒を追加するメソッド
  public void addStudentsToPlaceAwayTwoSeats(Student... students) {
    for (Student student : students) {
      if (student == null) {
        throw new IllegalArgumentException("追加する生徒はnullであってはなりません。");
      }
      if (this.equals(student)) {
        throw new IllegalArgumentException("生徒は自分自身を二席以上離れて配置するリストに追加できません。");
      }
      if (!studentsToPlaceAwayTwoSeats.contains(student) && !studentsToPlaceAwayOneSeat.contains(student)) {
        studentsToPlaceAwayTwoSeats.add(student);
        addStudentsWantingAwayOneSeatFromMe(student);
      } else {
        System.out.println(
          student +
          "は既にstudentsToPlaceAwayTwoSeatsまたはstudentsToPlaceAwayOneSeat含まれているため追加しませんでした。"
        );
      }
    }
  }

  // 一席以上離れて配置するべき生徒を追加するメソッド
  public void addStudentsToPlaceAwayOneSeat(Student... students) {
    for (Student student : students) {
      if (student == null) {
        throw new IllegalArgumentException("追加する生徒はnullであってはなりません。");
      }
      if (this.equals(student)) {
        throw new IllegalArgumentException("生徒は自分自身を隣に配置するリストに追加できません。");
      }
      if (student != null && !this.equals(student) && !studentsToPlaceAwayOneSeat.contains(student)) {
        studentsToPlaceAwayOneSeat.add(student);
        addStudentsWantingAwayTwoSeatsFromMe(student);
      } else {
        System.out.println(student + "は既にListに含まれているため追加しませんでした。");
      }
    }
  }

  // StudentsWantingNextToMeのゲッター
  public List<Student> getStudentsWantingNextToMe() {
    return studentsWantingNextToMe;
  }

  // StudentsWantingWithinTwoSeatsOfMeのゲッター
  public List<Student> getStudentsWantingWithinTwoSeatsOfMe() {
    return studentsWantingWithinTwoSeatsOfMe;
  }

  // StudentsWantingAwayOneSeatFromMeのゲッター
  public List<Student> getStudentsWantingAwayOneSeatFromMe() {
    return studentsWantingAwayOneSeatFromMe;
  }

  // StudentsWantingAwayTwoSeatsFromMeのゲッター
  public List<Student> getStudentsWantingAwayTwoSeatsFromMe() {
    return studentsWantingAwayTwoSeatsFromMe;
  }

  // private List<Student> studentsWantingNextToMe自分を隣にいたい生徒へ追加するメソッド
  public void addStudentsWantingNextToMe(Student student) {
    if (student == null) {
      throw new IllegalArgumentException("Studentをnullにはできません。");
    }
    if (this.equals(student)) {
      throw new IllegalArgumentException("生徒は自分自身をリストに追加することはできません。");
    }
    if (student != null && !this.equals(student) && !studentsWantingNextToMe.contains(student)) {
      System.out.println(student + "のstudentsWantingNextToMeに" + this + "を追加しました。");
      student.studentsWantingNextToMe.add(this);
    } else {
      System.out.println(student + "はすでにリストに含まれているため追加しませんでした。");
    }
  }

  // private List<Student> studentsWantingWithinTwoSeatsOfMe自分を二席以内にいたい生徒へ追加するメソッド
  public void addStudentsWantingWithinTwoSeatsOfMe(Student student) {
    if (student == null) {
      throw new IllegalArgumentException("Studentをnullにはできません。");
    }
    if (this.equals(student)) {
      throw new IllegalArgumentException("生徒は自分自身をリストに追加することはできません。");
    }
    if (student != null && !this.equals(student) && !studentsWantingWithinTwoSeatsOfMe.contains(student)) {
      System.out.println(student + "のstudentsWantingWithinTwoSeatsOfMeに" + this + "を追加しました。");
      student.studentsWantingWithinTwoSeatsOfMe.add(this);
    } else {
      System.out.println(student + "はすでにリストに含まれているため追加しませんでした。");
    }
  }

  // private List<Student> studentsWantingAwayOneSeatFromMe自分を一席以上離れたい生徒へ追加するメソッド
  public void addStudentsWantingAwayOneSeatFromMe(Student student) {
    if (student == null) {
      throw new IllegalArgumentException("Studentをnullにはできません。");
    }
    if (this.equals(student)) {
      throw new IllegalArgumentException("生徒は自分自身をリストに追加することはできません。");
    }
    if (student != null && !this.equals(student) && !studentsWantingAwayOneSeatFromMe.contains(student)) {
      System.out.println(student + "のstudentsWantingAwayOneSeatFromMeに" + this + "を追加しました。");
      student.studentsWantingAwayOneSeatFromMe.add(this);
    } else {
      System.out.println(student + "はすでにリストに含まれているため追加しませんでした。");
    }
  }

  // private List<Student> studentsWantingAwayTwoSeatsFromMe自分を二席以上離れたい生徒へ追加するメソッド
  public void addStudentsWantingAwayTwoSeatsFromMe(Student student) {
    if (student == null) {
      throw new IllegalArgumentException("Studentをnullにはできません。");
    }
    if (this.equals(student)) {
      throw new IllegalArgumentException("生徒は自分自身をリストに追加することはできません。");
    }
    if (student != null && !this.equals(student) && !studentsWantingAwayTwoSeatsFromMe.contains(student)) {
      System.out.println(student + "のstudentsWantingAwayTwoSeatsFromMeに" + this + "を追加しました。");
      student.studentsWantingAwayTwoSeatsFromMe.add(this);
    } else {
      System.out.println(student + "はすでにリストに含まれているため追加しませんでした。");
    }
  }

  public boolean isPrefersFrontRow() {
    return prefersFrontRow;
  }

  public void setPrefersFrontRow(boolean prefersFrontRow) {
    this.prefersBackRow = false;
    this.prefersBackTwoRows = false;
    this.prefersFrontTwoRows = false;
    this.prefersLeftColumn = false;
    this.prefersRightColumn = false;
    this.prefersNearTeacher = false;

    this.prefersFrontRow = prefersFrontRow;
  }

  public boolean isPrefersFrontTwoRows() {
    return prefersFrontTwoRows;
  }

  public void setPrefersFrontTwoRows(boolean prefersFrontTwoRows) {
    this.prefersBackRow = false;
    this.prefersBackTwoRows = false;
    this.prefersFrontRow = false;
    this.prefersLeftColumn = false;
    this.prefersRightColumn = false;
    this.prefersNearTeacher = false;

    this.prefersFrontTwoRows = prefersFrontTwoRows;
  }

  public boolean isPrefersBackRow() {
    return prefersBackRow;
  }

  public void setPrefersBackRow(boolean prefersBackRow) {
    this.prefersBackTwoRows = false;
    this.prefersFrontRow = false;
    this.prefersFrontTwoRows = false;
    this.prefersLeftColumn = false;
    this.prefersRightColumn = false;
    this.prefersNearTeacher = false;

    this.prefersBackRow = prefersBackRow;
  }

  public boolean isPrefersBackTwoRows() {
    return prefersBackTwoRows;
  }

  public void setPrefersBackTwoRows(boolean prefersBackTwoRows) {
    this.prefersBackRow = false;
    this.prefersFrontRow = false;
    this.prefersFrontTwoRows = false;
    this.prefersLeftColumn = false;
    this.prefersRightColumn = false;
    this.prefersNearTeacher = false;

    this.prefersBackTwoRows = prefersBackTwoRows;
  }

  public boolean isPrefersLeftColumn() {
    return prefersLeftColumn;
  }

  public void setPrefersLeftColumn(boolean prefersLeftColumn) {
    this.prefersBackRow = false;
    this.prefersBackTwoRows = false;
    this.prefersFrontRow = false;
    this.prefersFrontTwoRows = false;
    this.prefersRightColumn = false;
    this.prefersNearTeacher = false;

    this.prefersLeftColumn = prefersLeftColumn;
  }

  public boolean isPrefersRightColumn() {
    return prefersRightColumn;
  }

  public void setPrefersRightColumn(boolean prefersRightColumn) {
    this.prefersBackRow = false;
    this.prefersBackTwoRows = false;
    this.prefersFrontRow = false;
    this.prefersFrontTwoRows = false;
    this.prefersLeftColumn = false;
    this.prefersNearTeacher = false;

    this.prefersRightColumn = prefersRightColumn;
  }

  public boolean isPrefersNearTeacher() {
    return prefersNearTeacher;
  }

  public void setPrefersNearTeacher(boolean prefersNearTeacher) {
    this.prefersBackRow = false;
    this.prefersBackTwoRows = false;
    this.prefersFrontRow = false;
    this.prefersFrontTwoRows = false;
    this.prefersLeftColumn = false;
    this.prefersRightColumn = false;

    this.prefersNearTeacher = prefersNearTeacher;
  }

  public int getDifficultyScore() {
    return this.difficultyScore;
  }

  public Gender getGender() {
    return gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public int calculateDifficultyScore() {
    int score = 10;

    // DFSpoint*10000を加算
    score += DFSChainScore * 100;

    // 隣に配置するべき生徒の数に基づくスコア
    score += studentsToPlaceNextTo.size() * 10;

    // 二席以内に配置するべき生徒の数に基づくスコア
    score += studentsToPlaceWithinTwoSeats.size() * 5;

    // 一席以上離れて配置するべき生徒の数に基づくスコア
    score += studentsToPlaceAwayOneSeat.size() * 2;

    // 二席以上離れて配置するべき生徒の数に基づくスコア
    score += studentsToPlaceAwayTwoSeats.size() * 3;

    // 他の席の希望に基づくスコア
    if (prefersFrontRow) score += 10;
    if (prefersFrontTwoRows) score += 5;
    if (prefersBackRow) score += 10;
    if (prefersBackTwoRows) score += 5;
    if (prefersLeftColumn) score += 10;
    if (prefersRightColumn) score += 10;
    if (prefersNearTeacher) score += 15;

    this.difficultyScore = score;

    return score;
  }

  //席替えが無事完了した際に座席の決定を行う。
  public void assignSeat() {
    if (this.assignedSeat == null) {
      throw new IllegalArgumentException(
        this.getName() + "のassignedSeatがnullであるために、assignSeat()が完了しませんでした。"
      );
    }
    this.currentSeat = this.assignedSeat;
    this.assignedSeat = null;
  }
}