import { useState, useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useFocusOnKey } from "../../../hooks/useFocusOnKey";
import { useFocusOutside } from "../../../hooks/useFocusOutside";

export default function Controls({
  query,
  onQueryChange,
  region,
  onRegionChange,
}) {
  const [show, setShow] = useState(false);
  const active = useRef(-1);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  useClickOutside(selectRef, () => setShow(false));
  useFocusOutside(selectRef, () => setShow(false));
  useFocusOnKey(inputRef, "/");

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "All"];

  const keyDownActions = {
    ArrowDown: (e) => handleArrowDown(e),
    ArrowUp: (e) => handleArrowUp(e),
    Escape: (e) => handleEscape(e),
    Home: (e) => handleHome(e),
    End: (e) => handleEnd(e),
  };

  function handleOptionKeyDown(e) {
    if (e.key in keyDownActions) keyDownActions[e.key](e);
  }

  function handleSearch(e) {
    e.preventDefault();
  }

  function handleShooseRgion(region) {
    onRegionChange(region);
    setShow(false);
    active.current = -1;
    triggerRef.current?.focus();
  }

  function handleEscape(e) {
    e.preventDefault();
    setShow(false);
    active.current = -1;
    triggerRef.current?.focus();
  }
  function handleArrowDown(e) {
    e.preventDefault();
    moveTo(active.current + 1)
  }
  function handleArrowUp(e) {
    e.preventDefault();
    moveTo(active.current - 1)
  }
  function handleHome(e) {
    e.preventDefault();
    moveTo(0);
  }
  function handleEnd(e) {
    e.preventDefault();
    moveTo(getOptions().length -1);
  }
  function handleSpaceOrEnter(e){
    if(e.key !== " " && e.key !== "Enter")
      return;
    e.preventDefault();
    const option = e.target.closest("[role='option']");
    handleShooseRgion(option.textContent);
  }

  function getOptions(){
    return [...selectRef.current.querySelectorAll("[role='option']")];
  }

  function moveTo(index){
    const options = getOptions();

    if(!options.length) return;

    active.current = (index + options.length) % options.length;

    options[active.current].focus();
  }

  return (
    <header className="main__header">
      <form onSubmit={handleSearch} className="input__search" role="search">
        <input
          type="text"
          id="search__input"
          placeholder="Search a country..."
          ref={inputRef}
          autoComplete="off"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search for a country"
        />
        <button type="submit" className="search__btn cloud">
          Search
        </button>
      </form>

      <div className="region__select" ref={selectRef} onKeyDown={handleOptionKeyDown}>
        <button
          type="button"
          className="select__btn cloud"
          onClick={() => setShow((v) => !v)}
          aria-expanded={show}
          aria-haspopup="listbox"
          aria-controls="regionSelect"
        >
          {region || "Filter by Region"}
        </button>
        <div
          className={`custom__select ${show ? "" : "hide"}`}
          id="regionSelect"
        >
          <ul className="list__items" role="listbox">
            {regions.map((item, index) => {
              return <li
                key={item}
                role="option"
                tabIndex={index === active.current ? 0 : -1 }
                aria-selected={region === item}
                className="list__item"
                onClick={() => handleShooseRgion(item)}
                onKeyDown={handleSpaceOrEnter}
              >{item}</li>;
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
