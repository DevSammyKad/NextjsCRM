import React from 'react';
import AddNewStudent from './_components/AddNewStudent';
import { toast } from 'sonner';
import GetAllStudents from './_components/GetAllStudents';
import Attendance from './_components/Attendance';

const Students = () => {
  return (
    <div>
      <h2 className="items-center flex justify-between">
        Students
        <AddNewStudent />
      </h2>
      <div>
        <GetAllStudents />
      </div>
      <Attendance />
    </div>
  );
};

export default Students;
