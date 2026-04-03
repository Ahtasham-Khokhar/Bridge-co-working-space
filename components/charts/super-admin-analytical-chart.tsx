"use client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

const data = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
        {
            type: "bar" as const,
            label: "Revenue",
            data: [10, 20, 30, 42, 48],
            backgroundColor: "rgb(255, 204, 22)",
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.55,
            order: 2,
        },
        {
            type: "line" as const,
            label: "Membership Revenue",
            data: [8, 15, 28, 38, 45],
            borderColor: "#0D2B4E",
            backgroundColor: "#0D2B4E",
            pointBackgroundColor: "#0D2B4E",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2.5,
            tension: 0.35,
            order: 1,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: "index" as const,
        intersect: false,
    },
    plugins: {
        legend: {
            display: false, // using custom legend below
        },
        tooltip: {
            backgroundColor: "#ffffff",
            titleColor: "#2b2828",
            bodyColor: "rgba(0,0,0,0.6)",
            borderColor: "rgba(0,0,0,0.08)",
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
            callbacks: {
                label: (ctx: any) =>
                    `  ${ctx.dataset.label}: ${ctx.parsed.y}K PKR`,
            },
        },
    },
    scales: {
        x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
                color: "rgba(0,0,0,0.45)",
                font: { size: 12 },
            },
        },
        y: {
            min: 0,
            max: 50,
            grid: {
                color: "rgba(0,0,0,0.06)",
            },
            border: { display: false, dash: [4, 4] },
            ticks: {
                color: "rgba(0,0,0,0.45)",
                font: { size: 12 },
                stepSize: 10,
                callback: (v: any) => `${v}K`,
            },
        },
    },
};

export default function AnalyticsChart() {
    return (
        <div className="bg-secondary-white rounded-2xl shadow-md p-6">
            {/* Header */}
            <div className="mb-4">
                <p className="text-lg font-semibold text-primary-dark-black">
                    Analytics
                </p>
                <p className="text-sm text-primary-text">
                    Aug – Dec revenue overview
                </p>
            </div>

            {/* Custom Legend */}
            <div className="flex gap-6 mb-4 text-sm text-primary-text">
                <span className="flex items-center gap-2">
                    <span
                        className="w-3 h-3 rounded-sm inline-block"
                        style={{ backgroundColor: "rgb(255, 204, 22)" }}
                    />
                    Revenue
                </span>
                <span className="flex items-center gap-2">
                    <span
                        className="w-6 h-0.5 rounded inline-block"
                        style={{ backgroundColor: "#0D2B4E" }}
                    />
                    Membership Revenue
                </span>
            </div>

            {/* Chart */}
            <div className="relative h-[150px]">
                <Chart type="bar" data={data} options={options} />
            </div>
        </div>
    );
}