import './Hero.css'; // Assuming you're keeping CSS in Hero.css for now

function Awards() {
    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                {/* Left Side – Image */}
                <div className="col-12 col-md-6 px-md-5 py-4 text-center">
                    <img
                        src="media/images/largestBroker.svg"
                        alt="Largest Broker"
                        className="img-fluid award-img mb-3"
                    />
                </div>

                {/* Right Side – Text and List */}
                <div className="col-12 col-md-6 px-md-5 py-4">
                    <h1 className="award-heading mb-3">Largest stock broker in India</h1>
                    <p className="award-text">
                        2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:
                    </p>

                    {/* Feature List */}
                    <div className="row mt-4 px-md-5">
                        <div className="col-6">
                            <ul className="award-list">
                                <li>Futures and Options</li>
                                <li>Commodity derivatives</li>
                                <li>Currency derivatives</li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul className="award-list">
                                <li>Stock & IPOs</li>
                                <li>Direct mutual funds</li>
                                <li>Bonds and Govt. Securities</li>
                            </ul>
                        </div>
                    </div>

                    {/* Logos */}
                    <div className="text-center mt-4">
                        <img
                            src="media/images/pressLogos.png"
                            alt="Press Logos"
                            className="img-fluid logos-img"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Awards;
