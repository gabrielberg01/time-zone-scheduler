import React from "react";
import { DateTime } from "luxon";

function ProposedMeetings({ suggestedTimes }) {
  return (
    <div className="card p-3">
      <h4>Suggested Meeting Times</h4>
      {suggestedTimes.length === 0 ? (
        <p>No matching time slots found.</p>
      ) : (
        suggestedTimes.map((slot, index) => {
          const startLocal = slot.start.setZone("local").toFormat("MMMM dd, yyyy - h:mm a");
          const endLocal = slot.end.setZone("local").toFormat("h:mm a");
          return (
            <div key={index} className="mb-2 p-2 border">
              <strong>{startLocal} - {endLocal}</strong>
              <p>{slot.participants.length} Participants Available</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ProposedMeetings;
