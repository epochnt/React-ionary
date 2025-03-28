import { useState } from "react";
import PropTypes from "prop-types";

const style = `
  .rating__container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .rating__stars {
    display: flex;
    gap: 0.25rem;
  }

  .rating__value {
    margin: 0;
    line-height: 1;
  }

  .star {
    display: block;
    cursor: pointer;
  }

  /* This will turn all stars highlighted when you hover just the parent and not the spans
    .rating__stars:hover .star svg{
      fill: gold;
    }
    
    .rating__stars .star:hover ~ .star svg{
      fill: none;
    } 
  */
`;

Rating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  setGetRating: PropTypes.func,
};

export default function Rating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  setGetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    color: color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div>
      <style>{style}</style>
      <div className={`rating__container ${className}`}>
        <div className="rating__stars">
          {Array.from({ length: maxRating }, (_, i) => {
            return (
              <Star
                key={i}
                size={size}
                color={color}
                full={tempRating ? i < tempRating : i < rating}
                clickHandler={() => {
                  setRating(i + 1);
                  setGetRating && setGetRating(i + 1);
                }}
                mouseEnterHandler={() => {
                  setTempRating(i + 1);
                }}
                mouseLeaveHandler={() => {
                  setTempRating(0);
                }}
              />
            );
          })}
        </div>
        <p className="rating__value" style={textStyle}>
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating}
        </p>
      </div>
    </div>
  );
}

function Star({
  full = false,
  clickHandler,
  mouseEnterHandler,
  mouseLeaveHandler,
  size,
  color,
}) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };
  return (
    <span
      role="button"
      className="star"
      onClick={clickHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={full ? color : "none"}
        viewBox="0 0 24 24"
        stroke={color}
        style={starStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2}"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </span>
  );
}
