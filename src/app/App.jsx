import { useState } from "react";
import useCountries from "../features/countries/model/useCountries";
import Controls from "../features/countries/ui/Controls";
import CountryGrid from "../features/countries/ui/CountryGrid";
import CountryDetail from "../features/countries/ui/CountryDetail";
import { getCountries } from "../features/countries/api/CountriesApi";

// Css

import "./styles/base.css"
import "./styles/layout.css"
import "./styles/components.css"
import "./styles/utils.css"
import useCountryFocusRestore from "../features/countries/hooks/useCountryFocusRestore";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const data = getCountries();
  const {
    filteredCountries,
    selectedCountry,
    query,
    setQuery,
    region,
    setRegion,
    selectCountry,
    clearSelection,
    codeToNameMap,
  } = useCountries(data);

  useCountryFocusRestore(selectedCountry);

  function toggleTheme() {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.body.classList.toggle("dark", newTheme);
    document.body.setAttribute("data-theme", newTheme ? "dark" : "light");
  }

  return (
    <>
      <header className="header">
        <h1 className="header__title">Where in the world?</h1>
        <button
          className="header__btn"
          type="button"
          onClick={toggleTheme}
          aria-pressed={isDark}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="content">{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </header>
      <main className="main">
        {selectedCountry ? (
          <CountryDetail
            country={selectedCountry}
            codeToNameMap={codeToNameMap}
            onBack={clearSelection}
            onSelect={selectCountry}
          />
        ) : (
          <>
            <Controls
              query={query}
              region={region}
              onQueryChange={setQuery}
              onRegionChange={setRegion}
            />
            <CountryGrid
              countries={filteredCountries}
              onSelect={selectCountry}
            />
          </>
        )}
      </main>
    </>
  );
}
