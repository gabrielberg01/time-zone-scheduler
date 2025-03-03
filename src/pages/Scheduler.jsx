import React, { useState } from "react";
import ParticipantForm from "../components/ParticipantForm/ParticipantForm";
import CalendarView from "../components/CalendarView/CalendarView";
import ProposedMeetings from "../components/ProposedMeetings/ProposedMeetings";
import { findOverlaps } from "../utils/overlapLogic";
import { Link } from "react-router-dom";

function Scheduler() {
  const [participants, setParticipants] = useState([]);
  const [suggestedTimes, setSuggestedTimes] = useState([]);

  const handleAddParticipant = (participant) => {
    setParticipants([...participants, participant]);
  };

  const generateMeetingTimes = () => {
    const times = findOverlaps(participants);
    setSuggestedTimes(times);
  };

  return (
    <div className="container">
      <h2>Time Zone Scheduler</h2>
      <ParticipantForm onAddParticipant={handleAddParticipant} />
      <CalendarView participants={participants} />
      <button className="btn btn-success" onClick={generateMeetingTimes}>
        Generate Meeting Times
      </button>
      <ProposedMeetings suggestedTimes={suggestedTimes} />
      <Link to="/confirmation" className="btn btn-primary">Proceed to Confirmation</Link>
    </div>
  );
}

export default Scheduler;
