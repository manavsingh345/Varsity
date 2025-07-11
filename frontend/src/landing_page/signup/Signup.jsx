import React, { useState } from 'react';

function Signup() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://varsity-lodm.onrender.com/signup', {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.text();

            if (res.status === 201 || res.ok) {
                alert("Signup complete!");
                window.location.href = "/login";
            } else if (res.status === 409) {
                alert("Account already exists!");
            } else {
                alert(data || "Something went wrong.");
            }

        } catch (err) {
            alert("Error during signup");
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }}>
                <div className="text-center mb-4">
                    <img
                        src="https://zerodha.com/static/images/logo.svg"
                        alt="Zerodha Logo"
                        style={{ width: '120px' }}
                    />
                    <h5 className="mt-3 fw-semibold">Signup to continue</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-medium">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-medium">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-medium">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Choose a strong password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Create Account</button>
                    <div className="text-center mt-3">
                        <span>Already have an account? </span>
                        <a href="/login" style={{ textDecoration: 'none' }}>Login</a>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Signup;
