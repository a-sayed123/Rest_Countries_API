import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";

import { useFocusOnKey } from "./useFocusOnKey";

function TestWrapper() {
  const inputRef = useRef(null);

  useFocusOnKey(inputRef);

  return (
    <input
      ref={inputRef}
      aria-label="Search"
    />
  );
}

test("focuses the element when the configured key is pressed", async () => {
  const user = userEvent.setup();

  render(<TestWrapper />);

  const input = screen.getByRole("textbox", { name: "Search" });

  await user.keyboard("/");

  expect(input).toHaveFocus();
});

test("does not focus the element when a different key is pressed", async () => {
  const user = userEvent.setup();

  render(<TestWrapper />);

  const input = screen.getByRole("textbox", { name: "Search" });

  await user.keyboard("Enter");

  expect(input).not.toHaveFocus();
});