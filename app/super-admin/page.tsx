"use client";
import { useSuperAdminConsumer } from "@/context/super-admin-context";
import AnalyticalChart from "@/components/charts/super-admin-analytical-chart";
import NotificationFeed from "@/components/notifications/super-admin-notification";

const Page = () => {
  const { name, setName } = useSuperAdminConsumer();
  return (
    <>
      {/* Revenu and Occupancy header */}
      <div className="flex flex-col lg:flex-row justify-between mt-2 gap-6 lg:gap-10">
        <div className="w-full lg:w-1/2">
          <p className="text-lg sm:text-xl">Revenu</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-2">
            <div className="flex flex-col bg-secondary-white shadow-xl rounded-2xl p-3 sm:p-2">
              <p className="self-end text-success text-sm sm:text-base">2.5%</p>
              <p className="text-xl sm:text-2xl text-center">100,000 <sup className="text-sm sm:text-lg">pkr</sup></p>
              <p className="text-center text-sm sm:text-base">Total Revenue</p>
            </div>

            <div className="flex flex-col bg-secondary-white shadow-xl rounded-2xl p-3 sm:p-2">
              <p className="self-end text-error text-sm sm:text-base">2.5%</p>
              <p className="text-xl sm:text-2xl text-center">900,000 <sup className="text-sm sm:text-lg">pkr</sup></p>
              <p className="text-center text-sm sm:text-base">Members Revenue</p>
            </div>

            <div className="flex flex-col bg-secondary-white shadow-xl rounded-2xl p-3 sm:p-2">
              <p className="self-end text-warning text-sm sm:text-base">2.5%</p>
              <p className="text-xl sm:text-2xl text-center">0.00 <sup className="text-sm sm:text-lg">pkr</sup></p>
              <p className="text-center text-sm sm:text-base">On off Revenue</p>
            </div>

          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <p className="text-lg sm:text-xl">Occupancy</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-2">
            <div className="flex flex-col bg-secondary-white shadow-xl rounded-2xl p-3 sm:p-2">
              <p className="self-end text-success text-sm sm:text-base">2.5%</p>
              <p className="text-xl sm:text-2xl text-center">100,000 <sup className="text-sm sm:text-lg">pkr</sup></p>
              <p className="text-center text-sm sm:text-base">Total Revenue</p>
            </div>

            <div className="flex flex-col bg-secondary-white shadow-xl rounded-2xl p-3 sm:p-2">
              <p className="self-end text-error text-sm sm:text-base">2.5%</p>
              <p className="text-xl sm:text-2xl text-center">900,000 <sup className="text-sm sm:text-lg">pkr</sup></p>
              <p className="text-center text-sm sm:text-base">Members Revenue</p>
            </div>

            <div className="flex flex-col bg-secondary-white shadow-xl rounded-2xl p-3 sm:p-2">
              <p className="self-end text-warning text-sm sm:text-base">2.5%</p>
              <p className="text-xl sm:text-2xl text-center">0.00 <sup className="text-sm sm:text-lg">pkr</sup></p>
              <p className="text-center text-sm sm:text-base">On off Revenue</p>
            </div>

          </div>
        </div>
      </div>

      {/* Analytics & Notifications */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
        {/* Analytical Chart */}
        <div className="w-full lg:w-[70%] mt-6 lg:mt-8">
          <AnalyticalChart />
        </div>

        <div className="w-full lg:w-[30%] mt-2 lg:mt-8">
          <NotificationFeed />
        </div>
      </div>

      {/* This is footer of Super Admin Pannel */}
      <div className="bg-secondary-white p-4 sm:p-6 w-full font-sans mt-6 lg:mt-0">
        {/* The Grid Container for the 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">

          {/* Card 1: Customer */}
          <div className="p-4 sm:p-5 rounded-lg shadow-sm">
            <h3 className="text-secondary-black">Customer</h3>
            <div className="text-white text-3xl sm:text-4xl font-light">35</div>
            <div className="space-y-1">
              <div className="text-[10px] flex gap-1.5 leading-none">
                <span className="text-[#636366] uppercase font-semibold">New</span>
                <span className="text-[#aeaeb2]">18.7%</span>
              </div>
              <div className="text-[10px] flex gap-1.5 leading-none">
                <span className="text-[#636366] uppercase font-semibold">Lost</span>
                <span className="text-[#aeaeb2]">2</span>
              </div>
            </div>
          </div>

          {/* Card 2: Member */}
          <div className="p-4 sm:p-5 rounded-lg shadow-sm">
            <h3 className="text-secondary-black">Member</h3>
            <div className="text-white text-3xl sm:text-4xl font-light">0</div>
            <div className="space-y-1">
              <div className="text-[10px] flex gap-1.5 leading-none">
                <span className="text-[#636366] uppercase font-semibold">Lost</span>
                <span className="text-[#aeaeb2]">30</span>
              </div>
            </div>
          </div>

          {/* Card 3: Invoice */}
          <div className="p-4 sm:p-5 rounded-lg shadow-sm">
            <h3 className="text-secondary-black">Invoice</h3>
            <div className="text-white text-3xl sm:text-4xl font-light mb-3">0</div>
            <div className="space-y-1">
              <div className="text-[10px] flex gap-1.5 leading-none">
                <span className="text-[#636366] uppercase font-semibold">Booked</span>
                <span className="text-[#aeaeb2]">0.001</span>
              </div>
            </div>
          </div>

          {/* Card 4: Booking */}
          <div className="p-4 sm:p-5 rounded-lg shadow-sm">
            <h3 className="text-secondary-black">Booking</h3>
            <div className="text-white text-3xl sm:text-4xl font-light">4</div>
            <div className="space-y-1">
              <div className="text-[10px] flex gap-1.5 leading-none">
                <span className="text-[#636366] uppercase font-semibold">Item</span>
                <span className="text-[#aeaeb2]">0.001</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Revenue, Membership Revenue Analytics through charts and graphs

      <h1 className="flex justify-center items-center text-secondary-yellow text-4xl font-bold mt-40">
        Super Admin Dashboard {name}
      </h1> */}
    </>
  );
};

export default Page;