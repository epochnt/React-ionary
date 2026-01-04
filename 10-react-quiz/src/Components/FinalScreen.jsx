export default function FinalScreen({ points, maxPoints, highscore }) {
  const percentage = (points / maxPoints) * 100;
  let emoji;

  if (points === 100) emoji = "🥇";
  if (points < 100 && points >= 80) emoji = "🎉";
  if (points < 80 && points >= 50) emoji = "🙃";
  if (points < 50 && points > 0) emoji = "🤨";
  if (points === 0) emoji = "🤦";
  return (
    <>
      <p className="result">
        <span>⭐️</span> You scored <strong>{points}</strong>
        out of {maxPoints} ({Math.ceil(percentage)})
      </p>
      <p className="highscore"> Highscore : {highscore} points</p>
    </>
  );
}
