import { useState } from "react";
import LoginPopup from "./LoginPopup";
function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const handleProtectedRedirect = () => {
    const isLoggedIn =
      localStorage.getItem("fromFrontend") === "true" &&
      localStorage.getItem("token");

    if (isLoggedIn) {
      window.location.href = "https://dashboard-m8d9.onrender.com/";
    } else {
      //alert("Please login before accessing Kite.");
      setShowPopup(true);
    }
  };


  return (
    <>
     <LoginPopup show={showPopup} onClose={() => setShowPopup(false)} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <img
              src={imageURL}
              onClick={handleProtectedRedirect}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="col-6 p-5 mt-5">
            <h1>{productName}</h1>
            <p>{productDesription}</p>
            <div>
              <span
                onClick={handleProtectedRedirect}
                style={{ textDecoration: 'none', cursor: 'pointer', color: 'blue' }}
              >
                Try Kite <i className="fa-solid fa-arrow-right-long"></i>
              </span>
              <span
                onClick={handleProtectedRedirect}
                style={{ textDecoration: 'none', marginLeft: '50px', cursor: 'pointer', color: 'blue' }}
              >
                Start Trading <i className="fa-solid fa-arrow-right-long"></i>
              </span>
            </div>

            <div className="mt-3">
              <a href="https://play.google.com/store/apps/details?id=com.zerodha.kite3">
                <img src="media/images/googlePlayBadge.svg" />
              </a>
              <a href="https://apps.apple.com/in/app/zerodha-kite-trade-invest/id1449453802">
                <img
                  src="media/images/appstoreBadge.svg"
                  style={{ marginLeft: "50px" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftSection;
