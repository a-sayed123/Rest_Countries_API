import { renderHook, act } from "@testing-library/react";
import { expect, test } from "vitest";
import useCountries from "./useCountries"
import { getCountries } from "../api/CountriesApi"

const data = getCountries();

const { result } = renderHook(() => useCountries(data));

test("initializes with all countries", () => {
  const { result } = renderHook(() => useCountries(data));

  expect(result.current.query).toBe("");
  expect(result.current.region).toBe("");
  expect(result.current.selectedCountry).toBe(null);
  expect(result.current.filteredCountries).toEqual(data);
});

test("filters countries by query", () => {
  const { result } = renderHook(() => useCountries(data));

  act(() => {
    result.current.setQuery("Af");
  });

  expect(result.current.filteredCountries).toHaveLength(1);
  expect(result.current.filteredCountries[0].name).toBe("Afghanistan");
});

test("filters countries by region", () => {
  const { result } = renderHook(() => useCountries(data));

  act(() => {
    result.current.setRegion("Africa");
  });

  expect(result.current.filteredCountries.length).toBeGreaterThan(0);
  expect(
    result.current.filteredCountries.every(
      country => country.region === "Africa"
    )
  ).toBe(true);
});

test("shows all countries when region is All", () => {
  const { result } = renderHook(() => useCountries(data));

  act(() => {
    result.current.setRegion("All");
  });

  expect(result.current.filteredCountries).toEqual(data);
});

test("filters countries by query and region", () => {
  const { result } = renderHook(() => useCountries(data));

  act(() => {
    result.current.setQuery("United");
    result.current.setRegion("Americas");
  });

  expect(result.current.filteredCountries.length).toBeGreaterThan(0);
  expect(
    result.current.filteredCountries.every(
      country =>
        country.name.startsWith("United") &&
        country.region === "Americas"
    )
  ).toBe(true);
});

test("selects a country by alpha3Code", () => {
  const { result } = renderHook(() => useCountries(data));

  act(() => {
    result.current.selectCountry("EGY");
  });

  expect(result.current.selectedCountry).not.toBeNull();
  expect(result.current.selectedCountry.alpha3Code).toBe("EGY");
  expect(result.current.selectedCountry.name).toBe("Egypt");
});

test("selects a country by name", () => {
  const { result } = renderHook(() => useCountries(data));

  act(() => {
    result.current.selectCountry("Egypt");
  });

  expect(result.current.selectedCountry).not.toBeNull();
  expect(result.current.selectedCountry.alpha3Code).toBe("EGY");
  expect(result.current.selectedCountry.name).toBe("Egypt");
});

test("clears selection when country does not exist", () => {
  const { result } = renderHook(() => useCountries(data));

  act(() => {
    result.current.selectCountry("Atlantis");
  });

  expect(result.current.selectedCountry).toBe(null);
});

test("clears the selected country", () => {
  const { result } = renderHook(() => useCountries(data));

  act(() => {
    result.current.selectCountry("EGY");
  });

  expect(result.current.selectedCountry.name).toBe("Egypt");

  act(() => {
    result.current.clearSelection();
  });

  expect(result.current.selectedCountry).toBe(null);
});

test("creates a code to country name map", () => {
  const { result } = renderHook(() => useCountries(data));

  expect(result.current.codeToNameMap.EGY).toBe("Egypt");
  expect(result.current.codeToNameMap.FRA).toBe("France");
  expect(result.current.codeToNameMap.JPN).toBe("Japan");
});