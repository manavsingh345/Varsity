import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateTicket() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPPORT_API}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });


      const data = await res.json();
      if (res.ok) {
        toast.success("Thank you! Our team will contact you shortly.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("⚠️ " + data.error);
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 p-4 rounded shadow bg-white" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center text-primary">Create a Support Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject of your message"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your issue..."
            className="form-control"
            rows="5"
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Submit Ticket"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default CreateTicket;
