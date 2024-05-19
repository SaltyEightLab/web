package com.example.api.seatarranger;

import java.util.List;
import java.util.function.Function;

public class ClassRoomDisplay {

  public void displayInitialSeatArrangement(ClassRoom classroom) {
    System.out.println("席替え前の座席配置:");
    printSeatArrangement(classroom, Seat::getCurrentStudent);
  }

  public void displayFinalSeatArrangement(ClassRoom classroom) {
    System.out.println("席替え後の座席配置:");
    printSeatArrangement(classroom, Seat::getAssignedStudent);
  }

  /**
   * 指定された名前をフォーマットし、10文字分の幅に合わせます。
   * 半角文字は1文字、全角文字は2文字としてカウントします。
   *
   * @param name フォーマットする名前
   * @return フォーマットされた名前
   */
  public static String formatName(String name) {
    final int maxChars = 10;
    int length = 0;

    // 名前の各文字について、全角か半角かを判定し、文字数をカウント
    for (char ch : name.toCharArray()) {
      // 半角文字は1文字、全角文字は2文字としてカウント
      length += (ch >= '\u0020' && ch <= '\u007e') || (ch >= '\uff61' && ch <= '\uff9f') ? 1 : 2;
    }

    // StringBuilderを使用して名前にスペースを追加し、10文字分の幅に合わせる
    StringBuilder sb = new StringBuilder(name);
    while (length < maxChars) {
      sb.append(" ");
      length++;
    }

    // 文字列が10文字を超えている場合は、10文字で切り捨て
    return sb.length() > maxChars ? sb.substring(0, maxChars) : sb.toString();
  }

  /**
   * 教室の座席配置を表示します。
   *
   * @param classroom 教室オブジェクト
   * @param studentSupplier 生徒を取得するための関数
   */
  private void printSeatArrangement(ClassRoom classroom, Function<Seat, Student> studentSupplier) {
    List<Line> lines = classroom.getLines();
    for (int row = 0; row < classroom.getRows(); row++) {
      for (int col = classroom.getColumns() - 1; col >= 0; col--) {
        Seat seat = lines.get(col).getSeats().get(row);
        Student student = studentSupplier.apply(seat);
        String name = (student != null) ? student.getName() : "なし";
        // formatNameを使用して名前をフォーマットし、表示
        System.out.print(formatName(name) + " ");
      }
      System.out.println();
    }
  }
}
