import {
  populationNumber,
  formatCurrencies,
  formatLanguages,
  getBorderCountryNames,
} from "./format";

describe("format utilities", () => {
  describe("populationNumber", () => {
    test("formats a population number with thousands separators", () => {
      expect(populationNumber(1000)).toBe("1,000");
    });

    test("formats zero as 0", () => {
      expect(populationNumber(0)).toBe("0");
    });

    test("formats millions correctly", () => {
      expect(populationNumber(1234567)).toBe("1,234,567");
    });
  });

  describe("formatCurrencies", () => {
    test("formats currency names as a comma-separated string", () => {
      const currencies = [
        { name: "Egyptian pound" },
        { name: "US dollar" },
      ];

      expect(formatCurrencies(currencies)).toBe(
        "Egyptian pound, US dollar"
      );
    });

    test("returns None when currencies are missing", () => {
      expect(formatCurrencies([])).toBe("None");
      expect(formatCurrencies(null)).toBe("None");
    });
  });

  describe("formatLanguages", () => {
    test("formats language names as a comma-separated string", () => {
      const languages = [
        { name: "Arabic" },
        { name: "English" },
      ];

      expect(formatLanguages(languages)).toBe("Arabic, English");
    });

    test("returns None when languages are missing", () => {
      expect(formatLanguages([])).toBe("None");
      expect(formatLanguages(null)).toBe("None");
    });
  });

  describe("getBorderCountryNames", () => {
    const countries = [
      { alpha3Code: "EGY", name: "Egypt" },
      { alpha3Code: "LBY", name: "Libya" },
      { alpha3Code: "SDN", name: "Sudan" },
    ];

    test("converts border country codes to country names", () => {
      expect(
        getBorderCountryNames(["LBY", "SDN"], countries)
      ).toEqual(["Libya", "Sudan"]);
    });

    test("keeps unknown border codes unchanged", () => {
      expect(
        getBorderCountryNames(["LBY", "XXX"], countries)
      ).toEqual(["Libya", "XXX"]);
    });

    test("keeps values longer than three characters unchanged", () => {
      expect(
        getBorderCountryNames(["Egypt"], countries)
      ).toEqual(["Egypt"]);
    });

    test("returns an empty array when there are no border countries", () => {
      expect(getBorderCountryNames([], countries)).toEqual([]);
      expect(getBorderCountryNames(null, countries)).toEqual([]);
    });
  });
});