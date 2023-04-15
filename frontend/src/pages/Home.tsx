import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-[90%] mx-auto mt-10">
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
          <div className="card-body">
            <h2 className="card-title">Swap</h2>
            <p></p>
            <div className="card-actions justify-end">
              <Link to="/swap" className="btn btn-primary">
                see more
              </Link>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
          <div className="card-body">
            <h2 className="card-title">Pool</h2>
            <p></p>
            <div className="card-actions justify-end">
              <Link to="/pool" className="btn btn-primary">
                see more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
