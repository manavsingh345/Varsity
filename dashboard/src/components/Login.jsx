import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await axios.post("https://varsity-lodm.onrender.com/login", {
                email,
                password,
            });
            
            localStorage.setItem("token", data.token);

            const dashboardRes = await axios.get("https://varsity-lodm.onrender.com/dashboard", {
                headers: {
                    Authorization: data.token,
                },
            });

            const user = dashboardRes.data.user;
            localStorage.setItem("user", JSON.stringify(user));
             navigate("/");
           
        } catch (err) {
            alert("Invalid email or password");
            console.error("❌ Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.logoContainer}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM20 36C11.16 36 4 28.84 4 20C4 11.16 11.16 4 20 4C28.84 4 36 11.16 36 20C36 28.84 28.84 36 20 36Z" fill="#2962FF" />
                        <path d="M20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20C30 14.48 25.52 10 20 10ZM20 26C16.68 26 14 23.32 14 20C14 16.68 16.68 14 20 14C23.32 14 26 16.68 26 20C26 23.32 23.32 26 20 26Z" fill="#2962FF" />
                        <path d="M20 16C17.8 16 16 17.8 16 20C16 22.2 17.8 24 20 24C22.2 24 24 22.2 24 20C24 17.8 22.2 16 20 16Z" fill="#2962FF" />
                    </svg>
                    <h1 style={styles.title}>Kite</h1>
                </div>
                <p style={styles.subtitle}>Login to your account</p>

                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputContainer}>
                        <label htmlFor="email" style={styles.label}>Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={isLoading ? styles.buttonDisabled : styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fa",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    card: {
        background: "#fff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "16px",
    },
    title: {
        fontSize: "28px",
        fontWeight: "600",
        color: "#2962FF",
        marginLeft: "12px",
    },
    subtitle: {
        fontSize: "16px",
        color: "#666",
        marginBottom: "32px",
    },
    form: {
        width: "100%",
    },
    inputContainer: {
        marginBottom: "20px",
        textAlign: "left",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "14px",
        fontWeight: "500",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "12px 16px",
        border: "1px solid #e0e0e0",
        borderRadius: "4px",
        fontSize: "14px",
        color: "#333",
        boxSizing: "border-box",
        transition: "border 0.2s",
    },
    inputFocus: {
        borderColor: "#2962FF",
        outline: "none",
    },
    button: {
        width: "100%",
        padding: "14px",
        backgroundColor: "#2962FF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "8px",
        transition: "background-color 0.2s",
    },
    buttonDisabled: {
        width: "100%",
        padding: "14px",
        backgroundColor: "#cccccc",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "not-allowed",
        marginTop: "8px",
    },
    footer: {
        marginTop: "24px",
        fontSize: "14px",
        color: "#666",
    },
    footerText: {
        marginBottom: "12px",
    },
    link: {
        color: "#2962FF",
        textDecoration: "none",
        fontWeight: "500",
    },
};

export default Login;