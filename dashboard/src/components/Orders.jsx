// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Orders.css";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user || !user._id) {
//       setError("User not logged in.");
//       return;
//     }

//     axios
//       .get(`http://localhost:3002/orders/${user._id}`)
//       .then((res) => {
//         setOrders(res.data.reverse());
//       })
//       .catch((err) => {
//         console.error("Error fetching orders:", err);
//         setError("Failed to fetch orders.");
//       });
//   }, []);

//   return (
//     <div className="orders-page">
//       <h2 className="title">Order History ({orders.length})</h2>

//       {error && (
//           <div className="not-logged-in-card">
//           <h3>Please log in to view your order history</h3>
//           <p>Order history is only visible to logged-in users.</p>
//           <button onClick={() => window.location.href = "/login"}>Go to Login</button>
//       </div>
//       )}


//       {!error && orders.length === 0 ? (
//         <div className="no-orders">
//           <p>You haven't placed any orders yet.</p>
//         </div>
//       ) : (
//         orders.length > 0 && (
//           <div className="order-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Instrument</th>
//                   <th>Qty</th>
//                   <th>Price</th>
//                   <th>Mode</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order, index) => (
//                   <tr key={index}>
//                     <td>{order.name}</td>
//                     <td>{order.qty}</td>
//                     <td>₹{order.price.toFixed(2)}</td>
//                     <td className={order.mode === "BUY" ? "buy" : "sell"}>
//                       {order.mode}
//                     </td>
//                     <td>
//                       {order.createdAt
//                         ? new Date(order.createdAt).toLocaleString()
//                         : "N/A"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default Orders;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      setError("User not logged in.");
      return;
    }

    axios
      .get(`http://localhost:3002/orders/${user._id}`)
      .then((res) => {
        setOrders(res.data.reverse());
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
      });
  }, []);

  return (
    <div className="orders-modern-page">
      <h2 className="modern-title">📦 Order History ({orders.length})</h2>

      {error && (
        <div className="modern-card">
          <h3>🔐 Login Required</h3>
          <p>Please log in to view your order history.</p>
          <button onClick={() => window.location.href = "/login"}>Go to Login</button>
        </div>
      )}

      {!error && orders.length === 0 ? (
        <div className="modern-card">
          <h3>📭 No Orders Found</h3>
          <p>You haven’t placed any orders yet.</p>
        </div>
      ) : (
        orders.length > 0 && (
          <div className="modern-table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price.toFixed(2)}</td>
                    <td className={order.mode === "BUY" ? "modern-buy" : "modern-sell"}>
                      {order.mode}
                    </td>
                    <td>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default Orders;
