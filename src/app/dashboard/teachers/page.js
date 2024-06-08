'use client';
import InviteTeamMember from '@/components/InviteTeamMember';
import { Button } from '@/components/ui/button';
import person from '../../../../public/person.jpg';
import {
  ChevronDown,
  Columns3,
  Download,
  FilterIcon,
  List,
  Timer,
} from 'lucide-react';
import React, { useState } from 'react';

import { Card } from '@/components/ui/card';
import Image from 'next/image';

const Teachers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const determineStatus = (checkIn, checkOut) => {
    if (!checkIn || checkIn === '00:00') {
      return 'Absent';
    }
    const [checkInHours, checkInMinutes] = checkIn.split(':').map(Number);
    const [checkOutHours, checkOutMinutes] = checkOut.split(':').map(Number);

    if (checkInHours > 9 || (checkInHours === 9 && checkInMinutes > 15)) {
      if (checkInHours >= 10) {
        return 'Very Late';
      }
      return 'Late';
    }
    if (checkInHours < 9) {
      return 'Early';
    }
    if (checkOutHours < 16 || (checkOutHours === 16 && checkOutMinutes < 0)) {
      return 'Early Leave';
    }
    if (checkOutHours >= 18) {
      return 'Extended';
    }
    return 'On Time';
  };

  const MemberData = [
    {
      id: 1,
      name: 'Sammy Kad',
      role: 'Head of UX Design',
      email: 'sameerkad2001@gami.com',
      phone: '+91 8459324821',
      status: 'active',
      date: '2023-05-01',
      attendanceHistory: [
        { date: '2023-05-01', checkIn: '09:30', checkOut: '16:15' },
        { date: '2023-05-02', checkIn: '00:00', checkOut: '00:00' },
        { date: '2023-05-03', checkIn: '09:10', checkOut: '17:00' },
        { date: '2023-05-04', checkIn: '10:45', checkOut: '15:30' },
        { date: '2023-05-05', checkIn: '09:00', checkOut: '16:45' },
        { date: '2023-05-06', checkIn: '09:15', checkOut: '16:00' },
        { date: '2023-05-07', checkIn: '09:40', checkOut: '16:30' },
        { date: '2023-05-08', checkIn: '10:00', checkOut: '15:45' },
        { date: '2023-05-08', checkIn: '08:00', checkOut: '17:00' },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-transparent">
      Teachers <button onClick={handleOpen}>open</button>
      {isModalOpen && <InviteTeamMember onClose={handleCloseModal} />}
      <div className="bg-white dark:bg-slate-400/10 rounded-lg shadow-xl my-5">
        <div className="flex justify-between items-center py-6 px-8 max-sm:p-4">
          <div>
            <h1 className="sm:text-xs md:text-xl border-[#4EFFCA] border-l-8 rounded">
              Teacher Details
            </h1>
          </div>
          <div className="flex items-center gap-5 max-sm:gap-2">
            <Button
              variant="outline"
              className="bg-transparent border flex items-center gap-2 max-sm:text-xs"
            >
              This Year <ChevronDown size={18} />
            </Button>
            <Button
              size="sm"
              className="flex gap-3 max-sm:text-xs bg-[#4EFFCA] dark:hover:bg-[#bed3cd] text-black font-semibold"
            >
              <Download size={18} />
              Download Info
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-start space-x-10 p-5">
          <div className="flex justify-center items-center">
            <Image
              src={person}
              alt="Teacher"
              className="rounded-full w-20 h-20 object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl my-3">Sammy Kad</h1>
            <div className="grid grid-cols-3 gap-10">
              <div className="col-span-1">
                <p className="text-sm text-gray-500">Role</p>
                <span className="text-sm font-base">Head of UX Design</span>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-gray-500">Phone Number</p>
                <span className="text-sm font-base">+91 8459324821</span>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-gray-500">Email Address</p>
                <span className="text-sm font-base">
                  sameerkad2001@gami.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Attendance History */}
      <div className="bg-white dark:bg-gray-300/5 p-8 max-sm:p-4 rounded-xl shadow-xl my-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="max-sm:text-base text-xl border-[#4EFFCA] border-l-8 rounded">
              Attendance History
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Columns3 />
            </Button>
            <Button variant="outline" size="sm">
              <List />
            </Button>
            <Button variant="outline" size="sm">
              <FilterIcon />
            </Button>
          </div>
        </div>
        <div className="mt-10">
          {MemberData.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {item.attendanceHistory.map((attendance, attendanceIndex) => (
                <Card
                  key={attendanceIndex}
                  className="bg-gray-500/10 col-span-1"
                >
                  <div className="flex justify-between p-5">
                    <div className="flex items-center gap-4">
                      <Timer />
                      {attendance.date}
                    </div>
                    <div
                      className={`text-xs bg-[#4EFFCA]/10 rounded-xl py-2 px-4 ${
                        determineStatus(
                          attendance.checkIn,
                          attendance.checkOut
                        ) === 'Absent'
                          ? 'bg-gray-300/10 text-gray-500'
                          : determineStatus(
                              attendance.checkIn,
                              attendance.checkOut
                            ) === 'On Time'
                          ? ''
                          : determineStatus(
                              attendance.checkIn,
                              attendance.checkOut
                            ) === 'Late'
                          ? 'bg-orange-300/10 text-[#FF6B6B]'
                          : determineStatus(
                              attendance.checkIn,
                              attendance.checkOut
                            ) === 'Very Late'
                          ? 'bg-red-100/10 text-red-400'
                          : determineStatus(
                              attendance.checkIn,
                              attendance.checkOut
                            ) === 'Early'
                          ? 'bg-purple-50 text-purple-500'
                          : determineStatus(
                              attendance.checkIn,
                              attendance.checkOut
                            ) === 'Early Leave'
                          ? 'bg-yellow-300/10 text-[#FFFF00]'
                          : determineStatus(
                              attendance.checkIn,
                              attendance.checkOut
                            ) === 'Extended'
                          ? 'bg-green-300/10 text-[#00FF00]'
                          : ''
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
