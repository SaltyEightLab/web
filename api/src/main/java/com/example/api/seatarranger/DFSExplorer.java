package com.example.api.seatarranger;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DFSExplorer {

  private Student target;
  private int point;

  // 全ての生徒に対してDFSチェーンスコアを計算する
  public void calculateDFSChainScoresForStudents(List<Student> students) {
    for (Student student : students) {
      for (Student studentToReset : students) {
        studentToReset.setVisited(false);
        studentToReset.setBacktrackStudent(null);
      }
      calculateDFSChainScore(student);
    }
  }

  // 指定された生徒に対してDFSチェーンスコアを計算する
  public void calculateDFSChainScore(Student student) {
    resetState(student);
    processDFS(student);
    student.setDFSChainScore(point);
    System.out.println(student + "のDFSpointは" + point + "でした。");
  }

  private void resetState(Student student) {
    if (student == null) {
      throw new IllegalArgumentException("studentををnullにすることはできません。");
    }
    point = 0;
    target = student;
    target.setVisited(true);
    target.setBacktrackStudent(null);
  }

  private void processDFS(Student current) {
    while (current != null) {
      if (findUnvisitedFromCurrentStudentList(current) != null) {
        // System.out.println("target:" + current + " → " + findUnvisitedFromCurrentStudentList(current));
        switchToNextTarget(findUnvisitedFromCurrentStudentList(current));
        current = this.target;
        // System.out.println("targetの切り替え成功");
      } else {
        // System.out.println(current + "から" + current.getBacktrackStudent() + "へbackTrakします。");
        current = backtrack(current);
        this.target = current;
      }
    }
  }

  private void switchToNextTarget(Student nextTarget) {
    saveBacktrackInfo(nextTarget);
    target = nextTarget;
    target.setVisited(true);
    point++;
  }

  private void saveBacktrackInfo(Student nextTarget) {
    nextTarget.setBacktrackStudent(target);
  }

  // currentが持つリストからunvisitedを探して返す。
  private Student findUnvisitedFromCurrentStudentList(Student current) {
    List<Student> studentList = Stream
      .of(
        current.getStudentsWantingNextToMe(),
        current.getStudentsWantingWithinTwoSeatsOfMe(),
        current.getStudentsWantingAwayOneSeatFromMe(),
        current.getStudentsWantingAwayTwoSeatsFromMe()
      )
      .flatMap(Collection::stream)
      .distinct()
      .collect(Collectors.toList());

    for (Student student : studentList) {
      if (!student.isVisited()) {
        return student;
      }
    }
    return null;
  }

  // private Student backtrack(Student student)
  // のこしでいけるはず
  private Student backtrack(Student student) {
    return student.getBacktrackStudent();
  }
}
