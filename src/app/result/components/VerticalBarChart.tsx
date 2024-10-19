"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useResultQuery } from "../hooks/useResult";

const chartConfig = {
  book: {
    label: "책 분석",
    color: "orange",
  },
} satisfies ChartConfig;

export function VerticalBarChartComponenet() {
  const { status, data: result, error, isError, isFetching } = useResultQuery();

  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart
        layout="vertical"
        // margin={{
        //   left: -10,
        // }}
        accessibilityLayer
        data={result?.data.bookCountInfo}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="category" hide />
        <YAxis
          dataKey="category"
          type="category"
          tickLine={false}
          tickMargin={2}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="count" fill="var(--color-book)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
