import React, { useState } from "react";
import LoginPopup from "./LoginPopup";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleProtectedRedirect = () => {
    const isLoggedIn =
      localStorage.getItem("fromFrontend") === "true" &&
      localStorage.getItem("token");

    if (isLoggedIn) {
      window.location.href = "http://localhost:5174";
    } else {
      setShowPopup(true);
    }
  };

  return (
    <>
      <LoginPopup show={showPopup} onClose={() => setShowPopup(false)} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-6 p-5 mt-5">
            <h1>{productName}</h1>
            <p>{productDesription}</p>
            <div>
              <span
                onClick={handleProtectedRedirect}
                style={{ textDecoration: 'none', cursor: 'pointer', color: 'blue' }}
              >
                Learn More <i className="fa-solid fa-arrow-right-long"></i>
              </span>
            </div>
          </div>
          <div className="col-6">
            <img
              src={imageURL}
              onClick={handleProtectedRedirect}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RightSection;