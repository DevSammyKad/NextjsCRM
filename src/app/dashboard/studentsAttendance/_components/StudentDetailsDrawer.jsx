"use client";
import moment from "moment";
import { useState, useEffect } from "react";
import { PhoneCall, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
const chartData = [
  { month: "January", attendance: 16 },
  { month: "February", attendance: 30 },
  { month: "March", attendance: 23 },
  { month: "April", attendance: 7 },
  { month: "May", attendance: 29 },
  { month: "June", attendance: 14 },
];
const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-1))",
  },
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";

const StudentDetailsDrawer = ({ student, isOpen, onClose }) => {
  // const [chartData, setChartData] = useState([]);

  // useEffect(() => {
  //   if (student && isOpen) {
  //     fetchAttendanceData(student.id);
  //   }
  // }, [student, isOpen]);

  // const fetchAttendanceData = async (studentId) => {
  //   try {
  //     const response = await axios.get(`/api/student_attendance/all_months`, {
  //       params: { studentId },
  //     });

  //     if (response.status === 200) {
  //       const attendanceData = response.data;
  //       const formattedData = formatChartData(attendanceData);
  //       setChartData(formattedData);
  //     } else {
  //       console.error('Failed to fetch attendance data');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching attendance data:', error);
  //   }
  // };

  // const formatChartData = (data) => {
  //   return data.map((record) => ({
  //     month: moment(record.date).format('MMMM'),
  //     attendance: record.present ? 1 : 0,
  //   }));
  // };

  if (!student) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mt-5 flex items-center justify-between">
            <p>
              {student.firstName} {student.lastName}
            </p>
            <a href={`tel:${student.phoneNumber}`} className="text-xs">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                // href={`tel:${student.phoneNumber}`}
                onClick={() => console.log("Call Now", student.phoneNumber)}
              >
                <PhoneCall className="h-5 w-5" /> Call link
              </Button>
            </a>
          </SheetTitle>
          <SheetDescription className="mt-2">
            Here you can see your Student's Attendance Chart, and more.
          </SheetDescription>
        </SheetHeader>
        <Card className="my-2">
          <CardHeader>
            <CardTitle>Attendance Chart</CardTitle>
            <CardDescription className="text-sm">
              January - June{" "}
            </CardDescription>
            {/* <CardDescription>
              {chartData.length > 0
                ? `January - June ${moment(chartData[chartData.length - 1].date).format('YYYY')}`
                : 'Data is not available'}
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="attendance"
                  fill="var(--color-attendance)"
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total Attendance for the last 6 months
            </div>
          </CardFooter>
        </Card>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Send Fee's Reminder</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default StudentDetailsDrawer;
