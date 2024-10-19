"use client";

import { TrendingUp } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

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

export function RadarChart2({ topIndices }: Props) {
  const { status, data: result, error, isError, isFetching } = useResultQuery();
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>책장 카테고리 별 분포 현황</CardTitle>
        {/* <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription> */}
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={result?.data.bookCountInfo}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-book)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
            <PolarRadiusAxis
              angle={90}
              stroke="hsla(var(--foreground))"
              orientation="middle"
              axisLine={false}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
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
