import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) callback();
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [callback]);
}
