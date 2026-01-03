import Options from "./Options";

export default function Question({ correctOption, points, options, question }) {
  return (
    <div>
      <h4>{question}</h4>
      <Options {...{ options }} />
    </div>
  );
}
