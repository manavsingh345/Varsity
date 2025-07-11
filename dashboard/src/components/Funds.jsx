import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Funds() {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3002/wallet", {
          headers: { Authorization: token },
        });
        setBalance(res.data.balance);
        setTransactions(res.data.transactions || []); // Assuming server returns this
      } catch (err) {
        console.error("Failed to fetch wallet balance", err);
      }
    };

    fetchBalance();
  }, []);

  const handleAddFunds = async () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const { data: order } = await axios.post("http://localhost:3002/create-order", {
        amount,
      });

      const options = {
        key: "rzp_test_YXAIhB5LFqErPj",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Zerodha Clone",
        description: "Add Funds to Wallet",
        handler: async function (response) {
          toast.success("✅ Payment successful!");



          try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:3002/add-funds", {
              amount: Number(amount),
              paymentId: response.razorpay_payment_id,
            }, {
              headers: { Authorization: token },
            });

            setBalance(prev => prev + Number(amount));
            setTransactions(prev => [
              {
                amount: Number(amount),
                type: "Credit",
                paymentId: response.razorpay_payment_id,
                date: new Date().toLocaleString(),
              },
              ...prev,
            ]);
            setAmount("");
          } catch (error) {
            console.error("Wallet Update Error", error);
            toast.error("⚠️ Payment done but wallet update failed");

          }
        },
        prefill: {
          name: "Manav Singh",
          email: "manav@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#1e40af",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error", err);
      toast.error("❌ Something went wrong during payment");

    }
  };

  return (
    <div className="content">
      <div className="section">
        <span>
          <i className="section-icon fa fa-wallet"></i>
          <p className="title">Funds</p>
        </span>
        <hr className="divider" />

        {/* Balance Card */}
        <div className="holdings-summary">
          <div className="summary-item">
            <h5>₹{balance.toFixed(2)}</h5>

            <p>Available Wallet Balance</p>
          </div>
        </div>

        {/* Add Funds Form */}
        <div className="row" style={{ marginTop: "30px" }}>
          <div className="col">
            <label htmlFor="amount" className="title">Add Funds</label>
            <input
              type="number"
              id="amount"
              className="form-control"
              placeholder="Enter amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                marginTop: "10px",
                fontSize: "0.9rem",
              }}
            />
            <button
              className="btn btn-blue"
              onClick={handleAddFunds}
              style={{
                marginTop: "20px",
                padding: "10px 25px",
                fontSize: "0.9rem",
                borderRadius: "5px",
              }}
            >
              Add Funds
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="order-table" style={{ marginTop: "40px" }}>
          <p className="title" style={{ marginBottom: "15px" }}>Recent Transactions</p>
          {transactions.length === 0 ? (
            <p style={{ color: "gray", fontSize: "0.9rem" }}>No recent transactions.</p>
          ) : (
            <table className="order-table">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={index}>
                    <td className="align-left">{txn.paymentId || "N/A"}</td>
                    <td style={{ color: txn.type === "Credit" ? "#4caf50" : "#f44336" }}>{txn.type}</td>
                    <td>₹{txn.amount}</td>
                    <td>{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />

    </div>
  );
}

export default Funds;
