package com.example.api.seatarranger;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ForOutputStudent {
    @JsonProperty("IDforBackend")
    private int IDforBackend;
    @JsonProperty("name")
    private String name;
    @JsonProperty("assignedSeatFromFront")
    private int assignedSeatFromFront;
    @JsonProperty("assignedSeatFromRight")
    private int assignedSeatFromRight;

    public ForOutputStudent(@JsonProperty("IDforBackend") int IDforBackend, @JsonProperty("name") String name, @JsonProperty("assignedSeatFromFront") int assignedSeatFromFront, @JsonProperty("assignedSeatFromRight") int assignedSeatFromRight) {
        this.IDforBackend = IDforBackend;
        this.name = name;
        this.assignedSeatFromFront = assignedSeatFromFront;
        this.assignedSeatFromRight = assignedSeatFromRight;
    }

    public String toString() {
        return "IDforBackend:" + IDforBackend + ", name:" + name + ", assignedSeatFromFront:" + assignedSeatFromFront + ", assignedSeatFromRight:" + assignedSeatFromRight;
    }

    public int getIDforBackend() {
        return IDforBackend;
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

    public void setIDforBackend(int ID) {
        this.IDforBackend = ID;
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
