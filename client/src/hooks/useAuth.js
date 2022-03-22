import { useEffect, useState } from 'react';

//using "localStorage" to persist login between tabs/windows
export default function useAuth(defaultValue, key) {
  const [value, setValue] = useState(()=> {
    const stickyValue = window.localStorage.getItem(key);

    return stickyValue !== null
    ? JSON.parse(stickyValue)
    : defaultValue;
  });

  useEffect(()=>{
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue]
}
