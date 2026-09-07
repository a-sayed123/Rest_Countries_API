
export function populationNumber(num) {
    let b = String((num - (num % 1000000000)) / 1000000000)
    let m = String(parseInt((num % 1000000000) / 1000000));
    let t = String(parseInt((num % 1000000) / 1000));
    let h = String(((num % 1000000) % 1000));

    if (t.length < 3 && m !== "0")
        t = `${t.length === 2 ? "0" : "00"}${t}`

    if (h.length < 3 && t !== "0")
        h = `${h.length === 2 ? "0" : "00"}${h}`

    b = b > 0 ? `${b},` : "";
    m = m > 0 ? `${m},` : "";
    t = t > 0 ? `${t},` : "";
    h = h > 0 ? `${h}` : "000";

    let renderNumber = `${b}${m}${t}${h}`;
    if (num === 0)
        renderNumber = "0"
    return renderNumber
}