import React from "react";

function ProposedMeetings({ suggestedTimes, onSelectMeeting }) {
  return (
    <div className="card p-3">
      <h4>Suggested Meeting Times</h4>
      {suggestedTimes.length === 0 ? (
        <p className="text-danger"><strong>No valid meeting times found. Please adjust availability.</strong></p>
      ) : (
        suggestedTimes.map((slot, index) => (
          <div 
            key={index} 
            className="mb-2 p-3 border bg-light meeting-slot"
            onClick={() => onSelectMeeting(slot)} 
            style={{ cursor: "pointer" }}
          >
            <strong>{slot.start.toFormat("MMMM dd, yyyy - h:mm a")} - {slot.end.toFormat("h:mm a")}</strong>
            <p>{slot.participants.length} Participants Available</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProposedMeetings;
