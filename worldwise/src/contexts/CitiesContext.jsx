import { useState, useEffect, useContext, createContext } from "react";
import { MOCK_JSON_API } from "../config";

const CitiesContext = createContext();

export function useCities() {
  if (!CitiesContext)
    throw new Error("useCities called outside Cities Context tree");
  return useContext(CitiesContext);
}

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true);

        const res = await fetch(MOCK_JSON_API);
        if (!res.ok)
          throw new Error(
            `Mock fetch fail, check if the json-server in runing. HTTP status${res.status}`
          );
        const data = await res.json();

        setCities(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  const getCity = async (id) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${MOCK_JSON_API}/${id}`);
      if (!res.ok)
        throw new Error(
          `Mock fetch fail, check if the json-server in runing. HTTP status${res.status}`
        );
      const data = await res.json();

      setCurrentCity(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
