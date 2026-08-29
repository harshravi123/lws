"use client";

import { useEffect, useState } from "react";

const ssbDates = [
  [8, 7],
  [8, 24],
  [9, 11],
  [9, 28],
  [10, 13],
  [10, 30],
  [11, 17],
];

function getUpcomingDates() {
  const today = new Date();
  const year = today.getFullYear();
  const cutoff = new Date(year, today.getMonth(), today.getDate() + 3);
  const dates = ssbDates.map(([month, day]) => new Date(year, month, day));
  const upcoming = dates.filter((date) => date > cutoff);

  let nextDate = dates[dates.length - 1];
  while (upcoming.length < ssbDates.length) {
    nextDate = new Date(
      nextDate.getFullYear(),
      nextDate.getMonth(),
      nextDate.getDate() + 16,
    );

    if (nextDate > cutoff) {
      upcoming.push(nextDate);
    }
  }

  return upcoming.slice(0, ssbDates.length);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

function AnnouncementItems({ dates, duplicate = false }) {
  return (
    <div className="announcement-content" aria-hidden={duplicate}>
      <strong>Admissions open for upcoming courses</strong>
      <span className="announcement-divider" aria-hidden="true" />
      <strong>SSB Interview Coaching - 15 Days</strong>
      {dates.map((date) => (
        <a
          href="#courses"
          key={`${duplicate ? "duplicate-" : ""}${date.toISOString()}`}
        >
          {formatDate(date)} - Male/Female
        </a>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  const [upcomingDates, setUpcomingDates] = useState([]);

  useEffect(() => {
    setUpcomingDates(getUpcomingDates());
  }, []);

  return (
    <section
      className="announcement"
      aria-label="Upcoming course announcements"
    >
      <div className="announcement-label">
        <span className="announcement-pulse" />
        Upcoming Batches
      </div>

      <div className="announcement-window" aria-live="polite">
        {upcomingDates.length > 0 && (
          <div className="announcement-track">
            <AnnouncementItems dates={upcomingDates} />
            <AnnouncementItems dates={upcomingDates} duplicate />
          </div>
        )}
      </div>
    </section>
  );
}
