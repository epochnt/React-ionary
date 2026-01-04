export default function NextButton({ dispatch, answer, index, numQues }) {
  if (answer === null) return;
  if (index < numQues - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
      Finish
    </button>
  );
}
