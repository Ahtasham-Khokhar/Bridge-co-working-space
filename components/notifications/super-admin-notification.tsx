"use client";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    title: "Booking Confirmation",
    subtitle: "Your booking for Desk #12 at Downtown Branch is confirmed for Jan 10, 2025, 9:00 AM",
    time: "2 min ago",
    icon:"./svg/notificationIcon.svg"
  },
  {
    id: 2,
    title: "Upcoming Booking Reminder",
    subtitle: "Reminder: You have an upcoming booking for Meeting Room",
    time: "10 min ago",
    icon:"./svg/notificationIcon.svg"
  },
  {
    id: 3,
    title: "New Amenities Added",
    subtitle: `New! "High-speed internet and ergonomic chairs" are now available at Branch 1`,
    time: "2 days ago",
    icon:"./svg/notificationIcon.svg"
  },
  {
    id: 4,
    title: "Payment Reminder",
    subtitle: "Payment overdue! Please complete payment for your monthly booking",
    time: "3 days ago",
    icon:"./svg/notificationIcon.svg"
  },
  {
    id: 5,
    title: "Payment Reminder",
    subtitle: "Payment overdue! Please complete payment for your monthly booking",
    time: "",
    icon:"./svg/notificationIcon.svg"
  },
];

export default function NotificationFeed() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? notifications : notifications.slice(0, 2);

  return (
    <div className="w-full bg-secondary-white rounded-2xl border border-border overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-base text-[22px] text-primary-dark-black">Notifications</span>
        </div>
        <span className="bg-secondary-yellow text-xs  p-3 rounded-xl">
        <img className="w-6 h-6" src="./svg/notification.svg" alt="Image don't Load" />
        </span>
      </div>

      {/* List */}
      <div className="divide-y divide-border">
        {visible.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-3 px-5 py-4 hover:bg-secondary-yellow transition-colors cursor-pointer`}
          >
            {/* Dot */}
            <div className={``}/>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <img src={n.icon} className="" alt="Image don't Load" />
                <p className={`text-sm font-semibold leading-snug text-foreground`}>
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