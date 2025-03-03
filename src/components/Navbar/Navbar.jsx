import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">TimeZoneScheduler</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/scheduler">Scheduler</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/confirmation">Final Confirmation</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
