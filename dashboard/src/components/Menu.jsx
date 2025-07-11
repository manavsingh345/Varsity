import React, { useState,useRef,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef();
  const dropdownRef = useRef();


  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!localStorage.getItem("token");
  const username = user?.name || "Login";
  const avatarLetter = username[0]?.toUpperCase() || "U";

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="Logo" style={{ width: "50px" }} />
      <div className="menus" >
        <div style={{marginTop:"21px"}}>
        <ul>
          <li>
            <Link to="/" onClick={() => handleMenuClick(0)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/orders" onClick={() => handleMenuClick(1)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings" onClick={() => handleMenuClick(2)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/positions" onClick={() => handleMenuClick(3)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/funds" onClick={() => handleMenuClick(4)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
         <li>
            <p
              className={menuClass}
              onClick={() => window.location.href = "https://frontend-09yj.onrender.com"}
            
            >
              Zerodha
            </p>
        </li>

        

        </ul>
</div>
        <hr />

        <div className="profile" onClick={handleProfileClick} ref={profileRef}>
          <div className="avatar">{avatarLetter}</div>
          <p className="username">{username}</p>
        </div>

        {isProfileDropdownOpen && (
  <div ref={dropdownRef} style={{
    position: "absolute",
    top: "60px",
    right: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    padding: "20px",
    width: "240px",
    zIndex: 10,
  }}>
    {!isLoggedIn ? (
      <button
        onClick={() => navigate("/login")}
        style={{
          width: "100%",
          padding: "10px 16px",
          backgroundColor: "#2962FF",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        Login
      </button>
    ) : (
      <>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px"
        }}>
          <div style={{
            background: "#2962FF",
            color: "#fff",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "18px"
          }}>
            {avatarLetter}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "600", fontSize: "16px" }}>{user?.name}</p>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload();
          }}
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: "#ff5252",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </>
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default Menu;
