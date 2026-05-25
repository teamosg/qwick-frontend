"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const description = "A simple area chart";

// Generate random views between 25000-50000
const generateRandomViews = () =>
  Math.floor(Math.random() * (50000 - 25000 + 1)) + 25000;

const chartData = [
  {
    month: "Jan",
    views: generateRandomViews(),
    revenue: 5,
    date: "2024-01-01",
  },
  {
    month: "Feb",
    views: generateRandomViews(),
    revenue: 10,
    date: "2024-02-01",
  },
  {
    month: "Mar",
    views: generateRandomViews(),
    revenue: 15,
    date: "2024-03-01",
  },
  {
    month: "Apr",
    views: generateRandomViews(),
    revenue: 20,
    date: "2024-04-01",
  },
  {
    month: "May",
    views: generateRandomViews(),
    revenue: 25,
    date: "2024-05-01",
  },
  {
    month: "Jun",
    views: generateRandomViews(),
    revenue: 30,
    date: "2024-06-01",
  },
  {
    month: "Jul",
    views: generateRandomViews(),
    revenue: 35,
    date: "2024-07-01",
  },
  {
    month: "Aug",
    views: generateRandomViews(),
    revenue: 40,
    date: "2024-08-01",
  },
  {
    month: "Sep",
    views: generateRandomViews(),
    revenue: 45,
    date: "2024-09-01",
  },
  {
    month: "Oct",
    views: generateRandomViews(),
    revenue: 50,
    date: "2024-10-01",
  },
  {
    month: "Nov",
    views: generateRandomViews(),
    revenue: 55,
    date: "2024-11-01",
  },
  {
    month: "Dec",
    views: generateRandomViews(),
    revenue: 60,
    date: "2024-12-01",
  },
];

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--info))",
  },
};

export function AnalyticsChart() {
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");

    if (timeRange === "yearly") {
      // Show all data for yearly view
      return true;
    } else if (timeRange === "monthly") {
      // Show only current month (June 2024)
      return date.getMonth() === 5 && date.getFullYear() === 2024;
    } else {
      // For daily ranges (7d, 30d, 90d)
      let daysToSubtract = 90;
      if (timeRange === "30d") {
        daysToSubtract = 30;
      } else if (timeRange === "7d") {
        daysToSubtract = 7;
      }
      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - daysToSubtract);
      return date >= startDate;
    }
  });

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Views Overview</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="yearly" className="rounded-lg">
              Yearly
            </SelectItem>
            <SelectItem value="monthly" className="rounded-lg">
              Monthly
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
        {/* <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={filteredData}
            height={200}
            margin={{
              left: 12,
              right: 12,
              top: 10,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--info))" stopOpacity={1} />
                <stop offset="100%" stopColor="hsl(var(--info))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              dataKey="views"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 60000]}
              tickCount={13}
              interval={0}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="views"
              type="natural"
              fill="hsl(var(--info))"
              fillOpacity={0.4}
              stroke="hsl(var(--info))"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Views trending up by 12.5% this month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - December 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
