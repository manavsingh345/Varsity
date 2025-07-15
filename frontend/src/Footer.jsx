import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Footer() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        }, 500); // check every 500ms

        return () => clearInterval(interval);
    }, []);
    return (
        <div className='container-fluid bg-light border-top '>
            <div className="row mt-5" style={{ marginLeft: '100px' }}>
                <div className="col">
                    <img src="media/images/logo.svg" style={{ width: '50%' }} alt="" />
                    <p className='text-muted mt-3' style={{ fontSize: '14px' }}>&copy; 2010 - 2025, Zerodha Broking Ltd. <br />All rights reserved.</p>
                </div>
                <div className="col">
                    <p>Company</p>
                    <Link to="/about" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>About</Link><br />
                    <Link to="/product" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Product</Link><br />
                    <Link to="/product" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Zerodha Universe</Link><br />
                    <Link to="/pricing" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Pricing</Link><br />
                    <Link to="/product" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Zerodha Kite</Link><br />
                    <Link to="/" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Zerodha Trust</Link><br />
                    {/* <a href="" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Open source</a><br /> */}
                </div>
                <div className="col">
                    <p>Support</p>
                    <Link to="/support" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Contact us</Link><br />
                    {!isLoggedIn ? (
                        <>
                            <Link to="/signup" className='text-muted text-decoration-none' style={{ marginBottom: '10px', display: 'inline-block' }}>Signup</Link><br />
                            <Link to="/login" className='text-muted text-decoration-none' style={{ marginBottom: '10px', display: 'inline-block' }}>Login</Link><br />
                        </>
                    ) : (
                        <>
                            <span
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setIsLoggedIn(false);
                                }}
                                style={{ cursor: "pointer", color: "#6c757d", marginBottom: '10px', display: 'inline-block' }}
                                className='text-decoration-none'
                            >
                                Logout
                            </span>
                            <br />
                        </>
                    )}

                    <Link to="/product" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Investment offerings</Link><br />
                    <Link to="/about" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Builder</Link><br />
                    <Link to="/product" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Start Trading</Link><br />
                    <Link to="/pricing" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Free equity investments</Link><br />

                   
                </div>

                <div className="col">
                    <p>Account</p>
                    <a href="" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none' >Minor demat account</a><br />
                    <a href="" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>NRI demat account</a><br />
                    <a href="" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Commodity</a><br />
                    <a href="" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Open demat account</a><br />
                    <a href="" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Dematerialisation</a><br />
                    <a href="" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Fund transfer</a><br />
                    <a href="" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>MTF</a><br />
                    <a href="" style={{ marginBottom: '10px', display: 'inline-block' }} className='text-muted text-decoration-none'>Referral program</a><br />
                </div>
            </div>
            <div className="container  text-muted" style={{ fontSize: '12px', marginTop: '70px' }}>
                <p>Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF</p>

                <p>Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances</p>

                <p> Smart Online Dispute Resolution | Grievances Redressal Mechanism</p>

                <p>Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>

                <p>Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</p>

                <p>"Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.</p>
                 
            </div>
            <div style={{display:"flex", justifyContent: "center",gap: "25px",marginTop:"10px", fontSize: "10px"}}>
                    <h6 style={{paddingLeft:"15px",fontSize: "13px",color: "#666",paddingTop:"10px" }}>NSE</h6>
                    <h6 style={{paddingLeft:"25px",fontSize: "15px",color: "#666" ,paddingTop:"10px" }}>BSE</h6>
                    <h6 style={{paddingLeft:"25px",fontSize: "13px",color: "#666" ,paddingTop:"10px" }}>Terms & conditions</h6>
                    <h6 style={{paddingLeft:"25px",fontSize: "13px",color: "#666" ,paddingTop:"10px" }}>Policies & procedures</h6>
                    <h6 style={{paddingLeft:"25px",fontSize: "13px",color: "#666" ,paddingTop:"10px" }}>Privacy policy</h6>
                    <h6 style={{paddingLeft:"25px",fontSize: "13px",color: "#666" ,paddingTop:"10px" }}>Disclosure</h6>
                    <h6 style={{paddingLeft:"25px",fontSize: "13px",color: "#666" ,paddingTop:"10px" }}>For investor's attention</h6>
                    <h6 style={{paddingLeft:"25px",fontSize: "13px",color: "#666" ,paddingTop:"10px" }}>Investor charter</h6>
                </div>
           
        </div>
    )
}
export default Footer;