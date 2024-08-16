import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GetRecordOnSidebar from "../../components/GetRecordOnSidebar";

describe("GetRecordOnSidebar", () => {
  it("renders correctly with props", () => {
    const { getByText } = render(
      <GetRecordOnSidebar isOpen={false} onClick={() => {}} />
    );
    expect(getByText("履歴から復元")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <GetRecordOnSidebar isOpen={false} onClick={onClickMock} />
    );
    fireEvent.click(getByText("履歴から復元"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("displays the correct icon based on isOpen", () => {
    const { getByAltText, rerender } = render(
      <GetRecordOnSidebar isOpen={true} onClick={() => {}} />
    );
    expect(getByAltText("Menu Icon")).toBeInTheDocument();
    rerender(<GetRecordOnSidebar isOpen={false} onClick={() => {}} />);
  });
});