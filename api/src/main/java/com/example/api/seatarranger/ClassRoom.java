package com.example.api.seatarranger;

import java.util.ArrayList;
import java.util.List;

/**
 * 教室を表すクラス。教室の行数、列数を保持し、座席の配置を管理します。
 */
public class ClassRoom {

  private int rows; // 教室の行数
  private int columns; // 教室の列数
  private List<Line> lines = new ArrayList<>();

  /**
   * 教室の新しいインスタンスを初期化します。
   *
   * @param rows    教室の行数
   * @param columns 教室の列数
   */

public ClassRoom() {
  this.rows = 0;
  this.columns = 0;
  this.lines = new ArrayList<>();
}

  public ClassRoom(int rows, int columns) {
    if (rows < 1) {
      throw new IllegalArgumentException("不正なrowsです。");
    }
    if (columns < 1) {
      throw new IllegalArgumentException("不正なcolumnsです。");
    }
    this.rows = rows;
    this.columns = columns;
    System.out.println("座席配置を初期化しました。");
  }

  // 行数を取得するゲッターメソッド
  public int getRows() {
    return rows;
  }

  // 列数を取得するゲッターメソッド
  public int getColumns() {
    return columns;
  }

  public List<Line> getLines() {
    return this.lines;
  }

  public void addLineToClassRoom(Line line) {
    lines.add(line);
  }

  public Line getLine(int colum) {
    return lines.get(colum);
  }

  /**
   * 指定された位置にある座席を取得します。
   *
   * @param row    行の位置
   * @param column 列の位置
   * @return 指定された位置にある座席
   * @throws IllegalArgumentException 指定された位置が不正な場合
   */
  public Seat getSeatAtPosition(int row, int column) {
    if (row >= 0 && row < rows && column >= 0 && column < columns) {
      Line line = getLine(column);
      if (line != null) {
        return line.getSeat(row);
      } else {
        throw new IllegalArgumentException("指定された列にLineオブジェクトが存在しません。");
      }
    } else {
      throw new IllegalArgumentException("(" + row + " , " + column + ")は不正なrowまたはcolumnです。");
    }
  }

  public int countSeatsToBeUsed() {
    int seatCount = 0;
    for (Line line : lines) {
      for (Seat seat : line.getSeats()) {
        if (seat.isToBeUsed()) {
          seatCount++;
        }
      }
    }
    return seatCount;
  }

  // ClassRoomオブジェクトが保有する全てのSeatオブジェクトのうち、isToBeUsedのものだけ含むList<Seat> AllSeatsを返す。
  public List<Seat> getSeatsToBeUsed() {
    List<Seat> allSeats = new ArrayList<>();
    for (Line line : lines) {
      for (Seat seat : line.getSeats()) {
        if (seat.isToBeUsed()) {
          allSeats.add(seat);
        }
      }
    }
    return allSeats;
  }

  // ClassRoomオブジェクトが保有する全てのSeatオブジェクトを返します。
  public List<Seat> getAllSeats() {
    List<Seat> allSeats = new ArrayList<>();
    for (Line line : lines) {
      for (Seat seat : line.getSeats()) {
        allSeats.add(seat);
      }
    }
    return allSeats;
  }

  //指定された箇所のSeatに引数のisToBeUsed値を設定します。
  public void setToBeUsedForSeatAtPosition(int row, int column, boolean isToBeUsed) {
    if (row < 0 || row >= this.rows) {
      throw new IllegalArgumentException("不正なrow値です。");
    }
    if (column < 0 || column >= this.columns) {
      throw new IllegalArgumentException("不正なcolumns値です。");
    }
    Seat seat = getSeatAtPosition(row, column);
    seat.setToBeUsed(isToBeUsed);
  }

  /**
   * 教卓に最も近い座席とその周囲の座席に、教師に近いことを示すマーカーを設定します。
   *
   * @param nearestTeacherRow    教卓に最も近い座席の行位置
   * @param nearestTeacherColumn 教卓に最も近い座席の列位置
   * @throws IllegalArgumentException 指定された位置が不正な場合
   */
  public void setSeatsNearTeacher(int nearestTeacherRow, int nearestTeacherColumn) {
    if (nearestTeacherRow < 0 || nearestTeacherRow >= this.rows) {
      throw new IllegalArgumentException("不正なrow値です。");
    }
    if (nearestTeacherColumn < 0 || nearestTeacherColumn >= this.columns) {
      throw new IllegalArgumentException("不正なcolumns値です。");
    }
    if (getSeatsToBeUsed() == null) {
      throw new IllegalArgumentException("全ての座席がisToBeUsed = falseです。");
    }

    // 準備として全ての座席に対してisNeartTeacher = falseを代入します。
    for (Seat seat : getSeatsToBeUsed()) {
      seat.setNearTeacher(false);
    }

    // 教卓に一番近い座席にisNearTeacher = trueを代入します。
    Seat seatNearestTeacher = getSeatAtPosition(nearestTeacherRow, nearestTeacherColumn);
    seatNearestTeacher.setNearTeacher(true);

    // 教卓に一番近い座席のInnerSurroundingSeatsを収集します。

    // その周りの座席にもisNearTeacher = trueを代入します。
    List<Seat> seatsNearTeacher = new ArrayList<>();
    seatsNearTeacher.addAll(seatNearestTeacher.getInnerSurroundingSeats());
    for (Seat seatNearTeacher : seatsNearTeacher) {
      seatNearTeacher.setNearTeacher(true);
    }
  }
}
