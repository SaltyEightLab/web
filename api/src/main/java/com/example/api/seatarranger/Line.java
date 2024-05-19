package com.example.api.seatarranger;

import java.util.ArrayList;
import java.util.List;

public class Line {
    private List<Seat> seats = new ArrayList<>();

    private int fromRight;

    public Line(int fromRight, ClassRoom classRoom) {
        if (fromRight < 0 || fromRight > classRoom.getColumns() - 1) {
            throw new IllegalArgumentException("不正なfromRightです。");
        }
        this.fromRight = fromRight;
    }

    public int getFromRight() {
        return fromRight;
    }
    
    // fromLeftの値を計算して返すメソッド
    public int getFromLeft(ClassRoom classRoom) {
        return classRoom.getColumns() - fromRight -1;
    }

    public void addSeatToSeats(Seat seat) {
        seats.add(seat);
    }

    public Seat getSeat(int row) {
        return seats.get(row);
    }

        public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

}
