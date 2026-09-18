import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CountryGrid from "./CountryGrid";

const countries = [
  {
    name: "Egypt",
    alpha3Code: "EGY",
    flag: "/egypt.svg",
    population: 100000000,
    region: "Africa",
    capital: "Cairo",
  },
  {
    name: "France",
    alpha3Code: "FRA",
    flag: "/france.svg",
    population: 67000000,
    region: "Europe",
    capital: "Paris",
  },
];

test("shows a no countries message when the list is empty", () => {
  render(<CountryGrid countries={[]} onSelect={vi.fn()} />);

  const message = screen.getByRole("status");

  expect(message).toHaveTextContent("No Countries found");
});

test("renders a country card when countries are provided", () => {
  const country = {
    name: "Egypt",
    alpha3Code: "EGY",
    flag: "egypt-flag.png",
    population: 100000000,
    region: "Africa",
    capital: "Cairo",
  };

  render(<CountryGrid countries={[country]} onSelect={vi.fn()} />);

  expect(
    screen.getByRole("button", { name: "View Egypt" }),
  ).toBeInTheDocument();
});

test("displays the country information", () => {
  const country = {
    name: "Egypt",
    alpha3Code: "EGY",
    flag: "egypt-flag.png",
    population: 100000000,
    region: "Africa",
    capital: "Cairo",
  };

  render(<CountryGrid countries={[country]} onSelect={vi.fn()} />);

  expect(screen.getByText("Egypt")).toBeInTheDocument();
  expect(screen.getByText(/Population:/)).toBeInTheDocument();
  expect(screen.getByText(/Region: Africa/)).toBeInTheDocument();
  expect(screen.getByText(/Capital: Cairo/)).toBeInTheDocument();
});

test("calls onSelect with the country code when the country is clicked", async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();

  const country = {
    name: "Egypt",
    alpha3Code: "EGY",
    flag: "egypt-flag.png",
    population: 100000000,
    region: "Africa",
    capital: "Cairo",
  };

  render(<CountryGrid countries={[country]} onSelect={onSelect} />);

  const button = screen.getByRole("button", {
    name: "View Egypt",
  });

  await user.click(button);

  expect(onSelect).toHaveBeenCalledWith("EGY");
});

test("renders the country flag", () => {
  const country = {
    name: "Egypt",
    alpha3Code: "EGY",
    flag: "egypt-flag.png",
    population: 100000000,
    region: "Africa",
    capital: "Cairo",
  };

  render(<CountryGrid countries={[country]} onSelect={vi.fn()} />);

  const flag = screen.getByRole("presentation");

  expect(flag).toHaveAttribute("src", "egypt-flag.png");
});

test("renders all countries", () => {
  const countries = [
    {
      name: "Egypt",
      alpha3Code: "EGY",
      flag: "egypt-flag.png",
      population: 100000000,
      region: "Africa",
      capital: "Cairo",
    },
    {
      name: "France",
      alpha3Code: "FRA",
      flag: "france-flag.png",
      population: 67000000,
      region: "Europe",
      capital: "Paris",
    },
  ];

  render(<CountryGrid countries={countries} onSelect={vi.fn()} />);

  expect(
    screen.getByRole("button", { name: "View Egypt" }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: "View France" }),
  ).toBeInTheDocument();
});

test("each country can be identified by an accessible button name", () => {
  render(<CountryGrid countries={countries} onSelect={vi.fn()} />);

  expect(
    screen.getByRole("button", { name: "View Egypt" })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: "View France" })
  ).toBeInTheDocument();
});

test("country buttons are keyboard focusable and activatable", async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();

  render(<CountryGrid countries={countries} onSelect={onSelect} />);

  const egypt = screen.getByRole("button", {
    name: "View Egypt",
  });

  await user.tab();

  expect(egypt).toHaveFocus();

  await user.keyboard("{Enter}");

  expect(onSelect).toHaveBeenCalledWith("EGY");
});
