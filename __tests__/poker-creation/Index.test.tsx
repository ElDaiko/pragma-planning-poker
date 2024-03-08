window.setImmediate = window.setTimeout as any;

import { render, screen, fireEvent } from "@testing-library/react";
import { useCreateParty } from "../../src/hooks/useCreateParty";
import Index from "../../src/pages/poker-creation";
import { PartyProvider } from "../../src/context/party.context";
import { UserProvider } from "@/context/user.context";

// Mock useRouter
const pushMocked = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMocked,
  }),
}));


jest.mock("../../src/hooks/useCreateParty");
const jestFn = jest.fn();

describe("useCreateClassroom hook tests", function () {
  it("Should call function hook", () => {
    const mockParty = useCreateParty as jest.MockedFunction<
      typeof useCreateParty
    >;
    mockParty.mockReturnValue({
      createParty: jestFn,
    });

    render(
      <UserProvider>
        <PartyProvider>
          <Index />
        </PartyProvider>
      </UserProvider>
    );

    fireEvent.input(screen.getByRole("input"), {target:{value: "Sprint32"}})
    fireEvent.click(screen.getByRole("click"));

    expect(jestFn).toHaveBeenCalledTimes(1);
  });
});
