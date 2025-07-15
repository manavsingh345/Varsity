import { Link } from 'react-router-dom';
import './Hero.css'; 

function Pricing() {
    return (
        <div className="container my-5">
            <div className="row align-items-center">
                
                <div className="col-12 col-md-4 mb-4 mb-md-0">
                    <h1 className="fs-2 mb-3">Unbeatable pricing</h1>
                    <p>
                        We pioneered the concept of discount broking and price transparency in India.
                        Flat fees and no hidden charges.
                    </p>
                    <Link to="/pricing" className="text-primary pricing-link">
                        See pricing <i className="fa-solid fa-arrow-right-long"></i>
                    </Link>
                </div>

               
                <div className="d-none d-md-block col-md-2"></div>

                
                <div className="col-12 col-md-6">
                    <div className="row g-3 text-center">
                        <div className="col-12 col-md-6">
                            <div className="border p-4 h-100">
                                <h1 className="mb-3">₹0</h1>
                                <p>
                                    Free equity delivery <br /> and direct mutual funds
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="border p-4 h-100">
                                <h1 className="mb-3">₹20</h1>
                                <p>Intraday and F&O</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
