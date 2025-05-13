import { useCallback, useState } from "react";

function CountPage() {
  const [numb, setNumb] = useState(0);

  const onClickPlusBtn = useCallback(() => {
    if (numb >= 0) {
      return setNumb(numb + 1);
    } else {
      return alert("0이다~~~");
    }
  }, [numb]);

  const onClickMinusBtn = useCallback(() => {
    if (numb > 0) {
      return setNumb(numb - 1);
    } else {
      return alert("0이다~~~");
    }
  }, [numb]);

  return (
    <>
      <button onClick={onClickPlusBtn}>+</button>
      <button onClick={onClickMinusBtn}>-</button>
      <p>{numb}</p>
    </>
  );
}
export default CountPage;
