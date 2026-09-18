import { render, screen } from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

import useCountryFocusRestore from "./useCountryFocusRestore";

function TestWrapper() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useCountryFocusRestore(selectedCountry);

  return (
    <>
      <button
        data-country-code="EGY"
        onClick={() =>
          setSelectedCountry({
            alpha3Code: "EGY",
          })
        }
      >
        Egypt
      </button>

      <button onClick={() => setSelectedCountry(null)}>
        Back
      </button>
    </>
  );
}

test("restores focus to the previously selected country", async () => {
  const user = userEvent.setup();

  render(<TestWrapper />);

  const egyptButton = screen.getByRole("button", { name: "Egypt" });
  const backButton = screen.getByRole("button", { name: "Back" });

  await user.click(egyptButton);
  await user.click(backButton);

  expect(egyptButton).toHaveFocus();
});