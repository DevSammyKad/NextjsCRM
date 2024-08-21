"use client";
import { useReportWebVitals } from "next/web-vitals";

const webVitals = () => {
  return useReportWebVitals((metric) => {
    console.log(metric);
  });
};

export default webVitals;
