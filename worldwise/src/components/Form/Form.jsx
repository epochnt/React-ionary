// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useCities } from "../../contexts";
import { useNavigate } from "react-router";
import { useUrlPosition } from "../../hooks";

import { DatePicker } from "react-datepicker";
import Button from "../Button/Button";
import BackButton from "../BackButton/BackButton";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

const REVESRE_GEOCODE_BASE_URL = import.meta.env.VITE_REVERSE_GEOCODE_API_URL;

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoCodingErr, setGeoCodingErr] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const [{ lat, lng }] = useUrlPosition();
  const { createCity, isLoading: isSubmitLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReverseGeoData() {
      try {
        setIsGeoLoading(true);
        setGeoCodingErr("");
        const res = await fetch(
          `${REVESRE_GEOCODE_BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!res.ok)
          throw new Error("Form reverse geolocation fetch failed", {
            cause: "FETCH_FAILED",
          });

        const data = await res.json();
        if (!data.countryCode)
          throw new Error("Please click on a land area inside a country 😃", {
            cause: "NO_COUNTRY",
          });

        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.log(error);
        if (error.cause === "NO_COUNTRY") setGeoCodingErr(error.message);
      } finally {
        setIsGeoLoading(false);
      }
    }
    if (!lat && !lng) return;
    fetchReverseGeoData();
  }, [lat, lng]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  };

  if (isGeoLoading) return <Spinner />;
  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map"} />;
  if (geoCodingErr) return <Message message={geoCodingErr} />;

  return (
    <form
      className={`${styles.form} ${isSubmitLoading} ? ${styles.form.loading} : ''`}
      onSubmit={handleOnSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}
