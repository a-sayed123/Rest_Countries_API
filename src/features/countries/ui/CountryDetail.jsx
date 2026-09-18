import {
  populationNumber,
  formatCurrencies,
  formatLanguages,
} from "../../../shared/lib/format";
import { useRef } from "react";
import useFocusOnMount from "../hooks/useFocusOnMount";

export default function CountryDetail({ country, onBack, onSelect, codeToNameMap }) {

  const headingRef = useRef(null);
  useFocusOnMount(headingRef, country);

  if (!country)
    return null;

  return (
    <section className="page">
      <button type="button" onClick={onBack} className="page__btn cloud">
        Back
      </button>
      <div className="page__content">
        <div className="page__img">
          <img
            src={country.flag}
            width={"30rem"}
            height={"20rem"}
            alt={`${country.name} flag`}
            loading="lazy"
            className="img-cover"
          />
        </div>
        <div className="page__details">
          <h1 className="page__title" ref={headingRef} tabIndex={-1}>{country.name}</h1>
          <div className="page__info">
            <div className="country__geo__info">
              <p className="info">
                Native Name: <span>{country.nativeName}</span>
              </p>
              <p className="info">
                Population: <span>{populationNumber(country.population)}</span>
              </p>
              <p className="info">
                Region: <span>{country.region}</span>
              </p>
              <p className="info">
                Sub Region: <span>{country.subregion}</span>
              </p>
              <p className="info">
                Capital: <span>{country.capital?? "None"}</span>
              </p>
            </div>
            <div className="country__addtional__info">
              <p className="info">
                Top Level Domain: <span>{country.topLevelDomain}</span>
              </p>
              <p className="info">
                Currencies:{" "}
                <span>
                  {formatCurrencies(country.currencies)}
                </span>
              </p>
              <p className="info">
                Languages:{" "}
                <span>
                  {formatLanguages(country.languages)}
                </span>
              </p>
            </div>
          </div>
          <div className="border_countries">
            <h2 className="title">Border Countries: {country.borders ? "" : "None"}</h2>
              <div className="countries">
                    {
                      country.borders?.map(code => {
                        const name = codeToNameMap[code] || code;
                        return <button className="border__btn cloud" key={code} onClick={() => onSelect(code)}>{name}</button>;
                      })
                    }
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
