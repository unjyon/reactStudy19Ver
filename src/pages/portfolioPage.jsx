import { useCallback, useEffect, useState } from "react";

function portfolioPage() {
  const [showPopup, setShowPopup] = useState(false);

  const Popup = useCallback(() => {
    return <>팝업이다</>;
  }, []);

  const MainBanner = useCallback(() => {
    return (
      <div className="visual">
        <p></p>
        <button onClick={setShowPopup(true)}>click</button>
      </div>
    );
  }, []);

  return (
    <>
      {showPopup && Popup()}
      {MainBanner()}
    </>
  );
}

export default portfolioPage;
