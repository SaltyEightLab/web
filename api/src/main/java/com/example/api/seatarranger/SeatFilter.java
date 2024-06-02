package com.example.api.seatarranger;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SeatFilter {

  /**
   * 生徒の好みに基づいて空席のリストをフィルタリングします。
   *
   * @param emptySeats 空席のリスト
   * @param student    生徒
   * @return 候補となる席のリスト
   */
  public List<Seat> filterSeats(List<Seat> emptySeats, Student student, boolean isCompleteSeatChangeMode) {
    // 引数のバリデーション
    if (emptySeats == null) {
      throw new IllegalArgumentException("空席のリストがnullです。");
    }
    if (student == null) {
      throw new IllegalArgumentException("studentがnullです。");
    }

    // ビジネスロジックの実行
    List<Seat> candidateSeats = new ArrayList<>(emptySeats);
    Iterator<Seat> iterator = candidateSeats.iterator();

    while (iterator.hasNext()) {
      Seat seat = iterator.next();
      if (!isSeatMatchingPreferences(seat, student, isCompleteSeatChangeMode)) {
        iterator.remove();
      }
    }

    return candidateSeats;
  }

  /**
   * 席が生徒の好みに合っているかどうかをチェックします。
   *
   * @param seat    席
   * @param student 生徒
   * @return 席が好みに合っている場合はtrue、それ以外の場合はfalse
   */
  private boolean isSeatMatchingPreferences(Seat seat, Student student, boolean isCompleteSeatChangeMode) {
    return (
      isNotSameSeatWhenCompleteChangeMode(seat, student, isCompleteSeatChangeMode) &&
      // isGenderMatch(seat, student) && //後々、オプションとして追加実装しましょう。
      isFrontRowPreferenceMatched(seat, student) &&
      isBackRowPreferenceMatched(seat, student) &&
      isColumnPreferenceMatched(seat, student) &&
      isNearTeacherPreferenceMatched(seat, student) &&
      arePreferredNeighborsSeated(seat, student) &&
      areStudentsSeatedWithinTwoSeats(seat, student) &&
      areDistantStudentsNotAdjacent(seat, student) &&
      areDistantStudentsSeparatedByTwoSeats(seat, student)
    );
  }

  private boolean isGenderMatch(Seat seat, Student student) {
    return seat.getSeatGender() == Gender.valueOf(student.getGender().toString());
  }

  private boolean isFrontRowPreferenceMatched(Seat seat, Student student) {
    if (student.isPrefersFrontRow()) {
      return seat.getFromFront() == 0;
    }
    if (student.isPrefersFrontTwoRows()) {
      return seat.getFromFront() <= 1;
    }
    return true;
  }

  private boolean isBackRowPreferenceMatched(Seat seat, Student student) {
    if (student.isPrefersBackRow()) {
      return seat.getFromBack() == 0;
    }
    if (student.isPrefersBackTwoRows()) {
      return seat.getFromBack() <= 1;
    }
    return true;
  }

  private boolean isColumnPreferenceMatched(Seat seat, Student student) {
    if (student.isPrefersLeftColumn()) {
      return seat.getFromLeft() == 0;
    }
    if (student.isPrefersRightColumn()) {
      return seat.getFromRight() == 0;
    }
    return true;
  }

  private boolean isNearTeacherPreferenceMatched(Seat seat, Student student) {
    return !student.isPrefersNearTeacher() || seat.isNearTeacher();
  }

  // ⭐️
  // １席以内に配置することを希望する相手が１席以内にいることを検証します。
  private boolean arePreferredNeighborsSeated(Seat seat, Student student) {
    List<Student> studentsList = Stream
      .concat(student.getStudentsToPlaceNextTo().stream(), student.getStudentsWantingNextToMe().stream())
      .filter(s -> s.getAssignedSeat() != null)
      .distinct()
      .collect(Collectors.toList());

    return areStudentsSeatedInSpecifiedSeats(
      studentsList,
      seat.getInnerSurroundingSeats(),
      false // falseは生徒が指定された席に座るべきであることを示します
    );
  }

  // ２席以内に配置することを希望する相手が２席以内にいることを検証します。
  private boolean areStudentsSeatedWithinTwoSeats(Seat seat, Student student) {
    List<Student> studentsList = Stream
      .concat(
        student.getStudentsToPlaceWithinTwoSeats().stream(),
        student.getStudentsWantingWithinTwoSeatsOfMe().stream()
      )
      .filter(s -> s.getAssignedSeat() != null)
      .distinct()
      .collect(Collectors.toList());

    List<Seat> allSurroundingSeats = new ArrayList<>();
    allSurroundingSeats.addAll(seat.getInnerSurroundingSeats());
    allSurroundingSeats.addAll(seat.getOuterSurroundingSeats());

    return areStudentsSeatedInSpecifiedSeats(studentsList, allSurroundingSeats, false);
  }

  // １席以上開けることを希望する相手が１席以内にいないことを検証します。
  private boolean areDistantStudentsNotAdjacent(Seat seat, Student student) {
    List<Student> studentsList = Stream
      .concat(student.getStudentsToPlaceAwayOneSeat().stream(), student.getStudentsWantingAwayOneSeatFromMe().stream())
      .filter(s -> s.getAssignedSeat() != null)
      .distinct()
      .collect(Collectors.toList());

    return areStudentsSeatedInSpecifiedSeats(
      studentsList,
      seat.getInnerSurroundingSeats(),
      true // trueは生徒が指定された席に座ってはいけないことを示します
    );
  }

  // ２席以上開けることを希望する相手が２席以内にいないことを検証します。
  private boolean areDistantStudentsSeparatedByTwoSeats(Seat seat, Student student) {
    // 組み合わせた生徒リストを作成し、重複と未割り当ての席の生徒を排除
    List<Student> studentsList = Stream
      .concat(student.getStudentsToPlaceAwayOneSeat().stream(), student.getStudentsWantingAwayTwoSeatsFromMe().stream())
      .filter(s -> s.getAssignedSeat() != null) // 割り当てられた席がある生徒のみ保持
      .distinct() // 重複する生徒を排除
      .collect(Collectors.toList());

    List<Seat> allSurroundingSeats = new ArrayList<>();
    allSurroundingSeats.addAll(seat.getInnerSurroundingSeats());
    allSurroundingSeats.addAll(seat.getOuterSurroundingSeats());

    return areStudentsSeatedInSpecifiedSeats(studentsList, allSurroundingSeats, true);
  }

  // ⭐️

  private boolean isNotSameSeatWhenCompleteChangeMode(Seat seat, Student student, boolean isCompleteSeatChangeMode) {
    return !isCompleteSeatChangeMode || !seat.equals(student.getCurrentSeat());
  }

  /**
   * 生徒が指定された席に座っているかどうかを、shouldNotBeSeatedフラグに基づいてチェックします。
   *
   * @param studentsToCheck    チェックする生徒のリスト
   * @param seatsToCheck       チェックする席のリスト
   * @param shouldNotBeSeated  生徒が指定された席に座るべきでない場合はtrue、それ以外の場合はfalse
   * @return 座席配置が基準を満たす場合はtrue、それ以外の場合はfalse
   */
  private boolean areStudentsSeatedInSpecifiedSeats(
    List<Student> studentsToCheck,
    List<Seat> seatsToCheck,
    boolean shouldNotBeSeated
  ) {
    if (studentsToCheck.isEmpty()) {
      return true;
    }

    Set<Seat> seatsToCheckSet = new HashSet<>(seatsToCheck);

    for (Student studentToCheck : studentsToCheck) {
      Seat assignedSeat = studentToCheck.getAssignedSeat();
      boolean isSeatInSpecifiedSeats = seatsToCheckSet.contains(assignedSeat);

      if (shouldNotBeSeated && isSeatInSpecifiedSeats) {
        return false; // 生徒が指定された席に座っている場合、falseを返します。
      } else if (!shouldNotBeSeated && !isSeatInSpecifiedSeats) {
        return false; // 生徒が指定された席に座っていない場合、falseを返します。
      }
    }

    return true; // すべての生徒が条件に適している場合、trueを返します。
  }
}
