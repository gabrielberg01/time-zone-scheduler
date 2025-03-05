import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

function FinalConfirmation() {
  const [meeting, setMeeting] = useState(null);
  const [copied, setCopied] = useState(false); // ✅ State for "Copied to Clipboard" message

  useEffect(() => {
    const storedMeeting = localStorage.getItem("selectedMeeting");
    if (storedMeeting) {
      const parsedMeeting = JSON.parse(storedMeeting);
      setMeeting(JSON.parse(storedMeeting));
    }
  }, []);

  const addToGoogleCalendar = () => {
    if (!meeting) return;

    const eventTitle = encodeURIComponent("Meeting Scheduled");
    const startTime = DateTime.fromISO(meeting.start).toFormat("yyyyMMdd'T'HHmmss'Z'");
    const endTime = DateTime.fromISO(meeting.end).toFormat("yyyyMMdd'T'HHmmss'Z'");
    const details = encodeURIComponent("Scheduled using the Time Zone Scheduler.");
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}/${endTime}&details=${details}`;

    window.open(googleCalendarUrl, "_blank");
  };

  const copyToClipboard = () => {
    if (!meeting) return;

    const meetingText = `Meeting Scheduled\nTime: ${DateTime.fromISO(meeting.start).toFormat("MMMM dd, yyyy - h:mm a")} - ${DateTime.fromISO(meeting.end).toFormat("h:mm a")}\n\nGenerated using Time Zone Scheduler.`;

    navigator.clipboard.writeText(meetingText).then(() => {
      setCopied(true); // ✅ Show "Copied!" message
      setTimeout(() => setCopied(false), 2000); // ✅ Hide after 2 seconds
    }).catch(err => console.error("Failed to copy:", err));
  };

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

      {/* Buttons for "Add to Calendar" and "Copy Link" */}
      {meeting && (
        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={addToGoogleCalendar}>
            Add to Google Calendar
          </button>
          <button className="btn btn-secondary" onClick={copyToClipboard}>
            Copy Shareable Link
          </button>
          {copied && <span className="text-success ms-2">✔ Copied to clipboard!</span>}
        </div>
      )}

      <Link to="/" className="btn btn-success mt-3">Finish</Link>
    </div>
  );
}

export default FinalConfirmation;
