import "@testing-library/jest-dom"; // Added this line
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SidebarItem from "../../components/SidebarItem";


describe("SidebarItem", () => {
  it("renders correctly with props", () => {
    const { getByText } = render(
      <SidebarItem label="Test Item" onClick={() => {}} isOpen={false} menuIcon="icon.png" />
    );
    expect(getByText("Test Item")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <SidebarItem label="Test Item" onClick={onClickMock} isOpen={false} menuIcon="icon.png" />
    );
    fireEvent.click(getByText("Test Item"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("displays the correct icon based on isOpen", () => {
    const { getByAltText, rerender } = render(
      <SidebarItem label="Test Item" onClick={() => {}} isOpen={true} menuIcon="icon.png" />
    );
    expect(getByAltText("Menu Icon")).toBeInTheDocument();
    rerender(<SidebarItem label="Test Item" onClick={() => {}} isOpen={false} menuIcon="icon.png" />);
    // アイコンの変化を確認するロジックを追加することができます
  });
});