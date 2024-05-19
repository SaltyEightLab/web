package com.example.api.seatarranger;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class SeatArrangementEngine {

  private List<Student> unseatedStudents = new ArrayList<>();
  private List<Seat> emptySeats = new ArrayList<>();
  private SeatFilter seatFilter = new SeatFilter();

  /**
   * 教室の座席配置を初期化します。
   *
   * @param classRoom 座席の列と行、そしてそれぞれの座席を含む教室オブジェクト
   * @param students  ClassRoomMannagerに所属する生徒群
   */

  public void arrangeSeats(ClassRoom classRoom, List<Student> students, boolean isCompleteSeatChangeMode) {
    // 引数のバリデーション
    if (classRoom == null) {
      throw new IllegalArgumentException("classRoomはnullにできません。");
    }
    if (students == null) {
      throw new IllegalArgumentException("studentsリストはnullにできません。");
    }
    if (classRoom.getLines() == null) {
      throw new IllegalArgumentException("classRoomには有効なLinesのリストが必要です。");
    }

    // 空席リストと未配置生徒リストを初期化
    unseatedStudents.clear();
    emptySeats.clear();

    // 生徒リストに生徒を追加
    unseatedStudents.addAll(students);

    // DFS操作
    DFSExplorer dfsExplorer = new DFSExplorer();

    // DFSExplorerを使用してスコア計算やその他の処理を行う（仮定）
    dfsExplorer.calculateDFSChainScoresForStudents(unseatedStudents);

    // DFS対象以外の生徒を難易度スコアに基づいてソート
    unseatedStudents.sort((s1, s2) -> Integer.compare(s2.calculateDifficultyScore(), s1.calculateDifficultyScore()));

    for (Student student : unseatedStudents) {
      System.out.println(student);
    }

    // 座席を走査して空席リストを作成
    for (Line line : classRoom.getLines()) {
      if (line == null || line.getSeats() == null) {
        throw new IllegalArgumentException("LineまたはそのSeatsはnullにできません。");
      }
      for (Seat seat : line.getSeats()) {
        if (seat == null) {
          throw new IllegalArgumentException("SeatsリストにnullのSeatが含まれています。");
        }
        if (seat.getAssignedStudent() == null && seat.isToBeUsed()) {
          emptySeats.add(seat);
        }
      }
    }

    // Randomオブジェクトを生成
    Random random = new Random();

    // 生徒を配置
    while (!unseatedStudents.isEmpty() && !emptySeats.isEmpty()) {
      Student unseatedStudent = unseatedStudents.get(0);
      List<Seat> filteredEmptySeats = seatFilter.filterSeats(emptySeats, unseatedStudent, isCompleteSeatChangeMode);

      if (!filteredEmptySeats.isEmpty()) {
        int randomIndex = random.nextInt(filteredEmptySeats.size());
        Seat assignedSeat = filteredEmptySeats.get(randomIndex);

        // 生徒と座席を紐付け
        unseatedStudent.setAssignedSeat(assignedSeat);
        assignedSeat.setAssignedStudent(unseatedStudent);

        System.out.println(unseatedStudents.get(0) + "の座席が見つかりました。");

        // 候補リストから削除
        unseatedStudents.remove(0);
        emptySeats.remove(assignedSeat);

        ClassRoomDisplay classRoomDisplay = new ClassRoomDisplay();
        classRoomDisplay.displayFinalSeatArrangement(classRoom);
      } else {
        // 適切な座席が見つからなかった場合のエラーハンドリング
        throw new IllegalStateException(unseatedStudent.getName() + "に適切な座席が見つかりませんでした。");
      }
    }
  }

  // 特定のStudent同士のSeat入れ替えメソッド
  public void exchangeAssignedSeats(Student studentA, Student studentB) {
    // 両方のStudentがnullでないことを確認
    if (studentA == null || studentB == null) {
      throw new IllegalArgumentException("StudentAまたはStudentBがnullです。");
    }

    Seat seatA = studentA.getAssignedSeat();
    Seat seatB = studentB.getAssignedSeat();

    // 両方のStudentにassignedSeatがあることを確認
    if (seatA == null || seatB == null) {
      throw new IllegalStateException(
        studentA.getName() + "または" + studentB.getName() + "の座席の割り当てがありません。"
      );
    }

    // StudentAとStudentBに新たなassignedSeatをセット。
    studentA.setAssignedSeat(seatB);
    studentB.setAssignedSeat(seatA);
  }
}
