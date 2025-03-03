import React from "react";
import { DateTime } from "luxon";

function CalendarView({ participants }) {
  return (
    <div className="card p-3">
      <h4>Overview of All Users & Time Blocks</h4>
      {participants.map((p, index) => (
        <div key={index} className="mb-2">
          <strong>{p.name || "Anonymous"}</strong> ({p.timezone})
          {p.availabilities.map((slot, i) => {
            const startUTC = DateTime.fromISO(slot.start, { zone: p.timezone }).toUTC().toFormat("HH:mm");
            const endUTC = DateTime.fromISO(slot.end, { zone: p.timezone }).toUTC().toFormat("HH:mm");
            return <p key={i} className="badge bg-primary">{startUTC} - {endUTC} UTC</p>;
          })}
        </div>
      ))}
    </div>
  );
}

export default CalendarView;
