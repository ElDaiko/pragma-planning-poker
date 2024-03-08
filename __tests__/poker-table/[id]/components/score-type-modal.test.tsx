window.setImmediate = window.setTimeout as any;

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SocoreTypeModal from "@/pages/poker-table/[id]/components/socore-type-modal";
import { PartyProvider } from "@/context/party.context";
import { usePartyContext } from "../../../../src/hooks/usePartyContext";

jest.mock("../../../../src/hooks/usePartyContext");

describe("SocoreTypeModal", () => {

  const jestFn = jest.fn();
  const onCloseMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const mock = usePartyContext as jest.MockedFunction<typeof usePartyContext>;
    mock.mockReturnValue({
      socket: {
        emit: jestFn,
      },
    } as any);

    render(
      <PartyProvider>
        <SocoreTypeModal onClose={onCloseMock} />
      </PartyProvider>
    );
  });
  it("Should update score to power-of-two", () => {
    fireEvent.click(screen.getByRole("powerClick"))
    expect(jestFn).toHaveBeenCalledTimes(1)
    expect(jestFn).toHaveBeenCalledWith("change-type-of-score", {typeOfScores: "power-of-two"})
  })
  it("Should update score to fibonacci", () => {
    fireEvent.click(screen.getByRole("fibonacciClick"))
    expect(jestFn).toHaveBeenCalledTimes(1)
    expect(jestFn).toHaveBeenCalledWith("change-type-of-score", {typeOfScores: "fibonacci"})
  })
  it("Should update score to lineal", () => {
    fireEvent.click(screen.getByRole("linealClick"))
    expect(jestFn).toHaveBeenCalledTimes(1)
    expect(jestFn).toHaveBeenCalledWith("change-type-of-score", {typeOfScores: "lineal"})
  })
});
