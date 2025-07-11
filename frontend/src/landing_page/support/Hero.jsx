function Hero() {
  return (
    <section className="bg-primary text-white py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Support Portal</h4>
          <a href="#" className="text-white text-decoration-underline">Track Tickets</a>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6 mb-4">
            <h1 className="fs-3">Search for an answer or browse help topics to create a ticket</h1>
            <input
              className="form-control my-3"
              placeholder="Eg. how do I activate F&O"
            />
            <div>
              <a href="#" className="text-white me-3 text-decoration-underline">Track account opening</a>
              <a href="#" className="text-white me-3 text-decoration-underline">Track segment activation</a>
              <a href="#" className="text-white me-3 text-decoration-underline">Intraday margins</a>
              <a href="#" className="text-white text-decoration-underline">Kite user</a>
            </div>
          </div>

          <div className="col-md-6">
            <h4 className="text-white mb-3">Featured</h4>
            <ul className="text-white">
              <li><a className="text-white text-decoration-underline" href="#">Current Takeovers and Delisting - January 2024</a></li>
              <li><a className="text-white text-decoration-underline" href="#">Latest Intraday leverages - MIS & CO</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Hero;