"use client";
import React, { useState } from "react";
import MonthSelection from "@/components/MonthSelection";
import { Button } from "@/components/ui/button";
import GradeSelect from "@/components/GradeSelect";
import moment from "moment";
import axios from "axios";
import AttendanceGrid from "./_components/AttendanceGrid";
import AttendanceCard from "./_components/AttendanceCard";

const StudentAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  const [overRideLock, setOverRideLock] = useState(false);

  const handleOverRideLock = () => {
    setOverRideLock(!overRideLock);
    console.log("function Called");
  };

  const onSearchHandler = async () => {
    const month = moment(selectedMonth).format("MM");
    const year = moment(selectedMonth).format("YYYY");
    console.log(`Month: ${month}, Year: ${year}, Grade: ${selectedGrade}`);

    try {
      const response = await axios.get(`/api/student_attendance`, {
        params: {
          year,
          month,
          grade: selectedGrade,
        },
      });

      if (response.status === 200) {
        setAttendanceList(response.data);
        console.log("Attendance data fetched successfully", response.data);
      } else {
        console.error("Failed to fetch attendance data");
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  return (
    <div>
      <div className="my-10 flex items-center justify-between">
        <div>
          <h1>Student Attendance</h1>
        </div>
        <div className="flex items-center gap-5">
          <Button onClick={handleOverRideLock} variant="outline">
            Edit
          </Button>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
          <GradeSelect selectedGrade={(value) => setSelectedGrade(value)} />
          <Button
            onClick={onSearchHandler}
            disabled={!selectedGrade}
            className="disabled:cursor-not-allowed"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="my-10">
        <AttendanceCard
          attendanceList={attendanceList}
          selectedMonth={selectedMonth}
        />
      </div>
      <div>
        <AttendanceGrid
          attendanceList={attendanceList}
          selectedMonth={selectedMonth}
          overRideLock={overRideLock}
        />
      </div>

      {/* {attendanceList.length > 0 && (
        <div>
          <h2>Attendance Records:</h2>
          <ul>
            {attendanceList.map((record) => (
              <li key={record.id}>
                {record.firstName} {record.lastName} -{' '}
                {record.present === true ? 'Present' : 'Absent'}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default StudentAttendance;
