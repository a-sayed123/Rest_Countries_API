
export function showCountryName(countryName){
    return countryName.length < 10 ? (
        <h2 className="country__name">{countryName}</h2>
    ) : (
        <h2 className="country__name" style={{fontSize: "1.6rem"}}>{countryName}</h2>
    )
}