import { Link } from 'react-router-dom';
import './Hero.css'; // assuming you're using a common stylesheet

function Stats() {
    return (
        <div className="container py-5">
            <div className="row align-items-center">
                {/* Text Content */}
                <div className="col-12 col-md-6 px-md-5 py-4">
                    <h1 className="fs-2 mb-4">Trust with confidence</h1>

                    <h2 className="fs-5 fw-bold mt-4">Customer-first always</h2>
                    <p className="text-muted">
                        That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.
                    </p>

                    <h2 className="fs-5 fw-bold mt-4">No spam or gimmicks</h2>
                    <p className="text-muted">
                        No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. Our philosophies.
                    </p>

                    <h2 className="fs-5 fw-bold mt-4">The Zerodha universe</h2>
                    <p className="text-muted">
                        Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
                    </p>

                    <h2 className="fs-5 fw-bold mt-4">Do better with money</h2>
                    <p className="text-muted">
                        With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.
                    </p>
                </div>

                {/* Image & Links */}
                <div className="col-12 col-md-6 px-md-5 py-4 text-center">
                    <img
                        src="media/images/ecosystem.png"
                        alt="Zerodha Ecosystem"
                        className="img-fluid mb-4"
                    />

                    <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                        <Link to="/product" className="text-primary link-stats">
                            Explore our products <i className="fa-solid fa-arrow-right-long"></i>
                        </Link>

                        <a
                            href={import.meta.env.VITE_DASHBOARD_URL}
                            className="text-primary link-stats"
                        >
                            Try Kite <i className="fa-solid fa-arrow-right-long"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;
