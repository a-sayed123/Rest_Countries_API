import { useEffect, useRef } from "react";

export default function useCountryFocusRestore(selectedCountry) {
    const lastCountryCodeRef = useRef(null);

    useEffect(() => {
        // Entering the details page:
        // remember which country was selected.
        if (selectedCountry) {
            lastCountryCodeRef.current = selectedCountry.alpha3Code;
            return;
        }

        // Returning to the countries list:
        // restore focus to the previously selected country.
        const code = lastCountryCodeRef.current;

        if (!code) return;

        const button = document.querySelector(
            `[data-country-code="${code}"]`
        );

        button?.focus();
    }, [selectedCountry]);
}