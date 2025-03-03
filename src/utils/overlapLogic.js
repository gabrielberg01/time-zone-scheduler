import { DateTime } from "luxon";

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

  events.sort((a, b) => a.time - b.time);

  let currentParticipants = new Set();
  let overlaps = [];
  let prevTime = null;

  for (let i = 0; i < events.length; i++) {
    let currentEvent = events[i];

    if (prevTime && currentParticipants.size > 0) {
      overlaps.push({
        start: prevTime,
        end: currentEvent.time,
        participants: [...currentParticipants],
      });
    }

    if (currentEvent.type === "start") {
      currentParticipants.add(currentEvent.participant);
    } else {
      currentParticipants.delete(currentEvent.participant);
    }

    prevTime = currentEvent.time;
  }

  return overlaps;
}
