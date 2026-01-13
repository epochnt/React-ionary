import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import styles from "./CountryList.module.css";
import { useCities } from "../../contexts";

export default function CounteryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add you first city by clicking on a city on the map"}
      />
    );

  const countries = Object.values(
    cities.reduce((countrylist, city) => {
      if (!countrylist[city?.country]) {
        countrylist[city.country] = {
          country: city.country,
          emoji: city.emoji,
        };
      }
      return countrylist;
    }, {})
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}
