import { DateTime } from "luxon";

/**
 * Finds overlapping availability windows for all participants.
 * @param {Array} participants - List of participants and their availability.
 * @returns {Array} - Array of overlapping time slots with at least 2 participants.
 */
export function findOverlaps(participants) {
  let events = [];

  participants.forEach((p) => {
    p.availabilities.forEach((slot) => {
      const startUTC = DateTime.fromISO(slot.start, { zone: p.timezone }).toUTC();
      const endUTC = DateTime.fromISO(slot.end, { zone: p.timezone }).toUTC();
      events.push({ time: startUTC, type: "start", participant: p });
      events.push({ time: endUTC, type: "end", participant: p });
    });
  });

  // Sort events based on time
  events.sort((a, b) => a.time - b.time);

  let activeParticipants = new Set();
  let overlaps = [];
  let prevTime = null;

  for (let i = 0; i < events.length; i++) {
    let currentEvent = events[i];

    // If we have at least 2 participants, record this as a valid overlap
    if (prevTime && activeParticipants.size > 1) {
      overlaps.push({
        start: prevTime,
        end: currentEvent.time,
        participants: [...activeParticipants],
      });
    }

    // Update active participants
    if (currentEvent.type === "start") {
      activeParticipants.add(currentEvent.participant.name);
    } else {
      activeParticipants.delete(currentEvent.participant.name);
    }

    prevTime = currentEvent.time;
  }

  // Only return overlaps with at least 2 participants
  return overlaps.filter(slot => slot.participants.length > 1);
}
