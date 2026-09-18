import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import App from "./App";

vi.mock("./features/countries/api/CountriesApi", () => ({
  getCountries: () => [
    {
      name: "Egypt",
      alpha3Code: "EGY",
      nativeName: "مصر",
      population: 100000000,
      region: "Africa",
      subregion: "Northern Africa",
      capital: "Cairo",
      topLevelDomain: [".eg"],
      currencies: [{ name: "Egyptian pound" }],
      languages: [{ name: "Arabic" }],
      flag: "/egypt.png",
      borders: [],
    },
    {
      name: "France",
      alpha3Code: "FRA",
      nativeName: "France",
      population: 68000000,
      region: "Europe",
      subregion: "Western Europe",
      capital: "Paris",
      topLevelDomain: [".fr"],
      currencies: [{ name: "Euro" }],
      languages: [{ name: "French" }],
      flag: "/france.png",
      borders: [],
    },
    {
      name: "Ghana",
      alpha3Code: "GHA",
      nativeName: "Ghana",
      population: 34000000,
      region: "Africa",
      subregion: "Western Africa",
      capital: "Accra",
      topLevelDomain: [".gh"],
      currencies: [{ name: "Ghanaian cedi" }],
      languages: [{ name: "English" }],
      flag: "/ghana.png",
      borders: [],
    },
  ],
}));

test("allows the user to open a country and return to the country list", async () => {
  const user = userEvent.setup();

  render(<App />);

  const egyptButton = screen.getByRole("button", {
    name: "View Egypt",
  });

  await user.click(egyptButton);

  expect(screen.getByRole("heading", { name: "Egypt" })).toBeInTheDocument();

  expect(
    screen.getByText(
      (_, element) =>
        element?.tagName === "P" && element.textContent === "Capital: Cairo",
    ),
  ).toBeInTheDocument();

  const backButton = screen.getByRole("button", { name: "Back" });

  await user.click(backButton);

  expect(
    screen.getByRole("button", { name: "View Egypt" }),
  ).toBeInTheDocument();
});

test("filters the country grid when the user searches", async () => {
  const user = userEvent.setup();
  render(<App />);
  const searchInput = screen.getByRole("textbox", {
    name: "Search for a country",
  });
  expect(
    screen.getByRole("button", { name: "View Egypt" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "View France" }),
  ).toBeInTheDocument();
  await user.type(searchInput, "Egypt");
  expect(
    screen.getByRole("button", { name: "View Egypt" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "View France" }),
  ).not.toBeInTheDocument();
});

test("combines region and search filters when region is selected first", async () => {
  const user = userEvent.setup();
  render(<App />);
  const regionButton = screen.getByRole("button", { name: "Filter by Region" });
  await user.click(regionButton);
  await user.click(screen.getByRole("option", { name: "Africa" }));
  expect(
    screen.getByRole("button", { name: "View Egypt" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "View Ghana" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "View France" }),
  ).not.toBeInTheDocument();
  const searchInput = screen.getByRole("textbox", {
    name: "Search for a country",
  });
  await user.type(searchInput, "Ghana");
  expect(
    screen.getByRole("button", { name: "View Ghana" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "View Egypt" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "View France" }),
  ).not.toBeInTheDocument();
});

test("combines search and region filters when search is entered first", async () => {
  const user = userEvent.setup();

  render(<App />);

  const searchInput = screen.getByRole("textbox", {
    name: "Search for a country",
  });

  await user.type(searchInput, "Ghana");

  expect(
    screen.getByRole("button", { name: "View Ghana" }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: "View Egypt" }),
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: "View France" }),
  ).not.toBeInTheDocument();

  const regionButton = screen.getByRole("button", {
    name: "Filter by Region",
  });

  await user.click(regionButton);

  await user.click(screen.getByRole("option", { name: "Africa" }));

  expect(
    screen.getByRole("button", { name: "View Ghana" }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: "View Egypt" }),
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: "View France" }),
  ).not.toBeInTheDocument();
});

test("toggles between light and dark mode", async () => {
  const user = userEvent.setup();

  render(<App />);

  const darkModeButton = screen.getByRole("button", {
    name: "Switch to dark mode",
  });

  // Initial state: light mode is the default.
  expect(document.body).not.toHaveClass("dark");
  expect(document.body).not.toHaveAttribute("data-theme", "dark");

  // Switch to dark mode.
  await user.click(darkModeButton);

  expect(document.body).toHaveClass("dark");
  expect(document.body).toHaveAttribute("data-theme", "dark");

  expect(
    screen.getByRole("button", {
      name: "Switch to light mode",
    }),
  ).toBeInTheDocument();

  // Switch back to light mode.
  await user.click(
    screen.getByRole("button", {
      name: "Switch to light mode",
    }),
  );

  expect(document.body).not.toHaveClass("dark");
  expect(document.body).toHaveAttribute("data-theme", "light");

  expect(
    screen.getByRole("button", {
      name: "Switch to dark mode",
    }),
  ).toBeInTheDocument();
});
