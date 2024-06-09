package com.example.api.seatarranger;

public class App {

  public static void main(String[] args) throws Exception {
    //public static void main(String[] args)はどのように動くか。
    //ClassRoomを生成する。例えばcalumns6*rows5
    ClassRoom classRoom = new ClassRoom(5, 6);
    //ClassRoomManager(ClassRoom classRoom)を生成する。
    ClassRoomManager classRoomManager = new ClassRoomManager(classRoom);
    //public void initializeClassRoom()を行う。
    classRoomManager.initializeClassRoom();
    //public class ClassRoom　public Seat getSeatAtPosition(int row, int column) によって座席を取得し、public void setToBeUsed(boolean isToBeUsed)によって使用の可否を設定する。
    classRoom.setToBeUsedForSeatAtPosition(0, 5, false);
    classRoom.setToBeUsedForSeatAtPosition(4, 1, false);
    classRoom.setToBeUsedForSeatAtPosition(4, 0, false);

    // 教卓に一番近い席を設定
    classRoom.setSeatsNearTeacher(0, 4);

    //public class ClassRoomManager public void generateStudents()によって、座席に対して生徒を生成し、紐づける。
    classRoomManager.generateStudents();
    //public class ClassRoompublic
    //Seat getSeatAtPosition(int row, int column) public Student getCurrentStudent()によって生徒に対して個別の設定を行う。

    Student nomura = classRoom.getSeatAtPosition(0, 0).getCurrentStudent();
    nomura.setName("野村");

    Student kaziwara = classRoom.getSeatAtPosition(0, 1).getCurrentStudent();
    kaziwara.setName("梶原");

    Student murakami = classRoom.getSeatAtPosition(0, 2).getCurrentStudent();
    murakami.setName("村上");

    Student yasuda = classRoom.getSeatAtPosition(0, 3).getCurrentStudent();
    yasuda.setName("安田");

    Student satou = classRoom.getSeatAtPosition(0, 4).getCurrentStudent();
    satou.setName("佐藤");

    Student yashio = classRoom.getSeatAtPosition(1, 0).getCurrentStudent();
    yashio.setName("八塩");

    Student andou = classRoom.getSeatAtPosition(1, 1).getCurrentStudent();
    andou.setName("安藤");

    Student yamada = classRoom.getSeatAtPosition(1, 2).getCurrentStudent();
    yamada.setName("山田");

    Student yamagami = classRoom.getSeatAtPosition(1, 3).getCurrentStudent();
    yamagami.setName("山上");

    Student yamashita = classRoom.getSeatAtPosition(1, 4).getCurrentStudent();
    yamashita.setName("山下");

    Student miura = classRoom.getSeatAtPosition(1, 5).getCurrentStudent();
    miura.setName("三浦");

    Student tano = classRoom.getSeatAtPosition(2, 0).getCurrentStudent();
    tano.setName("田野");

    Student akita = classRoom.getSeatAtPosition(2, 1).getCurrentStudent();
    akita.setName("秋田");

    Student shirakami = classRoom.getSeatAtPosition(2, 2).getCurrentStudent();
    shirakami.setName("白神");

    Student kurono = classRoom.getSeatAtPosition(2, 3).getCurrentStudent();
    kurono.setName("黒野");

    Student tenzan = classRoom.getSeatAtPosition(2, 4).getCurrentStudent();
    tenzan.setName("天山");

    Student amano = classRoom.getSeatAtPosition(2, 5).getCurrentStudent();
    amano.setName("天野");

    Student masuda = classRoom.getSeatAtPosition(3, 0).getCurrentStudent();
    masuda.setName("増田");

    Student ueno = classRoom.getSeatAtPosition(3, 1).getCurrentStudent();
    ueno.setName("上野");

    Student yokono = classRoom.getSeatAtPosition(3, 2).getCurrentStudent();
    yokono.setName("横野");

    Student ueyama = classRoom.getSeatAtPosition(3, 3).getCurrentStudent();
    ueyama.setName("上山");

    Student shimoyama = classRoom.getSeatAtPosition(3, 4).getCurrentStudent();
    shimoyama.setName("下山");

    Student suzawa = classRoom.getSeatAtPosition(3, 5).getCurrentStudent();
    suzawa.setName("須沢");

    Student katou = classRoom.getSeatAtPosition(4, 2).getCurrentStudent();
    katou.setName("加藤");

    Student kumagai = classRoom.getSeatAtPosition(4, 3).getCurrentStudent();
    kumagai.setName("熊谷");

    Student mochinushi = classRoom.getSeatAtPosition(4, 4).getCurrentStudent();
    mochinushi.setName("持主");

    Student hatae = classRoom.getSeatAtPosition(4, 5).getCurrentStudent();
    hatae.setName("波多江");

    // 各個人の希望を設定。
    nomura.setPrefersFrontRow(true);
    yasuda.setPrefersLeftColumn(true);
    // yamagami.setPrefersFrontTwoRows(true);
    tano.setPrefersBackTwoRows(true);
    kurono.isPrefersBackTwoRows();
    kurono.setPrefersBackTwoRows(true);
    // masuda.setPrefersRightColumn(true);
    shimoyama.setPrefersFrontRow(true);
    mochinushi.setPrefersBackRow(true);
    miura.setPrefersNearTeacher(true);
    akita.setPrefersNearTeacher(true);

    // １席以内を希望
    murakami.addStudentsToPlaceNextTo(ueno);
    ueno.addStudentsToPlaceNextTo(kaziwara);
    tano.addStudentsToPlaceWithinTwoSeats(kaziwara);
    kaziwara.addStudentsToPlaceNextTo(shimoyama);
    amano.addStudentsToPlaceNextTo(shimoyama);
    shimoyama.addStudentsToPlaceNextTo(miura);
    yamagami.addStudentsToPlaceNextTo(yashio);
    hatae.addStudentsToPlaceNextTo(yashio);
    yashio.addStudentsToPlaceNextTo(miura);

    // ２席以内を希望
    // akita.addStudentsToPlaceWithinTwoSeats(mochinushi);
    mochinushi.addStudentsWantingWithinTwoSeatsOfMe(hatae);
    masuda.addStudentsToPlaceWithinTwoSeats(hatae);

    // １席以内を回避
    tenzan.addStudentsWantingAwayOneSeatFromMe(nomura);

    // ２席以内を回避
    kumagai.addStudentsWantingAwayTwoSeatsFromMe(katou);
    yokono.addStudentsWantingAwayTwoSeatsFromMe(suzawa);

    // 席替え前の配置の出力 public class ClassRoomDisplay public void displayInitialSeatArrangement(ClassRoom classroom)
    // public class SeatArrangementEngine
    ClassRoomDisplay classRoomDisplay = new ClassRoomDisplay();
    classRoomDisplay.displayInitialSeatArrangement(classRoom);

    // public void arrangeSeats(ClassRoom classRoom, List<Student> students, boolean isCompleteSeatChangeMode)
    // 第２引数はpublic List<Student> getUnseatedStudents()
    SeatArrangementEngine seatArrangementEngine = new SeatArrangementEngine();
    seatArrangementEngine.arrangeSeats(
      classRoom,
      classRoomManager.getUnseatedStudents(),
      true,
      true
    );

    //結果の出力
    //public class ClassRoomDisplay public void displayFinalSeatArrangement(ClassRoom classroom)
    classRoomDisplay.displayFinalSeatArrangement(classRoom);

    System.out.println(classRoom.getAllSeats());

  }
}
