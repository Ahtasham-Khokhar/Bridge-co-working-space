"use client";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    title: "Booking Confirmation",
    subtitle: "Your booking for Desk #12 at Downtown Branch is confirmed for Jan 10, 2025, 9:00 AM",
    time: "2 min ago",
    isNew: true,
    type: "default",
  },
  {
    id: 2,
    title: "Upcoming Booking Reminder",
    subtitle: "Reminder: You have an upcoming booking for Meeting Room",
    time: "10 min ago",
    isNew: true,
    type: "default",
  },
  {
    id: 3,
    title: "New Amenities Added",
    subtitle: `New! "High-speed internet and ergonomic chairs" are now available at Branch 1`,
    time: "2 days ago",
    isNew: false,
    type: "default",
  },
  {
    id: 4,
    title: "Payment Reminder",
    subtitle: "Payment overdue! Please complete payment for your monthly booking",
    time: "3 days ago",
    isNew: false,
    type: "danger",
  },
  {
    id: 5,
    title: "Payment Reminder",
    subtitle: "Payment overdue! Please complete payment for your monthly booking",
    time: "",
    isNew: false,
    type: "danger",
  },
];

export default function NotificationFeed() {
  const [expanded, setExpanded] = useState(false);
  const newCount = notifications.filter((n) => n.isNew).length;
  const visible = expanded ? notifications : notifications.slice(0, 2);

  return (
    <div className="w-full bg-secondary-white rounded-2xl border border-border overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-secondary-yellow">
            <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326z"/>
          </svg>
          <span className="text-base font-semibold text-foreground">Notifications</span>
        </div>
        <span className="bg-secondary-yellow text-primary-dark-black text-xs font-semibold px-2.5 py-1 rounded-full">
          {newCount} new
        </span>
      </div>

      {/* List */}
      <div className="divide-y divide-border">
        {visible.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-3 px-5 py-4 hover:bg-background transition-colors cursor-pointer ${
              n.isNew ? "bg-secondary-yellow/5" : ""
            }`}
          >
            {/* Dot */}
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
              n.isNew ? "bg-secondary-yellow" : "bg-border"
            }`} />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p className={`text-sm font-semibold leading-snug ${
                  n.type === "danger" ? "text-error" : "text-foreground"
                }`}>
                  {n.title}
                </p>
                {n.time && (
                  <span className="text-xs text-primary-text whitespace-nowrap flex-shrink-0 mt-0.5">
                    {n.time}
                  </span>
                )}
              </div>
              <p className="text-xs text-primary-text leading-relaxed mt-1">
                {n.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="px-5 py-3 border-t border-border bg-background flex justify-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-secondary-yellow hover:underline transition-all"
        >
          {expanded ? "← Show less" : "View all notifications →"}
        </button>
      </div>

    </div>
  );
}