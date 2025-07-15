import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                // ✅ Save login session info
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('fromFrontend', 'true');  // Used to allow access to Kite
                navigate('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
        setLoading(false); // stop loading
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
                    <h5 className="mt-3 fw-semibold">Login to your account</h5>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-medium">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="yourname@gmail.com"
                            value={form.email}
                            onChange={handleChange}
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
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? "Login..." : "Login"}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
