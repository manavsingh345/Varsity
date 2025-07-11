import { useNavigate } from 'react-router-dom';
function Universe() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    return (
        <div className="container mt-5 my-5">
            <div className="row text-center">
                <h1>The Zerodha Universe</h1>
                <p>
                    Extend your trading and investment experience even further with our
                    partner platforms
                </p>

                <div className="col-4 p-3 mt-5">
                    <img src="media/images/smallcaseLogo.png" />
                    <p className="text-small text-muted">Thematic investment platform</p>
                </div>
                <div className="col-4 p-3 mt-5">
                    <img src="media/images/streakLogo.png" style={{width:'180px'}}/>
                    <p className="text-small text-muted">Systematic trading platform</p>
                </div>
                <div className="col-4 p-3 mt-5">
                    <img src="media/images/dittoLogo.png" style={{width:'150px'}}/>
                    <p className="text-small text-muted">Personalized advice on life</p>
                </div>
                <div className="col-4 p-3 mt-5">
                    <img src="media/images/sensibullLogo.svg" style={{width:'150px'}}/>
                    <p className="text-small text-muted">Options trading platform</p>
                </div>
                <div className="col-4 p-3 mt-5">
                    <img src="media\images\tijori.png" style={{width:'150px' , height:'30px'}}/>
                    <p className="text-small text-muted">Investment research platform</p>
                </div>
                <div className="col-4 p-3 mt-5">
                    <img src="media\images\goldenpiLogo.png" style={{width:'150px',height:'30px'}}/>
                    <p className="text-small text-muted">Assest management platform</p>
                </div>
                {!isLoggedIn && (
                    <button
                        className="p-2 btn btn-primary fs-5 mb-5"
                        onClick={() => navigate('/signup')}
                        style={{ width: "20%", margin: "0 auto" }}
                    >
                        Signup Now
                    </button>
                )}
            </div>
        </div>
    );
}

export default Universe;