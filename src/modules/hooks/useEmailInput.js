import { useState, useRef, useCallback } from "react";

export default function useEmailInput() {
  const [id, setId] = useState("");
  const [domain, setDomain] = useState("naver.com");
  const idInputRef = useRef(null); // 초기값은 null -> {current: null}

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangeDomain = useCallback((e) => {
    setDomain(e.target.value);
  }, []);

  return [id, domain, idInputRef, onChangeId, onChangeDomain];
  // -> return 하는 부분에 배열이던 객체던 상관 없다. 마음대로 해도 됨.
}
