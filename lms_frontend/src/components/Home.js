function Home() {
  return (
    <div className="container mt-4">
      {/*latest courses*/ }
      <h3 className="pb-1 mb-4">Latest courses</h3>
      <div className="row">
        
        <div className="card m-2" style={{ width: '18rem' }}>
          <a href="#"><img src="logo512.png" className="card-img-top" alt="..." /></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Title</a></h5>
          </div>
        </div>

        <div className="card m-2" style={{ width: '18rem' }}>
          <a href="#"><img src="logo512.png" className="card-img-top" alt="..." /></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Title</a></h5>
          </div>
        </div>

        <div className="card m-2" style={{ width: '18rem' }}>
          <a href="#"><img src="logo512.png" className="card-img-top" alt="..." /></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Title</a></h5>
          </div>
        </div>

        <div className="card m-2" style={{ width: '18rem' }}>
          <a href="#"><img src="logo512.png" className="card-img-top" alt="..." /></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Title</a></h5>
          </div>
        </div>

      </div>

      {/**End latest courses */}
      {/**Popular Courses */}

      <h3 className="pb-1 mb-4 mt-5">Popular courses</h3>
      <div className="row">
        
        <div className="card m-2" style={{ width: '18rem' }}>
          <a href="#"><img src="logo512.png" className="card-img-top" alt="..." /></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Title</a></h5>
          </div>
        </div>

        <div className="card m-2" style={{ width: '18rem' }}>
          <a href="#"><img src="logo512.png" className="card-img-top" alt="..." /></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Title</a></h5>
          </div>
        </div>

        <div className="card m-2" style={{ width: '18rem' }}>
          <a href="#"><img src="logo512.png" className="card-img-top" alt="..." /></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Title</a></h5>
          </div>
        </div>

        <div className="card m-2" style={{ width: '18rem' }}>
          <a href="#"><img src="logo512.png" className="card-img-top" alt="..." /></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Title</a></h5>
          </div>
        </div>

      </div>

     {/**End popular courses */}
    </div>
  );
}

export default Home;
