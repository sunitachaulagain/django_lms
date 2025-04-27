function Home() {
  return (
    <div className="container mt-4">
      {/* Latest courses */}
      <h3 className="pb-1 mb-4">
        Latest courses
        <a href="#" className="float-end">
          See All
        </a>
      </h3>
      <div className="row">
        {/* Cards */}
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="card m-2" style={{ width: '18rem' }}>
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course Title</a>
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Popular courses */}
      <h3 className="pb-1 mb-4 mt-5">
        Popular courses
        <a href="#" className="float-end">
          See All
        </a>
      </h3>
      <div className="row">
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="card m-2" style={{ width: '18rem' }}>
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course Title</a>
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Teachers */}
      <h3 className="pb-1 mb-4 mt-5">Popular Teachers</h3>
      <div className="row">
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="card m-2" style={{ width: '18rem' }}>
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Teacher Name</a>
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Student Testimonial */}
      <h3 className="pb-1 mb-4 mt-5">Student Testimonial</h3>
      <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner text-center">
          <div className="carousel-item active">
            <blockquote className="blockquote">
              <p className="mb-4">"The best learning environment I've experienced!"</p>
              <footer className="blockquote-footer text-white">
                Alice <cite title="Source Title">BCA Program</cite>
              </footer>
            </blockquote>
          </div>

          <div className="carousel-item">
            <blockquote className="blockquote">
              <p className="mb-4">"Faculty members are supportive and inspiring."</p>
              <footer className="blockquote-footer text-white">
                Bob <cite title="Source Title">Computer Science</cite>
              </footer>
            </blockquote>
          </div>

          <div className="carousel-item">
            <blockquote className="blockquote">
              <p className="mb-4">"An unforgettable journey of knowledge and growth."</p>
              <footer className="blockquote-footer text-white">
                Charlie <cite title="Source Title">IT Department</cite>
              </footer>
            </blockquote>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* End Student Testimonial */}

    </div>  

      )
    };
export default Home;
