import { populationNumber } from "../../../shared/lib/format";
import { showCountryName } from "../../../shared/lib/strings";

export default function CountryGrid({ countries, onSelect }) {
  if (!countries || countries.length === 0) return <h2 role="status" className="not-found">&#10060; No Countries found</h2>;
  return (
    <section className="countries">
      <ul className="list__items">
        {countries.map((country) => (
          <CountryCard
            country={country}
            onSelect={onSelect}
            key={country.name}
          />
        ))}
      </ul>
    </section>
  );
}

function CountryCard({ country, onSelect }) {
  return (
    <li className="list__item">
      <article className="country">
        <button
          type="button"
          className="country__flag"
          onClick={() => onSelect(country.alpha3Code)}
          data-country-code={country.alpha3Code}
          aria-label={`View ${country.name}`}
        >
          <img
            src={country.flag}
            alt=""
            loading="lazy"
            className="img-cover"
            width={"30rem"}
            height={"15rem"}
          />
        </button>
        <div className="content">
          {showCountryName(country.name)}
          <ul className="country__details">
              <li className="list__item">Population: {populationNumber(country.population)}</li>
              <li className="list__item">Region: {country.region}</li>
              <li className="list__item">Capital: {country.capital?? "None"}</li>
          </ul>
        </div>
      </article>
    </li>
  );
}
