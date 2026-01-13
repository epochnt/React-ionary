import {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
import { MOCK_JSON_API } from "../config";

const CitiesContext = createContext();
const initalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw Error("Unkown action type dispatced");
  }
}

export function useCities() {
  if (!CitiesContext)
    throw new Error("useCities called outside Cities Context tree");
  return useContext(CitiesContext);
}

export function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initalState
  );

  useEffect(() => {
    async function getCities() {
      try {
        dispatch({ type: "loading" });

        const res = await fetch(MOCK_JSON_API);
        if (!res.ok)
          throw new Error(
            `Mock fetch fail, check if the json-server in runing. HTTP status${res.status}`
          );
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
        console.log(error.message);
      }
    }
    getCities();
  }, []);

  const getCity = async (id) => {
    if (+id === currentCity.id) return currentCity;
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${MOCK_JSON_API}/${id}`);
      if (!res.ok)
        throw new Error(
          `Mock fetch fail, check if the json-server in runing. HTTP status${res.status}`
        );
      const data = await res.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.log(error.message);
    }
  };

  const createCity = async (city) => {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(MOCK_JSON_API, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok)
        throw new Error(
          "Adding new city post call failed, check is server is running"
        );

      const data = await res.json();
      if (!data || !Object.keys(data).length)
        throw new Error("Empty obj recieved from write opertaion");

      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.log(error);
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${MOCK_JSON_API}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok)
        throw new Error("Failed to delete id, check is server is running");

      const data = await res.json();
      if (!data || !Object.values(data).length)
        throw new Error("Empty object deleted");

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.log(error);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
