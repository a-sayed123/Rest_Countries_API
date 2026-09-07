import { useRef, useState, useContext } from "react";
import { DispatchContext } from "../Context/dispatchContext";
import data from "../data/data";

export default function MainHeader({ onSelect }) {
  const [show, setShow] = useState(false);
  const regionRef = useRef("initial");
  const inputRef = useRef(null);
  function handleClick() {
    setShow(!show);
  }

  function handleChooseRegion(newRegion) {
    regionRef.current = newRegion;
    const action = { type: "region", region: regionRef.current, query: inputRef.current.value};
    onSelect(action);
  }

  function handleSearch(e) {
    e.preventDefault();
    const action = {type: "query", region: regionRef.current, query: inputRef.current.value};
    onSelect(action);
  }

  return (
    <header className="main__header">
      <form onSubmit={handleSearch} className="input__search">
        <input
          type="text"
          role="search"
          name="country"
          id="search__input"
          placeholder="Search a country..."
          ref={inputRef}
          autoComplete="off"
        />
        <button type="button" className="search__btn cloud" onClick={handleSearch}>
          Search
        </button>
      </form>
      <div className="region__select">
        <button type="button" className="select__btn cloud" onClick={handleClick}>Filter by Region</button>

        <section className={`custom__select ${show ? "" : "hide"}`}>
          <ul className="list__items">
            <li className="list__item"><button onClick={(e) => handleChooseRegion(e.target.textContent)}>Africa</button></li>
            <li className="list__item"><button onClick={(e) => handleChooseRegion(e.target.textContent)}>Americas</button></li>
            <li className="list__item"><button onClick={(e) => handleChooseRegion(e.target.textContent)}>Asia</button></li>
            <li className="list__item"><button onClick={(e) => handleChooseRegion(e.target.textContent)}>Europe</button></li>
            <li className="list__item"><button onClick={(e) => handleChooseRegion(e.target.textContent)}>Oceania</button></li>
          </ul>
        </section>
      </div>
    </header>
  );
}
