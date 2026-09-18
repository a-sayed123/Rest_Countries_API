import { useMemo, useState } from "react"

export default function useCountries(data){
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState("");
    const [selectedCode, setSelectedCode] = useState(null);


    const codeToNameMap = useMemo(() => {
        const map = {};

        data.forEach(c => {
            map[c.alpha3Code] = c.name;
        });

        return map;
    }, [data]);

    const nameToCodeMap = useMemo(() => {
        const map = {};

        data.forEach(c => {map[c.name] = c.alpha3Code});

        return map;
    }, [data]);

    const filteredCountries = useMemo(() => {
        return data.filter(c => {
            const matchQuery = c.name.toLowerCase().startsWith(query.toLocaleLowerCase());
            const matchRegion = region ? c.region === region || region === "All" : true;
            return matchQuery && matchRegion;
        });
    }, [data, query, region]);

    const selectedCountry = useMemo(() => {
        return data.find(c => c.alpha3Code === selectedCode) || null;
    }, [data, selectedCode]);

    function selectCountry(codeOrName){
        if(codeOrName.length === 3){
            setSelectedCode(codeOrName);
        }
        else
            setSelectedCode(nameToCodeMap[codeOrName] || null);
    }

    window.scrollTo(0, 0)

    function clearSelection(){
        setSelectedCode(null);
    }

    return {
        filteredCountries,
        selectedCountry,
        query, setQuery,
        region, setRegion,
        selectCountry,
        clearSelection,
        codeToNameMap
    };
}