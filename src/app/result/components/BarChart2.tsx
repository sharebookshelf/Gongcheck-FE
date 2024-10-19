"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useResultQuery } from "../hooks/useResult";
const labels = [
  "기타",
  "철학",
  "종교",
  "사회과학",
  "자연과학",
  "기술과학",
  "예술",
  "언어학",
  "문학",
  "역사",
];

const chartConfig = {
  book: {
    label: "책 분석",
    color: "orange",
  },
} satisfies ChartConfig;

type Props = {
  topIndices: any;
};

export function BarChart2({ topIndices }: Props) {
  const { status, data: result, error, isError, isFetching } = useResultQuery();
  return (
    <Card>
      <CardHeader>
        <CardTitle>책장 카테고리 별 분포 현황</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
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
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-xs">
          {topIndices[1] === 0
            ? `<${labels[topIndices[0]]}>에 관심이 많아요!`
            : `<${labels[topIndices[0]]}>과 <${
                labels[topIndices[1]]
              }>에 관심이 많아요!`}
        </div>
      </CardFooter>
    </Card>
  );
}
