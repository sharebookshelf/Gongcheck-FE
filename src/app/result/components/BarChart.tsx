"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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

export function BarChartComponenet() {
  const { status, data: result, error, isError, isFetching } = useResultQuery();

  return (
    <ChartContainer config={chartConfig} className=" w-full">
      <BarChart
        accessibilityLayer
        data={result?.data.bookCountInfo}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 2)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-book)" radius={4}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
