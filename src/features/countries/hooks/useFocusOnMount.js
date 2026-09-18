import { useEffect } from "react";

export default function useFocusOnMount(ref, country) {
    useEffect(() => {
        ref.current?.focus();
    }, [ref, country])
}