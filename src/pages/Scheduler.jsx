import React, { useState } from "react"; // ✅ Ensure useState is imported
import ParticipantForm from "../components/ParticipantForm/ParticipantForm";
import CalendarView from "../components/CalendarView/CalendarView";
import ProposedMeetings from "../components/ProposedMeetings/ProposedMeetings";
import { findOverlaps } from "../utils/overlapLogic";

function Scheduler() {
  const [participants, setParticipants] = useState([]);
  const [suggestedTimes, setSuggestedTimes] = useState([]);
  const [validMeeting, setValidMeeting] = useState(false);

  const handleAddParticipant = (participant) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const generateMeetingTimes = () => {
    const times = findOverlaps(participants);
    setSuggestedTimes(times);
    setValidMeeting(times.length > 0);
  };

  const handleProceedToConfirmation = (meeting) => {
    localStorage.setItem("selectedMeeting", JSON.stringify(meeting)); // ✅ Store the selected meeting in localStorage
    window.location.href = "/confirmation"; // ✅ Redirect to confirmation page
  };

  return (
    <div className="scheduler-container">
      <h2>Schedule a Meeting</h2>
      <ParticipantForm onAddParticipant={handleAddParticipant} />
      <CalendarView participants={participants} />
      <button className="btn btn-success mt-3" onClick={generateMeetingTimes}>
        Generate Meeting Times
      </button>

      {!validMeeting && suggestedTimes.length > 0 && (
        <div className="alert alert-warning mt-3">
          <strong>No overlapping times found!</strong> Adjust availability and try again.
        </div>
      )}

      {/* ✅ Ensure onSelectMeeting is passed */}
      <ProposedMeetings suggestedTimes={suggestedTimes} onSelectMeeting={handleProceedToConfirmation} />
    </div>
  );
}


export default Scheduler;
