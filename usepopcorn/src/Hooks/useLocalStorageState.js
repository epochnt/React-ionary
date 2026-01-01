import { useEffect, useState } from 'react';

export function useLocalStorageState (key, initialValue) {
  const [ val, setVal] = useState(()=> {
    const localVal = localStorage.getItem(key);
    return JSON.parse(localVal) || initialValue;
  })

  // works on both add and remove due to useEffect
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  },[val, key])

  return [val, setVal];
}