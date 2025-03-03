import React from "react";
import { Link } from "react-router-dom";

function FinalConfirmation() {
  return (
    <div className="container text-center">
      <h2>Meeting Confirmed!</h2>
      <p>Final Time Slot: 2:00 PM – 3:30 PM</p>
      <button className="btn btn-primary">Add to Calendar</button>
      <button className="btn btn-secondary">Copy Shareable Link</button>
      <Link to="/" className="btn btn-success">Finish</Link>
    </div>
  );
}

export default FinalConfirmation;
