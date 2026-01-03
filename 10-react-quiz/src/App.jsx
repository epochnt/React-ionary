import { useEffect, useReducer } from "react";
import {
  Header,
  Main,
  Loader,
  Error,
  StartScreen,
  Question,
} from "./components";
import { MOCK_JSON_API } from "./config";
import "./index.css";

const initialState = {
  questions: [],
  index: 0,
  // loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    default:
      throw new Error("Unknown action received");
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(MOCK_JSON_API);
        if (!res.ok)
          throw new Error(
            `Mock fetch fail, check if the json-server in runing. HTTP status${res.status}`
          );

        const data = await res.json();
        if (!data || !Object.keys(data).length)
          throw new Error("No mock data found, check if json file is empty !");

        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.log(error.message);
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQues={questions.length} {...{ dispatch }} />
        )}
        {status === "active" && <Question {...questions[index]}/>}
      </Main>
    </div>
  );
}
