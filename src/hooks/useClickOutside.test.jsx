import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { vi } from "vitest"

import { useClickOutside } from "./useClickOutside";

function TestWrapper({ onOutside }) {
  const ref = useRef(null);

  useClickOutside(ref, onOutside);

  return (
    <>
      <div ref={ref}>Inside</div>
      <button>Outside</button>
    </>
  );
}

test("calls onOutside when clicking outside the referenced element", async () => {
  const user = userEvent.setup();
  const onOutside = vi.fn();

  render(<TestWrapper onOutside={onOutside} />);

  const outsideButton = screen.getByRole("button", { name: "Outside" });

  await user.click(outsideButton);

  expect(onOutside).toHaveBeenCalled();
});

test("does not call onOutside when clicking inside the referenced element", async () => {
  const user = userEvent.setup();
  const onOutside = vi.fn();

  render(<TestWrapper onOutside={onOutside} />);

  const insideElement = screen.getByText("Inside");

  await user.click(insideElement);

  expect(onOutside).not.toHaveBeenCalled();
});