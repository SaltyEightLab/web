package com.example.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.ArrayList;
import com.example.api.seatarranger.Student;
import com.example.api.seatarranger.ClassRoom;
import com.example.api.seatarranger.ClassRoomManager;
import com.example.api.seatarranger.Seat;
import com.example.api.seatarranger.ClassRoomDisplay;
import com.example.api.seatarranger.SeatArrangementEngine;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.api.seatarranger.ForOutputStudent;

import java.util.Comparator;

@RestController
@RequestMapping("/api")
public class HelloController {

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/students")
    public void receiveStudents(@RequestBody DataWrapper dataWrapper) {
        try {
            int rows = dataWrapper.getRows();
            int columns = dataWrapper.getColumns();

            // ClassRoomを初期化
            ClassRoom classRoom = new ClassRoom(rows, columns);
            ClassRoomManager classRoomManager = new ClassRoomManager(classRoom);
            classRoomManager.initializeClassRoom();

            List<Student> students = dataWrapper.getStudents();

            // 各StudentのcurrentSeatとassignedSeatにClassRoomを設定
            for (Student student : students) {
                if (student.getCurrentSeat() != null) {
                    student.getCurrentSeat().setClassRoom(classRoom);
                }
                if (student.getAssignedSeat() != null) {
                    student.getAssignedSeat().setClassRoom(classRoom);
                }
            }
            // 生徒をID順に並び替える
            students.sort(Comparator.comparingInt(Student::getID));
            // // toString() メソッドを使用して各 Student オブジェクトを出力
            // for (Student student : students) {
            // System.out.println(student.toString());
            // }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/seatarrange")
    public ResponseEntity<List<ForOutputStudent>> seatArrangeByRecievedData(@RequestBody DataWrapper dataWrapper) {
        try {
            // ①ClassRoom classRoom = new ClassRoom(5, 6);
            // クラスルームを生成する。
            System.out.println("1:classRoomを生成します。");
            int rows = dataWrapper.getRows();
            int columns = dataWrapper.getColumns();
            ClassRoom classRoom = new ClassRoom(rows, columns);

            // ②ClassRoomManager classRoomManager = new ClassRoomManager(classRoom);
            System.out.println("2:ClassRoomManagerを生成します。");
            ClassRoomManager classRoomManager = new ClassRoomManager(classRoom);
            classRoomManager.initializeClassRoom();

            // ③【未実装】public class ClassRoom public Seat getSeatAtPosition(int row, int
            // column) によって座席を取得し、
            // public void setToBeUsed(boolean isToBeUsed)によって使用の可否を設定する。
            // classRoom.setToBeUsedForSeatAtPosition(0, 5, false);
            // classRoom.setToBeUsedForSeatAtPosition(4, 1, false);
            // classRoom.setToBeUsedForSeatAtPosition(4, 0, false);
            // ④【未実装】教卓に一番近い席を設定
            // classRoom.setSeatsNearTeacher(0, 4);

            // ⑤public class ClassRoomManager public void
            // generateStudents()によって、座席に対して生徒を生成し、紐づける。
            System.out.println("5:座席に対して生徒を生成し、紐づける。");
            classRoomManager.generateStudents();

            // ⑥ 各生徒の条件を抽出
            System.out.println("6:各生徒の条件を抽出");
            List<Student> receivedStudentsInfo = dataWrapper.getStudents();
            receivedStudentsInfo.sort(Comparator.comparingInt(Student::getID));

            // ⑦public class ClassRoom
            // public Seat getSeatAtPosition(int row, int column)
            // public Student getCurrentStudent()によって生徒に対して個別の設定を行う。
            System.out.println("7:生徒に対して個別の設定を行う。");
            // System.out.println(receivedStudentsInfo);

            for (int j = 0; j < columns; j++) {
                for (int i = 0; i < rows; i++) {
                    Student student = classRoom.getSeatAtPosition(i, j).getCurrentStudent();
                    Student receivedStudentInfo = receivedStudentsInfo.get(j * rows + i);
                    // System.out.println("rows:" + i + "、columuns:" + j + "、" + receivedStudentInfo
                    // + "の情報を、" + student + "に入力しました。");

                    // 希望する座席の条件を設定
                    student.setName(receivedStudentInfo.getName());
                    student.setPrefersFrontRow(receivedStudentInfo.isPrefersFrontRow());
                    student.setPrefersFrontTwoRows(receivedStudentInfo.isPrefersFrontTwoRows());
                    student.setPrefersBackRow(receivedStudentInfo.isPrefersBackRow());
                    student.setPrefersBackTwoRows(receivedStudentInfo.isPrefersBackTwoRows());
                    student.setPrefersRightColumn(receivedStudentInfo.isPrefersRightColumn());
                    student.setPrefersLeftColumn(receivedStudentInfo.isPrefersLeftColumn());
                    student.setPrefersNearTeacher(receivedStudentInfo.isPrefersNearTeacher());
                    student.setGender(receivedStudentInfo.getGender());

                    // 人間関係の条件を設定
                    List<Student> students = classRoomManager.getUnseatedStudents();
                    List<Student> studentsToPlaceNextToInfo = receivedStudentInfo.getStudentsToPlaceNextTo();
                    for (Student studentToPlaceNextToInfo : studentsToPlaceNextToInfo) {
                        student.addStudentsToPlaceNextTo(students.stream()
                                .filter(s -> s.getID() == studentToPlaceNextToInfo.getID()).findFirst().orElse(null));
                    }
                    List<Student> studentsToPlaceWithinTwoSeatsInfo = receivedStudentInfo
                            .getStudentsToPlaceWithinTwoSeats();
                    for (Student studentToPlaceWithinTwoSeatsInfo : studentsToPlaceWithinTwoSeatsInfo) {
                        student.addStudentsToPlaceWithinTwoSeats(
                                students.stream().filter(s -> s.getID() == studentToPlaceWithinTwoSeatsInfo.getID())
                                        .findFirst().orElse(null));
                    }
                    List<Student> studentsWantingAwayOneSeatFromMeInfo = receivedStudentInfo
                            .getStudentsWantingAwayOneSeatFromMe();
                    for (Student studentWantingAwayOneSeatFromMeInfo : studentsWantingAwayOneSeatFromMeInfo) {
                        student.addStudentsWantingAwayOneSeatFromMe(
                                students.stream().filter(s -> s.getID() == studentWantingAwayOneSeatFromMeInfo.getID())
                                        .findFirst().orElse(null));
                    }
                    List<Student> studentsWantingAwayTwoSeatsFromMeInfo = receivedStudentInfo
                            .getStudentsWantingAwayTwoSeatsFromMe();
                    for (Student studentWantingAwayTwoSeatsFromMeInfo : studentsWantingAwayTwoSeatsFromMeInfo) {
                        student.addStudentsWantingAwayTwoSeatsFromMe(
                                students.stream().filter(s -> s.getID() == studentWantingAwayTwoSeatsFromMeInfo.getID())
                                        .findFirst().orElse(null));
                    }
                }
            }

            //座席に性別をset
           List<Seat> seats = classRoom.getAllSeats();
           for(Seat seat : seats){
            seat.setSeatGender(seat.getCurrentStudent().getGender());
           }

            // ⑧席替え前の配置の出力
            System.out.println("8:席替え前の配置を出力する。");
            ClassRoomDisplay classRoomDisplay = new ClassRoomDisplay();
            classRoomDisplay.displayInitialSeatArrangement(classRoom);

            // List<Student> unseatedStudents = classRoomManager.getUnseatedStudents();
            // System.out.println("unseatedStudents:" + unseatedStudents);

            // ⑨席替えの実行
            // public void arrangeSeats(ClassRoom classRoom, List<Student> students, boolean
            // isCompleteSeatChangeMode)
            // 第２引数はpublic List<Student> getUnseatedStudents()
            boolean perfectSeatArrangeMode = dataWrapper.getPerfectSeatArrangeMode();
            boolean fixedByGenderMode = dataWrapper.getFixedByGenderMode();
            System.out.println("9:席替えを実行する。" + "perfectSeatArrangeMode:" + perfectSeatArrangeMode + "、" + "fixedByGenderMode:" + fixedByGenderMode);
            SeatArrangementEngine seatArrangementEngine = new SeatArrangementEngine();
            seatArrangementEngine.arrangeSeats(
                    classRoom,
                    classRoomManager.getUnseatedStudents(),
                    perfectSeatArrangeMode,
                    fixedByGenderMode);

            // ⑩結果の出力
            // public class ClassRoomDisplay public void
            // displayFinalSeatArrangement(ClassRoom classroom)
            System.out.println("10:結果を出力する。");
            classRoomDisplay.displayFinalSeatArrangement(classRoom);

            //お試し
            List<ForOutputStudent> studentsForOutput = classRoomManager.getStudentsForOutput();

            System.out.println(classRoom.getAllSeats());

            return ResponseEntity.ok(studentsForOutput);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/hello")
    public ResponseEntity<String> helloWorld() {
        return ResponseEntity.ok("Hello World!!");
    }

    public static class DataWrapper {
        private int rows;
        private int columns;
        private boolean perfectSeatArrangeMode;
        private boolean fixedByGenderMode;
        private List<Student> students;

        // Getters and Setters
        public int getRows() {
            return rows;
        }

        public void setRows(int rows) {
            this.rows = rows;
        }

        public int getColumns() {
            return columns;
        }


        public void setColumns(int columns) {
            this.columns = columns;
        }

        public boolean getPerfectSeatArrangeMode() {
            return perfectSeatArrangeMode;
        }

        public void setPerfectSeatArrangeMode(boolean perfectSeatArrangeMode) {
            this.perfectSeatArrangeMode = perfectSeatArrangeMode;
        }

        public boolean getFixedByGenderMode() {
            return fixedByGenderMode;
        }

        public void setFixedByGenderMode(boolean fixedByGenderMode) {
            this.fixedByGenderMode = fixedByGenderMode;
        }

        public List<Student> getStudents() {
            return students;
        }

        public void setStudents(List<Student> students) {
            this.students = students;
        }
    }
}