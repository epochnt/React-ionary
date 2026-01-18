export default function Button({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold
        text-stone-800 uppercase transition-colors duration-300
        hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300
        focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
}
