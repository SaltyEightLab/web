席替えプロセス

①ClassRoom classRoom = new ClassRoom(5, 6);
　クラスルームを生成する。
　 int rows = dataWrapper.getRows();
　 int columns = dataWrapper.getColumns();
　 ClassRoom classRoom = new ClassRoom(rows, columns);
②ClassRoomManager classRoomManager = new ClassRoomManager(classRoom);
　 classRoomManager.initializeClassRoom();
③【未実装】public class ClassRoom 　 public Seat getSeatAtPosition(int row, int column) によって座席を取得し、
　 public void setToBeUsed(boolean isToBeUsed)によって使用の可否を設定する。
　 classRoom.setToBeUsedForSeatAtPosition(0, 5, false);
　 classRoom.setToBeUsedForSeatAtPosition(4, 1, false);
　 classRoom.setToBeUsedForSeatAtPosition(4, 0, false);
④【未実装】教卓に一番近い席を設定
　 classRoom.setSeatsNearTeacher(0, 4);
⑤public class ClassRoomManager public void generateStudents()によって、座席に対して生徒を生成し、紐づける。
　 classRoomManager.generateStudents();
⑥ 各生徒の条件を抽出
　 List<Student> receivedStudentsInfo = dataWrapper.getStudents();
⑦public class ClassRoom
　public Seat getSeatAtPosition(int row, int column)
　public Student getCurrentStudent()によって生徒に対して個別の設定を行う。

　for(int j = 0; j < columns; j++){
　for(int i = 0; i < rows; i++){
　Student student = classRoom.getSeatAtPosition(i, j).getCurrentStudent();
　Student receivedStudentInfo = receivedStudentsInfo.get(j \* rows + i);

      student.setName(receivedStudentInfo.getName());
      student.setPrefersFrontRow(receivedStudentInfo.isPrefersFrontRow());
      student.setPrefersLeftColumn(receivedStudentInfo.isPrefersLeftColumn());
      student.setPrefersFrontTwoRows(receivedStudentInfo.isPrefersFrontTwoRows());
      student.setPrefersBackTwoRows(receivedStudentInfo.isPrefersBackTwoRows());
      student.setPrefersNearTeacher(receivedStudentInfo.isPrefersNearTeacher());

      List<Student> studentsToPlaceNextToInfo = receivedStudentInfo.getStudentsToPlaceNextTo();
      for (Student studentToPlaceNextToInfo : studentsToPlaceNextToInfo) {
        student.addStudentsToPlaceNextTo(studentToPlaceNextToInfo);
      }
      List<Student> studentsToPlaceWithinTwoSeatsInfo = receivedStudentInfo.getStudentsToPlaceWithinTwoSeats();
      for (Student studentToPlaceWithinTwoSeatsInfo : studentsToPlaceWithinTwoSeatsInfo) {
        student.addStudentsToPlaceWithinTwoSeats(studentToPlaceWithinTwoSeatsInfo);
      }
      List<Student> studentsWantingAwayOneSeatFromMeInfo = receivedStudentInfo.getStudentsWantingAwayOneSeatFromMe();
      for (Student studentWantingAwayOneSeatFromMeInfo : studentsWantingAwayOneSeatFromMeInfo) {
        student.addStudentsWantingAwayOneSeatFromMe(studentWantingAwayOneSeatFromMeInfo);
      }
      List<Student> studentsWantingAwayTwoSeatsFromMeInfo = receivedStudentInfo.getStudentsWantingAwayTwoSeatsFromMe();
      for (Student studentWantingAwayTwoSeatsFromMeInfo : studentsWantingAwayTwoSeatsFromMeInfo) {
        student.addStudentsWantingAwayTwoSeatsFromMe(studentWantingAwayTwoSeatsFromMeInfo);
      }
    }
  }

⑧席替え前の配置の出力
　public class ClassRoomDisplay public void displayInitialSeatArrangement(ClassRoom classroom)
　ClassRoomDisplay classRoomDisplay = new ClassRoomDisplay();
　classRoomDisplay.displayInitialSeatArrangement(classRoom);

⑨席替えの実行
　public void arrangeSeats(ClassRoom classRoom, List<Student> students, boolean isCompleteSeatChangeMode)
　第２引数はpublic List<Student> getUnseatedStudents()
　SeatArrangementEngine seatArrangementEngine = new SeatArrangementEngine();
　seatArrangementEngine.arrangeSeats(
    classRoom,
    classRoomManager.getUnseatedStudents(),
    true
　);

⑩結果の出力
　public class ClassRoomDisplay public void displayFinalSeatArrangement(ClassRoom classroom)
　classRoomDisplay.displayFinalSeatArrangement(classRoom);