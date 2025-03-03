import React, { useState } from "react";
import { timeZoneList } from "../../utils/timeUtils";

function ParticipantForm({ onAddParticipant }) {
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [availabilities, setAvailabilities] = useState([{ start: "", end: "" }]);

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
    setName("");
    setTimezone("");
    setAvailabilities([{ start: "", end: "" }]);
  };

  return (
    <div className="card p-3 mb-3">
      <h4>Add Participant</h4>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          value={name}
          placeholder="Name (Optional)"
          maxLength={50}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <select className="form-control" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          <option value="">Select Timezone</option>
          {timeZoneList.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <h6>Availability Windows:</h6>
        {availabilities.map((slot, index) => (
          <div key={index} className="d-flex mb-2">
            <input type="time" className="form-control me-2" value={slot.start} onChange={(e) => handleAvailabilityChange(index, "start", e.target.value)} />
            <input type="time" className="form-control me-2" value={slot.end} onChange={(e) => handleAvailabilityChange(index, "end", e.target.value)} />
            <button className="btn btn-danger btn-sm" onClick={() => removeAvailability(index)}>X</button>
          </div>
        ))}
        {availabilities.length < 10 && <button className="btn btn-secondary btn-sm" onClick={addAvailability}>+ Add Availability</button>}
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>Add Participant</button>
    </div>
  );
}

export default ParticipantForm;
