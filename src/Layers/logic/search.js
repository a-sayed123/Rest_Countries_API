export function search(state, action) {
    console.log(state, action)
    let countries = []
    switch (action.type) {
        case "query": {
            if(action.region === "initial")
                countries =  action.data.filter((item) => item.name.toLowerCase().startsWith(action.query.toLowerCase()));
            else
                countries =  state.filter((item) => item.name.toLowerCase().startsWith(action.query.toLowerCase()));
            break;
        }
        case "alpha3Code" || "alpha2Code": {
            countries =  action.data.find((item) => item[action.type] === action.value);
            break;
        }
        case "region": {
            if(action.query === "")
                countries =  action.data.filter((item) => item.region === action.value);
            else
                countries =  state.filter((item) => item.region === action.value);
            break;
        }
        default: {
            throw Error("Unknown action");
        }
    }

    return countries;
}
