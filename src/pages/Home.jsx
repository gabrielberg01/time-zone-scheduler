import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to TimeZoneScheduler</h1>
      <p>Schedule meetings across different time zones.</p>
      <Link to="/scheduler" className="btn btn-primary btn-lg mt-3">
        Get Started
      </Link>
    </div>
  );
}

export default Home;
