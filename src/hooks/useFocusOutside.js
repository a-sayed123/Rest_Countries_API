import { useEffect } from "react";

export function useFocusOutside(ref, onOutside){
    useEffect(() => {
        function handler(e){
            if(!ref)
                return;
            const next = e.relatedTarget;
            if (!ref.current?.contains(next))
                onOutside();
            }
        document.addEventListener("focusout", handler);
        return () =>  document.removeEventListener("focusout", handler);
    }, [ref, onOutside]);
}