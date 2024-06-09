package com.example.api.seatarranger;

public class ForOutputStudent {
    private int ID;
    private String name;
    private int assignedSeatFromFront;
    private int assignedSeatFromRight;

    public ForOutputStudent(int ID, String name, int assignedSeatFromFront, int assignedSeatFromRight) {
        this.ID = ID;
        this.name = name;
        this.assignedSeatFromFront = assignedSeatFromFront;
        this.assignedSeatFromRight = assignedSeatFromRight;
    }

    public int getID() {
        return ID;
    }

    public String getName() {
        return name;
    }

    public int getAssignedSeatFromFront() {
        return assignedSeatFromFront;
    }

    public int getAssignedSeatFromRight() {
        return assignedSeatFromRight;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAssignedSeatFromFront(int assignedSeatFromFront) {
        this.assignedSeatFromFront = assignedSeatFromFront;
    }

    public void setAssignedSeatFromRight(int assignedSeatFromRight) {
        this.assignedSeatFromRight = assignedSeatFromRight;
    }

}
