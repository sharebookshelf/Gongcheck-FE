"use client";

import { Chart } from "chart.js/auto";
import { RefObject, useEffect, useRef } from "react";
import { useUserTypes } from "../hooks/useUserTypes";

interface ChartCanvas extends HTMLCanvasElement {
  chart?: Chart;
}

export default function RadarChart() {
  const chartRef: RefObject<ChartCanvas> = useRef(null);

  const { data: userTypes } = useUserTypes();

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      if (chart.chart) {
        chart.chart.destroy();
      }

      const context = chart.getContext("2d");

      const adjustedUserTypes = userTypes?.map((type) => Math.max(type, 10));

      const newChart = new Chart(context as CanvasRenderingContext2D, {
        type: "radar",
        data: {
          labels: [
            "사회과학",
            "자연과학",
            "기술과학",
            "문학",
            "역사",
            "언어학",
            "예술",
            "철학",
            "종교",
            "기타",
          ],
          datasets: [
            {
              label: "책장 분석 결과",
              data: adjustedUserTypes!,
              backgroundColor: "rgba(255, 165, 0, 0.2)", // 주황색 배경
              borderColor: "rgb(255, 165, 0)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              min: 0,
              max: 100,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          animation: {
            duration: 0,
          },
        },
      });
      chartRef.current.chart = newChart;
    }
  }, [userTypes]);

  return (
    <div className="relative">
      <canvas ref={chartRef} />
    </div>
  );
}
