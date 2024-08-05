import React from 'react';
import AddNewStudent from './_components/AddNewStudent';
import { toast } from 'sonner';
import GetAllStudents from './_components/GetAllStudents';
import Attendance from './_components/Attendance';
import StudentAttendance from '../studentsAttendance/page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Students = () => {
  return (
    <div>
      <h2 className="items-center flex justify-between">
        Students Dashboard
        <div className="flex items-center gap-2">
          <AddNewStudent />
          <Link href={'/dashboard/studentsAttendance'}>
            <Button variant="gooeyRight" size="sm">
              Take Attendance
            </Button>
          </Link>
        </div>
      </h2>
      <div>
        <GetAllStudents />
      </div>
    </div>
  );
};

export default Students;
