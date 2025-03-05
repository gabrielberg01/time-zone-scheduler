import { DateTime } from "luxon";

/**
 * Finds overlapping availability windows for all participants.
 * @param {Array} participants - List of participants and their availability.
 * @returns {Array} - Array of overlapping time slots with at least 2 participants.
 */
export function findOverlaps(participants) {
  let events = [];

  // Convert each participant's times to UTC and store start/end events
  participants.forEach((p) => {
    p.availabilities.forEach((slot) => {
      const startUTC = DateTime.fromFormat(slot.start, "HH:mm", { zone: p.timezone }).toUTC();
      const endUTC = DateTime.fromFormat(slot.end, "HH:mm", { zone: p.timezone }).toUTC();
      events.push({ time: startUTC, type: "start", participant: p.name });
      events.push({ time: endUTC, type: "end", participant: p.name });
    });
  });

  // Sort events by time
  events.sort((a, b) => a.time - b.time);

  let activeParticipants = new Set();
  let overlaps = [];
  let prevTime = null;

  for (let i = 0; i < events.length; i++) {
    let currentEvent = events[i];

    // If at least 2 participants are in the overlap window, store the valid range
    if (prevTime && activeParticipants.size > 1) {
      overlaps.push({
        start: prevTime,
        end: currentEvent.time, // The end time is the current event's start/end time
        participants: [...activeParticipants],
      });
    }

    // Add or remove participants based on whether it's a start or end event
    if (currentEvent.type === "start") {
      activeParticipants.add(currentEvent.participant);
    } else {
      activeParticipants.delete(currentEvent.participant);
    }

    prevTime = currentEvent.time;
  }

  // Filter out non-overlapping slots (where only 1 participant was present)
  return overlaps.filter(slot => slot.participants.length > 1);
}
