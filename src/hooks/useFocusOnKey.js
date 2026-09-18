import { useEffect } from "react";

export function useFocusOnKey(ref, key = "/"){
    useEffect(() => {
        function handler(e){
            if(e.key === key && document.activeElement !== ref.current){
                e.preventDefault();
                ref.current.focus();
            }
        }
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [ref, key]);
}