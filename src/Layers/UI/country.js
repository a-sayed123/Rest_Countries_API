import { useContext, useState } from "react"
import data from "../data/data";
import { populationNumber } from "../logic/helpers";
import { DispatchContext } from "../Context/dispatchContext";

function Back({ onClick }) {
    return (
        <button type="button" onClick={onClick} className="page__btn cloud">Back</button>
    )
}

function Borders({ borders, onChooseCountry }) {
    const dispatch = useContext(DispatchContext)
    if (!borders) return null;
    const countries = borders.map(item => {
        return dispatch({ type: "alpha3Code", value: item, data: data });
    })

    const countriesBtns = countries.map((countryBtn, index) => {
        return <button className="border__btn cloud" key={index} type="button" onClick={() => onChooseCountry({ country: countryBtn })}>{countryBtn.name}</button>;
    })

    return countriesBtns;
}

function PageContent({ country, onChooseCountry }) {

    return (
        <div className="page__content">
            <div className="page__img"><img src={country.flag} width={"30rem"} height={"20rem"} alt={`${country.name} flag`} loading="lazy" className="img-cover" /></div>
            <div className="page__details">
                <h1 className="page__title">{country.name}</h1>
                <div className="page__info">
                    <div className="country__geo__info">
                        <p className="info">Native Name: <span>{country.nativeName}</span></p>
                        <p className="info">Population: <span>{populationNumber(country.population)}</span></p>
                        <p className="info">Region: <span>{country.region}</span></p>
                        <p className="info">Sub Region: <span>{country.subregion}</span></p>
                        <p className="info">Capital: <span>{country.capital}</span></p>
                    </div>
                    <div className="country__addtional__info">
                        <p className="info">Top Level Domain: <span>{country.topLevelDomain}</span></p>
                        <p className="info">Currencies: <span>{country.currencies.map((currence) => { return `${currence.name} ` })}</span></p>
                        <p className="info">Languages: <span>{country.languages.map((lang) => { return `${lang.name} ` })}</span></p>
                    </div>
                </div>
                <div className="border_countries">
                    <h2 className="title">Border Countries:</h2>
                    <div className="countries">
                        <Borders borders={country.borders} onChooseCountry={onChooseCountry} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Country({ country, onBack, onChooseCountry }) {
    const Country = country.country;
    return (
        <section className="page">
            <Back onClick={onBack} />
            <PageContent country={Country} onChooseCountry={onChooseCountry} />
        </section>
    )
}