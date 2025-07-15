import './Hero.css'; // reuse existing CSS

function Education() {
    return (
        <div className="container mt-5 py-4 mb-5">
            <div className="row align-items-center">
                {/* Left image section */}
                <div className="col-12 col-md-6 px-md-5 text-center text-md-start mb-4 mb-md-0">
                    <img
                        src="media/images/education.svg"
                        alt="Education"
                        className="education-img"
                    />
                </div>

                {/* Right text section */}
                <div className="col-12 col-md-6 px-md-5">
                    <h1 className="fs-2 mb-3">Free and open market education</h1>
                    <p>
                        Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.
                    </p>
                    <a href="#" className="edu-link d-inline-block mb-4">
                        Varsity <i className="fa-solid fa-arrow-right-long"></i>
                    </a>

                    <p className="mt-4">
                        TradingQ&A, the most active trading and investment community in India for all your market related queries.
                    </p>
                    <a href="#" className="edu-link d-inline-block">
                        TradingQ&A <i className="fa-solid fa-arrow-right-long"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Education;
