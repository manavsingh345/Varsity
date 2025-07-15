function Team() {
  return (
    <div className="container mb-5">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center mt-5">People</h1>
      </div>

      <div
        className="row p-3 text-muted team-row"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center mb-2  team-col-img">
          <img
            src="media/images/mn1.jpg"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-2">Manav Singh</h4>
          <h6>Developer</h6>
        </div>
        <div className="col-6 p-3 team-col-text">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on <a href="https://www.linkedin.com/in/manavsinghman/">Linkedin</a> / <a href="https://x.com/ManavSingh321">Twitter</a> {" "}
            
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;