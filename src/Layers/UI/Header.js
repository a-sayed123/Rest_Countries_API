export default function Header({onChangeTheme, isDark}){
    const headerClasses = `header ${isDark ? "dark" : "" }`

    return (
        <header className={headerClasses}>
            <h1 className="header__title">Where in the world?</h1>
            <button className="header__btn" type="button" onClick={onChangeTheme}>
                <span className="content">Dark Mode</span>
            </button>
        </header>
    )
}

