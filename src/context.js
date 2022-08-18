import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchterm, setSearchterm] = useState("a");
  const [cocktails, setCacktails] = useState([]);
  const fetchdrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchterm}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newcocktails = drinks.map((drink) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            drink;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCacktails(newcocktails);
      } else {
        setCacktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [searchterm]);
  useEffect(() => {
    fetchdrinks();
  }, [searchterm, fetchdrinks]);
  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchterm }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
