import data from "../data/data"
import { populationNumber } from "../logic/helpers";
import { useContext } from "react";
import { DispatchContext } from "../Context/dispatchContext";

export default function Content({ region, query, onChooseCountry, renderCountries }) {
    const dispatch = useContext(DispatchContext);
    function renderCard({ item, index }) {
        return (
            <li className="list__item" key={index}>
                <article className="country">
                    <button type="button" className="country__flag" onClick={(e) => onChooseCountry({ country: item })}><img src={item.flag} alt={`${item.name} flag`} className="img-cover" loading="lazy" width={"30rem"} height={"15rem"} /></button>
                    <div className="content">
                        <h2 className="country__name">{item.name}</h2>
                        <ul className="country__details">
                            <li className="list__item"> Population: {populationNumber(item.population)}</li>
                            <li className="list__item"> Region: {item.region}</li>
                            <li className="list__item"> Capital: {item.capital ? item.capital : "None"}</li>
                        </ul>
                    </div>
                </article>
            </li>
        )
    }

    return (
        <>
            <section className="countries">
                <ul className="list__items">
                    {
                        renderCountries.map((country, index) => {
                            return renderCard({item: country, index: index})
                        })
                    }
                </ul>
            </section>
        </>

    )
}