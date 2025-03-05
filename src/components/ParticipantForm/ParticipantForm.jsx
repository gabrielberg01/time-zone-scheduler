import React, { useState } from "react";
import { timeZoneList } from "../../utils/timeUtils";

function ParticipantForm({ onAddParticipant }) {
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [availabilities, setAvailabilities] = useState([{ start: "", end: "" }]);

  const generateTimeOptions = () => {
    let times = [];
    for (let hour = 0; hour < 24; hour++) {
      ["00", "30"].forEach((minute) => {
        const time = `${hour.toString().padStart(2, "0")}:${minute}`;
        times.push(time);
      });
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleAvailabilityChange = (index, field, value) => {
    setAvailabilities((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addAvailability = () => {
    if (availabilities.length < 10) {
      setAvailabilities([...availabilities, { start: "", end: "" }]);
    }
  };

  const removeAvailability = (index) => {
    setAvailabilities(availabilities.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!timezone) {
      alert("Please select a timezone");
      return;
    }
    onAddParticipant({ name, timezone, availabilities });

    // ✅ Reset name and timezone after submission
    setName("");
    setTimezone("");
  };

  return (
    <div className="card p-4 mb-4 w-75">
      <h4 className="mb-3">Edit Availability</h4>
      <input
        type="text"
        className="form-control mb-3"
        value={name}
        placeholder="Name (Optional)"
        maxLength={50}
        onChange={(e) => setName(e.target.value)}
      />
      <select className="form-control mb-3 timezone-dropdown" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
        <option value="">Select Timezone</option>
        {timeZoneList.map((tz) => (
          <option key={tz} value={tz}>{tz}</option>
        ))}
      </select>
      <h6>Availability Windows:</h6>
      {availabilities.map((slot, index) => (
        <div key={index} className="d-flex mb-2">
          <select className="form-control me-2 time-dropdown" value={slot.start} onChange={(e) => handleAvailabilityChange(index, "start", e.target.value)}>
            <option value="">Select Start Time</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          <select className="form-control me-2 time-dropdown" value={slot.end} onChange={(e) => handleAvailabilityChange(index, "end", e.target.value)}>
            <option value="">Select End Time</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          <button className="btn btn-danger btn-sm" onClick={() => removeAvailability(index)}>X</button>
        </div>
      ))}
      {availabilities.length < 10 && <button className="btn btn-secondary btn-sm mt-2" onClick={addAvailability}>+ Add Availability</button>}
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>Save Changes</button>
    </div>
  );
}

export default ParticipantForm;
