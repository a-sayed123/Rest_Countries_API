import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { vi } from "vitest";

import { useFocusOutside } from "./useFocusOutside";

function TestWrapper({ onOutside }) {
  const ref = useRef(null);

  useFocusOutside(ref, onOutside);

  return (
    <>
      <div ref={ref}>
        <button>Inside</button>
      </div>

      <button>Outside</button>
    </>
  );
}

test("calls onOutside when focus moves outside the referenced element", async () => {
  const user = userEvent.setup();
  const onOutside = vi.fn();

  render(<TestWrapper onOutside={onOutside} />);

  const insideButton = screen.getByRole("button", { name: "Inside" });
  const outsideButton = screen.getByRole("button", { name: "Outside" });

  await user.click(insideButton);
  await user.click(outsideButton);

  expect(onOutside).toHaveBeenCalled();
});

test("does not call onOutside when focus moves inside the referenced element", async () => {
  const user = userEvent.setup();
  const onOutside = vi.fn();

  render(<TestWrapper onOutside={onOutside} />);

  const outsideButton = screen.getByRole("button", { name: "Outside" });
  const insideButton = screen.getByRole("button", { name: "Inside" });

  await user.click(outsideButton);
  await user.click(insideButton);

  expect(onOutside).not.toHaveBeenCalled();
});
