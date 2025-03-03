import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center">
      <h1>Welcome to TimeZoneScheduler</h1>
      <p>Schedule meetings across different time zones.</p>
      <Link to="/scheduler" className="btn btn-primary">Get Started</Link>
    </div>
  );
}

export default Home;
