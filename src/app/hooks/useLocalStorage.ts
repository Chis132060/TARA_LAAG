import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        return parsed !== null ? parsed : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      if (value instanceof Function) {
        // Use functional setState to get the latest value and avoid stale closures
        setStoredValue((prevStored) => {
          const valueToStore = value(prevStored);
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(new Event("local-storage-update"));
          return valueToStore;
        });
      } else {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new Event("local-storage-update"));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Sync state across different instances of the hook
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          if (parsed !== null) {
            setStoredValue(parsed);
          }
        }
      } catch (error) {
        console.error("Error syncing localStorage:", error);
      }
    };

    window.addEventListener("local-storage-update", handleStorageChange);
    window.addEventListener("storage", handleStorageChange); // Handles changes from other tabs

    return () => {
      window.removeEventListener("local-storage-update", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue] as const;
}
