"use client";
import { useSuperAdminConsumer } from "@/context/super-admin-context";
import SuperAdminAnalyticalChart from '@/components/charts/super-admin-analytical-chart'
import NotificationFeed from "@/components/notifications/super-admin-notification";

const revenueCards = [
  { percent: "2.5%", percentType: "success", value: "100,000", label: "Total Revenue" },
  { percent: "2.5%", percentType: "error", value: "900,000", label: "Members Revenue" },
  { percent: "2.5%", percentType: "warning", value: "0.00", label: "On off Revenue" },
];

const occupancyCards = [
  { percent: "2.5%", percentType: "success", value: "100,000", label: "Total Occupancy" },
  { percent: "2.5%", percentType: "error", value: "900,000", label: "Members Occupancy" },
  { percent: "2.5%", percentType: "warning", value: "0.00", label: "On off Occupancy" },
];

const StatCard = ({
  percent,
  percentType,
  value,
  label,
}: {
  percent: string;
  percentType: string;
  value: string;
  label: string;
}) => (
  <div className="flex flex-col justify-between bg-secondary-white border border-border shadow-sm rounded-xl p-2.5 h-[100px] max-h-[100px] overflow-hidden w-full">
    <p className={`self-end text-[11px] font-semibold leading-none ${percentType === "success" ? "text-success"
      : percentType === "error" ? "text-error"
        : "text-warning"
      }`}>
      {percent}
    </p>
    <div className="text-center leading-none">
      <span className="text-foreground text-[30px] leading-none">{value}</span>
      <sup className="text-[9px] font-normal ml-0.5 text-primary-text">pkr</sup>
    </div>
    <p className="text-center text-primary-text text-[14px] leading-tight truncate">
      {label}
    </p>
  </div>
);

// ✅ Same height and font style as StatCard
const FooterCard = ({
  title,
  value,
  stats,
}: {
  title: string;
  value: number;
  stats: { label: string; val: string }[];
}) => (
  <div className="flex flex-col justify-between bg-secondary-white border border-border shadow-sm rounded-xl p-2.5 h-[100px] max-h-[100px] overflow-hidden w-full">
    {/* Title */}
    <p className="text-[11px] font-semibold text-primary-text  tracking-wider leading-none">
      {title}
    </p>

    {/* Value */}
    <div className="leading-none">
      <span className="text-foreground text-[30px] leading-none">{value}</span>
    </div>

    {/* Stats row */}
    <div className="flex items-center gap-3">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-1">
          <span className="text-[11px] font-semibold text-primary-text  leading-none">
            {s.label}
          </span>
          <span className="text-[11px] text-primary-text leading-none">{s.val}</span>
        </div>
      ))}
    </div>
  </div>
);

const Page = () => {
  const { name } = useSuperAdminConsumer();

  return (
    <div className="flex flex-col gap-3">

      {/* ── Row 1: Revenue & Occupancy ── */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <p className="text-sm font-semibold text-foreground">Revenue</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {revenueCards.map((c) => <StatCard key={c.label} {...c} />)}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <p className="text-sm font-semibold text-foreground">Occupancy</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {occupancyCards.map((c) => <StatCard key={c.label} {...c} />)}
          </div>
        </div>
      </div>

      {/* ── Row 2: Chart + Notifications ── */}
      <div className="flex flex-col lg:flex-row gap-3 items-start">
        <div className="w-full lg:w-[68%]">
          <SuperAdminAnalyticalChart />
        </div>
        <div className="w-full lg:w-[32%]">
          <NotificationFeed />
        </div>
      </div>

      {/* ── Row 3: Footer Summary Cards ── same height & fonts as StatCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-6">

        {/* 1. Customer Partition */}
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-primary-dark-black tracking-widest ml-1">Customer</span>
          <div className="grid grid-cols-2 gap-2">
            {/* New Box */}
            <div className="border border-border rounded-xl bg-secondary-white p-3 shadow-sm hover:border-primary-text/30 transition-colors">
              <p className="text-[14px] text-primary-dark-black  leading-none mb-2">New</p>
              <div className="flex items-baseline gap-1.5">
                <span className=" text-[28px] text-primary-dark-black leading-none">35</span>
                <span className="text-[12px] ml-4 font-bold text-success flex justify-between">90%  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-icon lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg></span></span>
              </div>
            </div>
            {/* Lost Box */}
            <div className="border border-border rounded-xl bg-secondary-white p-3 shadow-sm hover:border-primary-text/30 transition-colors">
              <p className="text-[14px] text-primary-dark-black  leading-none mb-2">Lost</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[28px] text-primary-dark-black leading-none">0</span>
                <span className="text-[12px] ml-4 font-bold text-error flex items-center">0.00%  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down-icon lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></span></span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Member Partition */}
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-primary-dark-black tracking-widest ml-1">Member</span>
          <div className="grid grid-cols-2 gap-2">
            {/* New Box */}
            <div className="border border-border rounded-xl bg-secondary-white p-3 shadow-sm hover:border-primary-text/30 transition-colors">
              <p className="text-[14px] text-primary-dark-black  leading-none mb-2">New</p>
              <div className="flex items-baseline gap-1.5">
                <span className=" text-[28px] text-primary-dark-black leading-none">70</span>
                <span className="text-[12px] ml-4 font-bold text-success flex justify-between">90%  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-icon lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg></span></span>
              </div>
            </div>
            {/* Lost Box */}
            <div className="border border-border rounded-xl bg-secondary-white p-3 shadow-sm hover:border-primary-text/30 transition-colors">
              <p className="text-[14px] text-primary-dark-black  leading-none mb-2">Lost</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[28px] text-primary-dark-black leading-none">0</span>
                <span className="text-[12px] ml-4 font-bold text-error flex items-center">0.00%  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down-icon lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></span></span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Invoice Partition */}
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-primary-dark-black tracking-widest ml-1">Invoice</span>
          <div className="grid grid-cols-2 gap-2">
            {/* New Box */}
            <div className="border border-border rounded-xl bg-secondary-white p-3 shadow-sm hover:border-primary-text/30 transition-colors">
              <p className="text-[14px] text-primary-dark-black  leading-none mb-2">Paid</p>
              <div className="flex items-baseline gap-1.5">
                <span className=" text-[28px] text-primary-dark-black leading-none">30</span>
                <span className="text-[12px] ml-4 font-bold text-success flex justify-between">90%  <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-icon lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                  </span></span>
              </div>
            </div>
            {/* Lost Box */}
            <div className="border border-border rounded-xl bg-secondary-white p-3 shadow-sm hover:border-primary-text/30 transition-colors">
              <p className="text-[14px] text-primary-dark-black  leading-none mb-2">Overdue</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[28px] text-primary-dark-black leading-none">4</span>
                <span className="text-[12px] ml-4 font-bold text-error flex items-center">18.7%  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down-icon lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></span></span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Booking Partition */}
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-primary-dark-black tracking-widest ml-1">Booking</span>
          <div className="grid grid-cols-2 gap-2">
            {/* New Box */}
            <div className="border border-border rounded-xl bg-secondary-white p-3 shadow-sm hover:border-primary-text/30 transition-colors">
              <p className="text-[14px] text-primary-dark-black  leading-none mb-2">New</p>
              <div className="flex items-baseline gap-1.5">
                <span className=" text-[28px] text-primary-dark-black leading-none">70</span>
                <span className="text-[12px] ml-4 font-bold text-success flex items-center">90%  <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg></span></span>
              </div>
            </div>
            {/* Lost Box */}
            <div className="border border-border rounded-xl bg-secondary-white p-3 shadow-sm hover:border-primary-text/30 transition-colors">
              <p className="text-[14px] text-primary-dark-black  leading-none mb-2">Lost</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[28px] text-primary-dark-black leading-none">0</span>
                <span className="text-[12px] ml-4 font-bold text-error flex items-center">0.00%  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down-icon lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></span></span>
              </div>
            </div>
          </div>
        </div>

      </div>



    </div>
  );
};

export default Page;