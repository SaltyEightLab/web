import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SeatBeta from "../../components/SeatBeta";
import { StudentType } from "../../types/StudentType";
import { Gender } from "../../types/Gender";
import { SeatType } from "../../types/SeatType";

describe("SeatBeta", () => {
  const mockSetStudentName = jest.fn();
  const mockSetGender = jest.fn();

  const defaultStudent: StudentType = {
    index: 0,
    IDforBackend: 0,
    name: "山田太郎",
    gender: Gender.UNISEX,
    currentSeat: {} as SeatType,
    assignedSeat: {} as SeatType,
    prefersFrontRow: false,
    prefersFrontTwoRows: false,
    prefersBackRow: false,
    prefersBackTwoRows: false,
    prefersLeftColumn: false,
    prefersRightColumn: false,
    prefersNearTeacher: false,
    setStudentName: mockSetStudentName,
    setGender: mockSetGender,
    studentsToPlaceNextTo: [],
    studentsToPlaceWithinTwoSeats: [],
    studentsToPlaceAwayOneSeat: [],
    studentsToPlaceAwayTwoSeats: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("正しく生徒の名前を表示する", () => {
    render(<SeatBeta student={defaultStudent} />);
    expect(screen.getByDisplayValue("山田太郎")).toBeInTheDocument();
  });

  it("名前の入力を正しく処理する", () => {
    render(<SeatBeta student={defaultStudent} />);
    const input = screen.getByDisplayValue("山田太郎");
    fireEvent.change(input, { target: { value: "鈴木花子" } });
    expect(mockSetStudentName).toHaveBeenCalledWith(0, "鈴木花子");
  });

  it("性別のクリックを正しく処理する", () => {
    const { rerender } = render(<SeatBeta student={defaultStudent} />);
    const input = screen.getByRole("textbox");
    const div = input.parentElement;
    if (div) {
      // 最初のクリックでフォーカスを設定
      fireEvent.click(div);
      expect(mockSetGender).not.toHaveBeenCalled();

      // フォーカス状態を模倣するためにコンポーネントを再レンダリング
      rerender(<SeatBeta student={{...defaultStudent, gender: Gender.UNISEX}} />);

      // 2回目のクリックでMALEに変更
      fireEvent.click(div);
      expect(mockSetGender).toHaveBeenCalledWith(0, Gender.MALE);

      // コンポーネントの状態を更新
      rerender(<SeatBeta student={{...defaultStudent, gender: Gender.MALE}} />);

      // 3回目のクリックでFEMALEに変更
      fireEvent.click(div);
      expect(mockSetGender).toHaveBeenCalledWith(0, Gender.FEMALE);

      // コンポーネントの状態を更新
      rerender(<SeatBeta student={{...defaultStudent, gender: Gender.FEMALE}} />);

      // 4回目のクリックでIsNotToBeUsedに変更
      fireEvent.click(div);
      expect(mockSetGender).toHaveBeenCalledWith(0, Gender.IsNotToBeUsed);

      // コンポーネントの状態を更新
      rerender(<SeatBeta student={{...defaultStudent, gender: Gender.IsNotToBeUsed}} />);

      // 5回目のクリックでUNISEXに変更
      fireEvent.click(div);
      expect(mockSetGender).toHaveBeenCalledWith(0, Gender.UNISEX);
    }
  });

  it("フォーカスが外れたときの処理を正しく行う", () => {
    render(<SeatBeta student={defaultStudent} />);
    const input = screen.getByDisplayValue("山田太郎");
    fireEvent.focus(input);
    fireEvent.blur(input);
    fireEvent.click(input.parentElement as HTMLElement);
    expect(mockSetGender).not.toHaveBeenCalled();
  });

  it("性別に応じて正しい背景を設定する", () => {
    const { rerender } = render(<SeatBeta student={defaultStudent} />);
    expect(screen.getByRole("textbox")).toHaveStyle("background-color: #f3f4f6");

    rerender(<SeatBeta student={{ ...defaultStudent, gender: Gender.MALE }} />);
    expect(screen.getByRole("textbox")).toHaveStyle("background-color: #d0e7ff");

    rerender(<SeatBeta student={{ ...defaultStudent, gender: Gender.FEMALE }} />);
    expect(screen.getByRole("textbox")).toHaveStyle("background-color: #ffd0e7");

    rerender(<SeatBeta student={{ ...defaultStudent, gender: Gender.IsNotToBeUsed }} />);
    expect(screen.getByRole("textbox")).toHaveStyle("background-color: #FFFFFF");
  });

  it("IsNotToBeUsedの場合、入力を無効にし、レースホルダーを表示する", () => {
    render(<SeatBeta student={{ ...defaultStudent, gender: Gender.IsNotToBeUsed }} />);
    const input = screen.getByPlaceholderText("座席なし");
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveValue("");
  });

  it("IsNotToBeUsedの場合、名前の変更イベントが発生しない", () => {
    render(<SeatBeta student={{ ...defaultStudent, gender: Gender.IsNotToBeUsed }} />);
    const input = screen.getByPlaceholderText("座席なし");
    fireEvent.change(input, { target: { value: "新しい名前" } });
    expect(mockSetStudentName).not.toHaveBeenCalled();
  });

  it("正しいスタイルが適用されている", () => {
    render(<SeatBeta student={defaultStudent} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveStyle({
      width: "96px",
      height: "64px",
      padding: "8px",
      margin: "8px",
      borderRadius: "0.375rem",
      border: "1px solid #f3f4f6",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      color: "#1f2937",
      fontSize: "0.75rem",
      textAlign: "center",
    });
  });

  it("IsNotToBeUsedの場合、boxShadowがnoneになる", () => {
    render(<SeatBeta student={{ ...defaultStudent, gender: Gender.IsNotToBeUsed }} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveStyle({
      boxShadow: "none",
    });
  });
});