"use client";
import InviteTeamMember from "@/components/InviteTeamMember";
import { Button } from "@/components/ui/button";
import person from "../../../../public/person.jpg";
import man from "../../../../public/man.png";
import {
  ArrowUpDown,
  ChevronDown,
  CircleArrowOutDownLeftIcon,
  Columns3,
  Download,
  FilterIcon,
  FolderCheck,
  List,
  Timer,
} from "lucide-react";
import React, { useState } from "react";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Teachers = () => {
  const [selectedMember, setSelectedMember] = useState(1);

  const determineStatus = (checkIn, checkOut) => {
    if (!checkIn || checkIn === "00:00") {
      return "Absent";
    }
    const [checkInHours, checkInMinutes] = checkIn.split(":").map(Number);
    const [checkOutHours, checkOutMinutes] = checkOut.split(":").map(Number);

    if (checkInHours > 9 || (checkInHours === 9 && checkInMinutes > 15)) {
      if (checkInHours >= 10) {
        return "Very Late";
      }
      return "Late";
    }
    if (checkInHours < 9) {
      return "Early";
    }
    if (checkOutHours < 16 || (checkOutHours === 16 && checkOutMinutes < 0)) {
      return "Early Leave";
    }
    if (checkOutHours >= 18) {
      return "Extended";
    }
    return "On Time";
  };

  const MemberData = [
    {
      id: 1,
      name: "Sammy Kad",
      role: "Head of UX Design",
      email: "sameerkad2001@gami.com",
      phone: "+91 8459324821",
      status: "active",
      dateJoined: "2022-05-01",
      profileImage: person,
      displayHighlightGridCard: [
        {
          icon: <FolderCheck size={28} />,
          highlight: 300,
          title: "Total Attendance",
        },
        {
          icon: <CircleArrowOutDownLeftIcon size={28} />,
          highlight: "09.00",
          title: "Avg Check In ",
        },
        {
          icon: <CircleArrowOutDownLeftIcon className="rotate-180" size={28} />,
          highlight: "05.00",
          title: "Avg Check Out",
        },
        {
          icon: <FolderCheck size={28} />,
          highlight: 300,
          title: "Total Attendance",
        },
      ],
      attendanceHistory: [
        { date: "2023-05-01", checkIn: "09:30", checkOut: "16:15" },
        { date: "2023-05-02", checkIn: "00:00", checkOut: "00:00" },
        { date: "2023-05-03", checkIn: "09:10", checkOut: "17:00" },
        { date: "2023-05-04", checkIn: "10:45", checkOut: "15:30" },
        { date: "2023-05-05", checkIn: "09:00", checkOut: "16:45" },
        { date: "2023-05-06", checkIn: "09:15", checkOut: "16:00" },
        { date: "2023-05-07", checkIn: "09:40", checkOut: "16:30" },
        { date: "2023-05-08", checkIn: "09:00", checkOut: "18:00" },
      ],
    },
    {
      id: 2,
      name: "Nitin Kumar",
      role: "Support Staff",
      email: "Neha@gami.com",
      phone: "+91 9999324821",
      status: "active",
      dateJoined: "2023-05-01",
      displayHighlightGridCard: [
        {
          icon: <FolderCheck size={28} />,
          highlight: 600,
          title: "Total Attendance",
        },
        {
          icon: <CircleArrowOutDownLeftIcon size={28} />,
          highlight: "09.00",
          title: "Avg Check In ",
        },
        {
          icon: <CircleArrowOutDownLeftIcon className="rotate-180" size={28} />,
          highlight: "05.00",
          title: "Avg Check Out",
        },
        {
          icon: <FolderCheck size={28} />,
          highlight: 300,
          title: "Total Attendance",
        },
      ],
      attendanceHistory: [
        { date: "2023-05-01", checkIn: "13:15", checkOut: "16:00" },
        { date: "2023-05-02", checkIn: "10:30", checkOut: "15:15" },
        { date: "2023-05-03", checkIn: "09:15", checkOut: "16:45" },
        { date: "2023-05-04", checkIn: "11:00", checkOut: "14:45" },
        { date: "2023-05-05", checkIn: "09:30", checkOut: "16:15" },
        { date: "2023-05-06", checkIn: "00:00", checkOut: "00:00" },
        { date: "2023-05-07", checkIn: "10:45", checkOut: "15:30" },
        { date: "2023-05-08", checkIn: "09:15", checkOut: "16:00" },
      ],
    },
  ];

  const selectedMemberData = MemberData.find(
    (member) => member.id === selectedMember,
  );

  const handleSelectMember = (value) => {
    setSelectedMember(Number(value));
  };

  return (
    <div className="dark:bg-transparent">
      <Card className="rounded-lg bg-white dark:bg-slate-400/10">
        <div>
          <div className="grid grid-cols-1 items-center gap-4 px-8 py-6 max-sm:p-4 sm:grid-cols-2">
            <div className="flex">
              <h1 className="rounded border-l-8 border-[#4EFFCA] text-xl max-sm:text-xs">
                Teacher Details
              </h1>
            </div>
            <div className="flex items-center justify-end gap-5 max-sm:justify-start max-sm:gap-2">
              <Select onValueChange={handleSelectMember}>
                <SelectTrigger className="w-[180px] bg-transparent">
                  <SelectValue placeholder="Select Member" />
                </SelectTrigger>
                <SelectContent className="bg-transparent">
                  <SelectItem value="1">Sammy</SelectItem>
                  <SelectItem value="2">Neh</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                className="flex gap-3 bg-[#4EFFCA] font-semibold text-black dark:hover:bg-[#bed3cd] max-sm:text-xs"
              >
                <Download size={18} />
                Download Info
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-start space-y-5 p-5 sm:flex-row sm:space-x-10 sm:space-y-0">
            <div className="justify- flex items-center">
              <Image
                src={selectedMemberData.profileImage || man}
                alt="Teacher"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="my-3 text-xl">{selectedMemberData.name}</h1>
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                <div className="col-span-1">
                  <p className="text-sm text-gray-500">Role</p>
                  <span className="font-base text-sm">
                    {selectedMemberData.role}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <span className="font-base text-sm">
                    {selectedMemberData.phone}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <span className="font-base text-sm">
                    {selectedMemberData.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-5 grid grid-cols-2 gap-5 px-5 pb-5 lg:grid-cols-4">
          {selectedMemberData?.displayHighlightGridCard?.map((item, index) => (
            <Card
              key={index}
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 py-3 dark:bg-gray-300/5 max-sm:p-4"
            >
              <div className="flex items-center space-x-4 rounded-md p-4">
                {item.icon}
                <div className="flex-1 space-y-1">
                  <p className="text-lg font-medium leading-none">
                    {item.highlight}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
      {/* Attendance History */}
      <Card className="my-5 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-300/5 max-sm:p-4">
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:justify-start max-sm:gap-5">
          <div className="">
            <h1 className="rounded border-l-8 border-[#4EFFCA] text-xl max-sm:text-base">
              Attendance History
            </h1>
          </div>
          <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between">
            <div>
              <Button
                variant="outline"
                className="flex items-center gap-2 border bg-transparent max-sm:text-xs"
              >
                This Year <ChevronDown size={18} />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="default" size="sm">
                <Columns3 />
                {/* <List /> */}
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown />
              </Button>
              <Button variant="outline" size="sm">
                <FilterIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="my-5 grid gap-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {selectedMemberData.attendanceHistory
              .reverse()
              .map((attendance, attendanceIndex) => (
                <Card
                  key={attendanceIndex}
                  className="col-span-1 bg-gray-500/10"
                >
                  <div className="flex justify-between p-5">
                    <div className="flex items-center gap-4">
                      <Timer />
                      <p className="text-sm">{attendance.date}</p>
                    </div>
                    <div
                      className={`rounded-xl bg-[#4EFFCA]/10 px-4 py-2 text-xs ${
                        determineStatus(
                          attendance.checkIn,
                          attendance.checkOut,
                        ) === "Absent"
                          ? "bg-gray-300/10 text-gray-500"
                          : determineStatus(
                                attendance.checkIn,
                                attendance.checkOut,
                              ) === "On Time"
                            ? ""
                            : determineStatus(
                                  attendance.checkIn,
                                  attendance.checkOut,
                                ) === "Late"
                              ? "bg-orange-300/10 text-[#FF6B6B]"
                              : determineStatus(
                                    attendance.checkIn,
                                    attendance.checkOut,
                                  ) === "Very Late"
                                ? "bg-red-100/10 text-red-400"
                                : determineStatus(
                                      attendance.checkIn,
                                      attendance.checkOut,
                                    ) === "Early"
                                  ? "bg-purple-50 text-purple-500"
                                  : determineStatus(
                                        attendance.checkIn,
                                        attendance.checkOut,
                                      ) === "Early Leave"
                                    ? "bg-yellow-300/10 text-[#FFFF00]"
                                    : determineStatus(
                                          attendance.checkIn,
                                          attendance.checkOut,
                                        ) === "Extended"
                                      ? "bg-green-300/10 text-[#00FF00]"
                                      : ""
                      } custom_color`}
                    >
                      {determineStatus(attendance.checkIn, attendance.checkOut)}
                    </div>
                  </div>
                  <div className="flex justify-between p-5">
                    <div>
                      <p className="text-gray-400">Check In</p>
                      {attendance.checkIn}
                    </div>
                    <div>
                      <p className="text-gray-400">Check Out</p>
                      {attendance.checkOut}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  );
};

export default Teachers;
