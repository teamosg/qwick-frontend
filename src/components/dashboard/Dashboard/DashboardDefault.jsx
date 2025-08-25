"use client";

import { ArrowUpRight, ShoppingCart } from "lucide-react";
import { DashboardChart } from "./DashboardChart";

export function DashboardDefault() {
  return (
    <div className="grid grid-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4 p-4">
      <div className="p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2 shadow">
        <DashboardChart />
      </div>
      <div className="shadow p-4 rounded-lg">
        <div className="flex flex-col gap-3 p-6">
          <h3 className="flex items-center gap-2">
            {" "}
            <span className="bg-[#003933] w-8 h-8 rounded-full  flex items-center justify-center">
              <ShoppingCart className="text-white" size={18} />
            </span>
            <span className="text-[#858D9D] font-semibold"> New users</span>
          </h3>

          <h2 className="text-[#090003] text-2xl font-semibold">3</h2>
          <div className="flex items-center gap-2">
            <span className="flex items-center border-r">
              <span className="text-sm font-semibold">24%</span>
              <ArrowUpRight />
            </span>{" "}
            <h3 className="text-[#858D9D] text-sm">From last week</h3>
          </div>
        </div>
      </div>
      <div className="shadow p-4 rounded-lg">
        {" "}
        <div className="flex flex-col gap-3 p-6">
          <h3 className="flex items-center gap-2">
            {" "}
            <span className="bg-[#003933] w-8 h-8 rounded-full  flex items-center justify-center">
              <ShoppingCart className="text-white" size={18} />
            </span>
            <span className="text-[#858D9D] font-semibold"> New users</span>
          </h3>

          <h2 className="text-[#090003] text-2xl font-semibold">3</h2>
          <div className="flex items-center gap-2">
            <span className="flex items-center border-r">
              <span className="text-sm font-semibold">24%</span>
              <ArrowUpRight />
            </span>{" "}
            <h3 className="text-[#858D9D] text-sm">From last week</h3>
          </div>
        </div>
      </div>
      <div className="shadow p-4 rounded-lg">
        {" "}
        <div className="flex flex-col gap-3 p-6">
          <h3 className="flex items-center gap-2">
            {" "}
            <span className="bg-[#003933] w-8 h-8 rounded-full  flex items-center justify-center">
              <ShoppingCart className="text-white" size={18} />
            </span>
            <span className="text-[#858D9D] font-semibold"> New users</span>
          </h3>

          <h2 className="text-[#090003] text-2xl font-semibold">3</h2>
          <div className="flex items-center gap-2">
            <span className="flex items-center border-r">
              <span className="text-sm font-semibold">24%</span>
              <ArrowUpRight />
            </span>{" "}
            <h3 className="text-[#858D9D] text-sm">From last week</h3>
          </div>
        </div>
      </div>
      <div className="shadow p-4 rounded-lg">
        {" "}
        <div className="flex flex-col gap-3 p-6">
          <h3 className="flex items-center gap-2">
            {" "}
            <span className="bg-[#003933] w-8 h-8 rounded-full  flex items-center justify-center">
              <ShoppingCart className="text-white" size={18} />
            </span>
            <span className="text-[#858D9D] font-semibold"> New users</span>
          </h3>

          <h2 className="text-[#090003] text-2xl font-semibold">3</h2>
          <div className="flex items-center gap-2">
            <span className="flex items-center border-r">
              <span className="text-sm font-semibold">24%</span>
              <ArrowUpRight />
            </span>{" "}
            <h3 className="text-[#858D9D] text-sm">From last week</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
