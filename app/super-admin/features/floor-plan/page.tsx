"use client"
import { useState } from "react";
import { ChevronRight, ChevronDown, Armchair, Users, Building2 } from "lucide-react";
import { PieChart, Pie,Cell, ResponsiveContainer } from "recharts";
/* ─────────────────────────────────────────────
 * FloorPlanHeader
 * Top header bar with "Floor Plan" title and a "Next" navigation button.
 * ───────────────────────────────────────────── */
const FloorPlanHeader = ({ onNext }: { onNext?: () => void }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 md:px-6">
      {/* Page Title */}
      <h1 className="text-xl font-bold text-foreground md:text-2xl">Floor Plan</h1>

      {/* Next Navigation Button */}
      <button
        onClick={onNext}
        className="flex items-center gap-1 text-sm font-medium text-bridge-text hover:text-foreground transition-colors"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────
 * ActionButtons
 * Row of action buttons: "View Seats Allocation", "View Booking Request", "Select Floor".
 * The active button is highlighted with the primary yellow color.
 * ───────────────────────────────────────────── */
const ActionButtons = ({
  activeButton = "seats",
  onButtonClick,
}: {
  activeButton?: "seats" | "booking" | "floor";
  onButtonClick?: (button: "seats" | "booking" | "floor") => void;
}) => {
  /** Button configuration array */
  const buttons = [
    { id: "seats" as const, label: "View Seats Allocation" },
    { id: "booking" as const, label: "View Booking Request" },
    { id: "floor" as const, label: "Select Floor" },
  ];

  return (
    <div className="flex flex-wrap  gap-2 px-4 md:gap-3 md:px-6">
      {buttons.map((button) => {
        const isActive = activeButton === button.id;
        return (
          <button
            key={button.id}
            onClick={() => onButtonClick?.(button.id)}
            className={`rounded-md flex flex-1 items-center justify-center border bg-secondary-yellow px-3 py-2 text-xs font-medium transition-all md:px-4 md:text-sm ${
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-bridge-text border-bridge-light/20 hover:border-primary/50"
            }`}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────
 * StatsCards
 * Displays Available Seats, Occupied Seats, and Floor selector cards.
 * Each card shows a label, count, and a themed icon.
 * ───────────────────────────────────────────── */

const StatsCards = ({
  availableSeats = 60,
  occupiedSeats = 45,
  selectedFloor = "Floor 1",
  onFloorChange,
}: {
  availableSeats?: number;
  occupiedSeats?: number;
  selectedFloor?: string;
  onFloorChange?: (floor: string) => void; // Updated to pass the floor name
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const floors = ["Floor 1", "Floor 2", "Floor 3"];

  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {/* Available Seats Card */}
      <div className="flex min-w-[120px] flex-1 items-center gap-3 rounded-lg border border-bridge-light/10 bg-card p-3 shadow-sm md:p-4">
        <div>
          <p className="text-xs text-bridge-text md:text-sm">Available Seats</p>
          <p className="text-2xl font-bold text-foreground md:text-3xl">{availableSeats}</p>
        </div>
        <div className="ml-auto rounded-md p-2">
          <img src="/svg/availableSeat.svg" alt="Available Seat SVG" />
        </div>
      </div>

      {/* Occupied Seats Card */}
      <div className="flex min-w-[120px] flex-1 items-center gap-3 rounded-lg border border-bridge-light/10 bg-card p-3 shadow-sm md:p-4">
        <div>
          <p className="text-xs text-bridge-text md:text-sm">Occupied Seats</p>
          <p className="text-2xl font-bold text-foreground md:text-3xl">{occupiedSeats}</p>
        </div>
        <div className="ml-auto rounded-md bg-success/10 p-2">
          <img src="/svg/occupiedSeat.svg" alt="Occupied Seat SVG" />
        </div>
      </div>

      {/* Floor Selector Card - Keeping your exact structure */}
      <div className="relative"> 
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg border md:p-4" // Your original button class
        >
          <div className=""> {/* Your original div */}
            <img src="/svg/selectFloor.svg" alt="Floor Plan SVG" className="" />
            <p className="text-xs text-bridge-text md:text-sm">{selectedFloor}</p>
            <ChevronDown className="mt-1 h-4 w-4 text-primary-dark-black" />
          </div>
        </button>

        {/* Dropdown Menu - Added to the bottom of your button */}
        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-1 w-full min-w-[120px] rounded-lg border bg-card shadow-md">
            {floors.map((floor) => (
              <button
                key={floor}
                onClick={() => {
                  onFloorChange?.(floor);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-xs text-bridge-text hover:bg-bridge-light/5 md:text-sm"
              >
                {floor}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
/* ─────────────────────────────────────────────
 * SeatDonutChart
 * Donut chart displaying total seat distribution breakdown.
 * Categories: Available, 24 Hour, Day, Night.
 * Uses Recharts PieChart for the donut visualization.
 * ───────────────────────────────────────────── */

/** Color mapping for each seat category */
const CHART_COLORS = {
  available: "#9CA3AF",
  twentyFourHour: "#FFCC16",
  day: "#2B2828",
  night: "#F97316",
};

const SeatDonutChart = ({
  totalSeats = 100,
  available = 60,
  twentyFourHour = 15,
  day = 15,
  night = 10,
}: {
  totalSeats?: number;
  available?: number;
  twentyFourHour?: number;
  day?: number;
  night?: number;
}) => {
  /** Chart data array for Recharts */
  const data = [
    { name: "Available", value: available, color: CHART_COLORS.available },
    { name: "24 HOUR", value: twentyFourHour, color: CHART_COLORS.twentyFourHour },
    { name: "Day", value: day, color: CHART_COLORS.day },
    { name: "Night", value: night, color: CHART_COLORS.night },
  ];

  /** Legend items rendered below the chart */
  const legendItems = [
    { label: "Available", color: CHART_COLORS.available },
    { label: "24 HOUR", color: CHART_COLORS.twentyFourHour },
    { label: "Day", color: CHART_COLORS.day },
    { label: "Night", color: CHART_COLORS.night },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Donut Chart with centered total label */}
      <div className="relative h-40 w-40 md:h-48 md:w-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label - Total Seats */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-bridge-text">Total Seats</span>
          <span className="text-2xl font-bold text-foreground md:text-3xl">{totalSeats}</span>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-bridge-text">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
 * FloorPlanPlaceholder
 * Bordered container indicating where the interactive floor plan SVG will render.
 * ───────────────────────────────────────────── */
const FloorPlanPlaceholder = () => {
  return (
    <div className="min-h-[300px]rounded-lg md:min-h-[400px]">
      <img src="/svg/floorplan.svg"
        alt="Floor Plan"
        className="h-full w-full object-contain" />
    </div>
  );
};

/* ─────────────────────────────────────────────
 * FloorPlanPage (Default Export)
 * Main page composing all the above sections into a responsive layout.
 * ───────────────────────────────────────────── */
const FloorPlanPage = () => {
  /** Track which action button is currently active */
  const [activeButton, setActiveButton] = useState<"seats" | "booking" | "floor">("seats");

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <FloorPlanHeader />

      {/* Main Content Area */}
      <div className="space-y-4 pb-6 md:space-y-6">
        {/* Action Buttons Row */}
        <ActionButtons activeButton={activeButton} onButtonClick={setActiveButton} />

        {/* Stats + Chart Grid: stats left, donut right */}
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-6 lg:grid-cols-4">
          {/* Stats Cards - spans 2 columns on medium+ screens */}
          <div className="md:col-span-2 lg:col-span-3">
            <StatsCards />
          </div>

          {/* Donut Chart - spans 1 column on the right */}
          <div className="flex items-center justify-center rounded-lg border border-bridge-light/10 bg-card p-4 shadow-sm">
            <SeatDonutChart />
          </div>
        </div>

        {/* Floor Plan SVG Placeholder */}
        <FloorPlanPlaceholder />
      </div>
    </div>
  );
};

export default FloorPlanPage;