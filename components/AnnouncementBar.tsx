"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const batchDates = [
  "2026-09-07",
  "2026-09-24",
  "2026-10-11",
  "2026-10-28",
  "2026-11-13",
  "2026-11-30",
  "2026-12-17",
];

function getActiveDates() {
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() + 3);
  return batchDates.filter((value) => new Date(`${value}T00:00:00`) > cutoff);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "long" }).format(new Date(`${value}T00:00:00`));
}

export default function AnnouncementBar() {
  const [activeDates, setActiveDates] = useState<string[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setActiveDates(getActiveDates()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (activeDates.length === 0) return null;

  return <div className="announcement-bar" aria-label="Upcoming batch announcements">
    <div className="announcement-label"><span /> Live admissions</div>
    <div className="announcement-window">
      <div className="scroll-text">
        <AnnouncementItems dates={activeDates} />
        <AnnouncementItems dates={activeDates} duplicate />
      </div>
    </div>
  </div>;
}

function AnnouncementItems({ dates, duplicate = false }: { dates: string[]; duplicate?: boolean }) {
  return <div className="announcement-items" aria-hidden={duplicate}>
    <Link href="/courses">Registration open in our batches</Link>
    <strong>SSB Interview Coaching - 15 Days</strong>
    {dates.map((date) => <Link href="/courses" key={`${duplicate ? "copy-" : ""}${date}`}>{formatDate(date)} - Male/Female</Link>)}
  </div>;
}
