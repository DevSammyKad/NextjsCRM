import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";
import moment from "moment";

const AttendanceCard = ({ attendanceList, selectedMonth }) => {
  const daysInMonth = moment(selectedMonth).daysInMonth();

  // Calculate overall attendance
  const totalDays = daysInMonth * attendanceList.length;
  const daysAttended = attendanceList.reduce((total, record) => {
    return (
      total + record.student_attendance.filter((att) => att.present).length
    );
  }, 0);
  const overallAttendanceRate = ((daysAttended / totalDays) * 100).toFixed(2);

  // Calculate present percentage
  const presentDays = daysAttended;
  const presentPercentage = ((presentDays / totalDays) * 100).toFixed(2);

  // Calculate absent percentage
  const absentDays = totalDays - presentDays;
  const absentPercentage = ((absentDays / totalDays) * 100).toFixed(2);

  // Assuming most absent students are those who have the highest absence rate

  const mostAbsentThreshold = 20;
  const mostAbsentStudents = attendanceList.filter((record) => {
    const studentAbsentDays = record.student_attendance.filter(
      (att) => !att.present,
    ).length;
    const studentAbsentRate = ((studentAbsentDays / daysInMonth) * 100).toFixed(
      2,
    );
    return studentAbsentRate > mostAbsentThreshold; // Threshold of 50% absence for being considered "most absent"
  });

  const data = [
    {
      name: "Overall Attendance",
      stat: `${overallAttendanceRate}%`,
      change: "+12.1%",
      changeType: "positive",
    },
    {
      name: "Present %",
      stat: `${presentPercentage}%`,
      change: "-9.8%",
      changeType: "negative",
    },
    {
      name: "Absent %",
      stat: `${absentPercentage}%`,
      change: "+7.7%",
      changeType: "positive",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => (
          <Card key={item.name}>
            <CardContent>
              <div className="flex items-center justify-between p-5">
                <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content font-medium">
                  {item.name}
                </p>
                <span
                  className={`${item.changeType === "positive" ? "bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20" : "bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20"} rounded-tremor-small text-tremor-label inline-flex items-center px-2 py-1 font-medium ring-1 ring-inset`}
                >
                  {item.change}
                </span>
              </div>
              <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong p-5 font-semibold">
                {item.stat}
              </p>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between p-5">
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content font-medium">
                Most Absent Students List
              </p>
              <span className="rounded-tremor-small text-tremor-label inline-flex items-center bg-emerald-100 px-2 py-1 font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20">
                List
              </span>
            </div>
            <div className="p-5">
              {mostAbsentStudents.length > 0 ? (
                <ul>
                  {mostAbsentStudents.map((student) => (
                    <li key={student.id} className="my-2">
                      {student.firstName} {student.lastName} - Absent for{" "}
                      {
                        student.student_attendance.filter((att) => !att.present)
                          .length
                      }{" "}
                      days
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No students have an absence rate over 50% this month.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AttendanceCard;
