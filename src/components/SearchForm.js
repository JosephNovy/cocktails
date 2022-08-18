import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchterm } = useGlobalContext();
  const searchvalue = React.useRef("");
  React.useEffect(() => {
    searchvalue.current.focus();
  }, []);
  const searchcocktail = () => {
    setSearchterm(searchvalue.current.value);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handlesubmit}>
        <div className="form-control">
          <label htmlFor="name">search your drinks</label>
          <input
            type="text"
            id="name"
            ref={searchvalue}
            onChange={searchcocktail}
          ></input>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
