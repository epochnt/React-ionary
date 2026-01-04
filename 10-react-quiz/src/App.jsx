import { useEffect, useReducer } from "react";
import {
  Main,
  Error,
  Header,
  Loader,
  Progress,
  Question,
  NextButton,
  StartScreen,
  FinalScreen,
} from "./components";
import { MOCK_JSON_API } from "./config";
import "./index.css";

const initialState = {
  questions: [],
  index: 0,
  points: 0,
  highscore: 0,
  answer: null,
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

    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? question.points + state.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    default:
      throw new Error("Unknown action received");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const numQues = questions.length;
  const maxPoints = questions.reduce(
    (acc, questions) => (acc += questions.points),
    0
  );

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
        {status === "active" && (
          <>
            <Progress {...{ index, numQues, points, maxPoints, answer }} />
            <Question
              {...questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton {...{ dispatch, answer, index, numQues }} />
          </>
        )}
        {status === "finished" && (
          <FinalScreen {...{ points, maxPoints, highscore }} />
        )}
      </Main>
    </div>
  );
}
