import { useState } from "react";
import LoginPopup from "./LoginPopup";

function Hero() {
  const [showPopup, setShowPopup] = useState(false);

  const handleProtectedRedirect = (e) => {
    e.preventDefault();
    const isLoggedIn =
      localStorage.getItem("fromFrontend") === "true" &&
      localStorage.getItem("token");

    if (isLoggedIn) {
      window.location.href = import.meta.env.VITE_DASHBOARD_URL;
    } else {
      setShowPopup(true);
    }
  };

  return (
    <>
      <LoginPopup show={showPopup} onClose={() => setShowPopup(false)} />

      <div className="container border-bottom mb-5">
        <div className="text-center mt-5 p-3">
          <h1>Technology</h1>
          <h3 className="text-muted mt-3 fs-4">
            Sleek, modern and intuitive trading platforms
          </h3>
          <p className="mt-3 mb-5">
            Check out Kite{" "}
            <span
              onClick={handleProtectedRedirect}
              style={{ textDecoration: 'none', cursor: 'pointer', color: 'blue' }}
            >
              investment offerings <i className="fa-solid fa-arrow-right-long"></i>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Hero;
