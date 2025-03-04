import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

function FinalConfirmation() {
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    const storedMeeting = localStorage.getItem("selectedMeeting");
    if (storedMeeting) {
      const parsedMeeting = JSON.parse(storedMeeting);
      setMeeting(parsedMeeting);
    }
  }, []);

  return (
    <div className="confirmation-container">
      <h2>Meeting Confirmed!</h2>
      {meeting ? (
        <p>
          <strong>Final Time Slot:</strong> {DateTime.fromISO(meeting.start).toFormat("MMMM dd, yyyy - h:mm a")} - {DateTime.fromISO(meeting.end).toFormat("h:mm a")}
        </p>
      ) : (
        <p className="text-danger">No meeting selected.</p>
      )}
      <button className="btn btn-primary">Add to Calendar</button>
      <button className="btn btn-secondary">Copy Shareable Link</button>
      <Link to="/" className="btn btn-success">Finish</Link>
    </div>
  );
}

export default FinalConfirmation;
