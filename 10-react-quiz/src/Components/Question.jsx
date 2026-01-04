import Options from "./Options";

export default function Question({
  correctOption,
  options,
  question,
  answer,
  dispatch,
}) {
  return (
    <div>
      <h4>{question}</h4>
      <Options {...{ options, correctOption, answer, dispatch }} />
    </div>
  );
}
