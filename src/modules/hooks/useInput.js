import { useState, useRef, useCallback } from "react";

export default function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const ref = useRef(null);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, ref, onChange];
}
