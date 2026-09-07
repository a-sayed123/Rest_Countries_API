import { useState, useReducer } from "react";
import { DispatchContext } from "../Context/dispatchContext";
import Content from "./content"
import MainHeader from "./mainHeader"
import Country from "./country";
import {search} from "../logic/search";
import data from "../data/data";

export default function Main({isDark}){
    const mainClasses = `main ${isDark ? "dark" : ""}`;
    // const [query, setQuery] = useState("");
    const [state, dispatch] = useReducer(search, data);
    const [choosedCountry, setChoosedCountry] = useState({});
    // console.log("query : ", query)
    // console.log("state : ", state)
    // console.log("choosedCountry : ", choosedCountry)
    function onSelect(action){
        action["data"] = data;
        console.log(action)
        dispatch(action)
    }
    
    function handleChooseCountry(country){
        setChoosedCountry(country)
    }
    function handelBack(){
        setChoosedCountry({})
    }

    function Body(){
        return (
            <>
                <MainHeader onSelect={onSelect}/>
                <Content onChooseCountry={handleChooseCountry} renderCountries={state}/>
            </>
        )
    }

    return (
        <DispatchContext value={dispatch}>
            <main className={mainClasses}>
                {choosedCountry.country ? <Country country={choosedCountry} onBack={handelBack} onChooseCountry={handleChooseCountry}/> : <Body/>}
            </main>
        </DispatchContext>
    )
}
