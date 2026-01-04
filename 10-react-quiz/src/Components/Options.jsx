export default function Options({ options, answer, correctOption, dispatch }) {
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option
            ${index === answer ? "answer" : ""}
            ${
              answer !== null
                ? index === correctOption
                  ? " correct "
                  : " wrong "
                : ""
            }`}
          key={option}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
