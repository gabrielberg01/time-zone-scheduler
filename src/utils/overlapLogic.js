import { DateTime } from "luxon";

/**
 * Finds overlapping availability windows for all participants.
 * If a meeting length is provided, the overlap is divided into smaller chunks.
 * @param {Array} participants - List of participants and their availability.
 * @param {number} meetingLength - Length of the meeting in minutes.
 * @returns {Array} - Array of overlapping time slots with at least 2 participants.
 */
export function findOverlaps(participants, meetingLength = 30) {
  let events = [];

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

    if (prevTime && activeParticipants.size > 1) {
      const overlapStart = prevTime;
      const overlapEnd = currentEvent.time;

      // Break overlap into meeting length chunks
      let slotStart = overlapStart;
      while (slotStart < overlapEnd) {
        let slotEnd = slotStart.plus({ minutes: meetingLength });

        if (slotEnd > overlapEnd) {
          break;
        }

        overlaps.push({
          start: slotStart,
          end: slotEnd,
          participants: [...activeParticipants],
        });

        slotStart = slotEnd;
      }
    }

    // Add or remove participants
    if (currentEvent.type === "start") {
      activeParticipants.add(currentEvent.participant);
    } else {
      activeParticipants.delete(currentEvent.participant);
    }

    prevTime = currentEvent.time;
  }

  // Filter to ensure only valid overlaps (at least 2 participants)
  return overlaps.filter(slot => slot.participants.length > 1);
}
