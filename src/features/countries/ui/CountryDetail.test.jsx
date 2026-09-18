import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CountryDetail from "./CountryDetail";

const egypt = {
  name: "Egypt",
  nativeName: "مصر",
  population: 100000000,
  region: "Africa",
  subregion: "Northern Africa",
  capital: "Cairo",
  topLevelDomain: ".eg",
  currencies: [{ name: "Egyptian pound" }],
  languages: [{ name: "Arabic" }],
  flag: "egypt.png",
  borders: [],
};



test("renders nothing when no country is provided", () => {
  const { container } = render(
    <CountryDetail
      country={null}
      onBack={vi.fn()}
      onSelect={vi.fn()}
      codeToNameMap={{}}
    />,
  );

  expect(container).toBeEmptyDOMElement();
});

test("displays the country details", () => {
  const country = {
    name: "Egypt",
    nativeName: "مصر",
    population: 100000000,
    region: "Africa",
    subregion: "Northern Africa",
    capital: "Cairo",
    flag: "egypt-flag.png",
    topLevelDomain: [".eg"],
    currencies: [{ name: "Egyptian pound" }],
    languages: [{ name: "Arabic" }],
  };

  render(
    <CountryDetail
      country={country}
      onBack={vi.fn()}
      onSelect={vi.fn()}
      codeToNameMap={{}}
    />,
  );

  expect(screen.getByRole("heading", { name: "Egypt" })).toBeInTheDocument();

  expect(screen.getByText(/Native Name:/)).toHaveTextContent("مصر");

  expect(screen.getByText(/Population:/)).toBeInTheDocument();

  expect(
    screen.getByText(
      (_, element) =>
        element?.tagName === "P" && element.textContent === "Region: Africa",
    ),
  ).toBeInTheDocument();

  expect(
    screen.getByText(
      (_, element) =>
        element?.tagName === "P" &&
        element.textContent === "Sub Region: Northern Africa",
    ),
  ).toBeInTheDocument();

  expect(screen.getByText(/Capital:/)).toHaveTextContent("Cairo");
});

test("calls onBack when the Back button is clicked", async () => {
  const user = userEvent.setup();
  const onBack = vi.fn();

  const country = {
    name: "Egypt",
    nativeName: "مصر",
    population: 100000000,
    region: "Africa",
    subregion: "Northern Africa",
    capital: "Cairo",
    flag: "egypt-flag.png",
    topLevelDomain: [".eg"],
    currencies: [{ name: "Egyptian pound" }],
    languages: [{ name: "Arabic" }],
  };

  render(
    <CountryDetail
      country={country}
      onBack={onBack}
      onSelect={vi.fn()}
      codeToNameMap={{}}
    />,
  );

  const backButton = screen.getByRole("button", { name: "Back" });

  await user.click(backButton);

  expect(onBack).toHaveBeenCalled();
});

test("displays border countries using their names", () => {
  const country = {
    name: "Egypt",
    nativeName: "مصر",
    population: 100000000,
    region: "Africa",
    subregion: "Northern Africa",
    capital: "Cairo",
    flag: "egypt-flag.png",
    topLevelDomain: [".eg"],
    currencies: [{ name: "Egyptian pound" }],
    languages: [{ name: "Arabic" }],
    borders: ["LBY", "SDN"],
  };

  render(
    <CountryDetail
      country={country}
      onBack={vi.fn()}
      onSelect={vi.fn()}
      codeToNameMap={{
        LBY: "Libya",
        SDN: "Sudan",
      }}
    />,
  );

  expect(screen.getByRole("button", { name: "Libya" })).toBeInTheDocument();

  expect(screen.getByRole("button", { name: "Sudan" })).toBeInTheDocument();
});

test("calls onSelect with the border country code when clicked", async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();

  const country = {
    name: "Egypt",
    nativeName: "مصر",
    population: 100000000,
    region: "Africa",
    subregion: "Northern Africa",
    capital: "Cairo",
    flag: "egypt-flag.png",
    topLevelDomain: [".eg"],
    currencies: [{ name: "Egyptian pound" }],
    languages: [{ name: "Arabic" }],
    borders: ["LBY", "SDN"],
  };

  render(
    <CountryDetail
      country={country}
      onBack={vi.fn()}
      onSelect={onSelect}
      codeToNameMap={{
        LBY: "Libya",
        SDN: "Sudan",
      }}
    />,
  );

  const libyaButton = screen.getByRole("button", { name: "Libya" });

  await user.click(libyaButton);

  expect(onSelect).toHaveBeenCalledWith("LBY");
});

test("displays None when the country has no borders", () => {
  const country = {
    name: "Egypt",
    nativeName: "مصر",
    population: 100000000,
    region: "Africa",
    subregion: "Northern Africa",
    capital: "Cairo",
    flag: "egypt-flag.png",
    topLevelDomain: [".eg"],
    currencies: [{ name: "Egyptian pound" }],
    languages: [{ name: "Arabic" }],
  };

  render(
    <CountryDetail
      country={country}
      onBack={vi.fn()}
      onSelect={vi.fn()}
      codeToNameMap={{}}
    />,
  );

  expect(
    screen.getByRole("heading", { name: /Border Countries: None/ }),
  ).toBeInTheDocument();
});

test("focuses the country heading when the detail page appears", () => {
  render(
    <CountryDetail
      country={egypt}
      onBack={vi.fn()}
      onSelect={vi.fn()}
      codeToNameMap={{}}
    />,
  );
  expect(
    screen.getByRole("heading", { level: 1, name: "Egypt" }),
  ).toHaveFocus();
});
