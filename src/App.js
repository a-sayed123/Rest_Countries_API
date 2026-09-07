import "./styles/base.css"
import "./styles/layout.css"
import "./styles/utils.css"
import "./styles/components.css"

import Header from './Layers/UI/Header.js';
import Main from './Layers/UI/main.js';
import { useState } from "react";

export default function App() {
    const [isDark, setIsDark] = useState(false);
    function onChangeTheme() {
        setIsDark(!isDark);
    }
    
    isDark ? document.body.classList.add("dark") : document.body.classList.remove("dark");

    return (
        <>
            <Header onChangeTheme={onChangeTheme} isDark={isDark} />
            <Main isDark={isDark} />
        </>
    );
}