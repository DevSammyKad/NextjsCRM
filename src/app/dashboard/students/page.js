import React from 'react';
import AddNewStudent from './_components/AddNewStudent';
import { Toaster } from 'react-hot-toast';
import GetAllStudents from './_components/GetAllStudents';

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
      <Toaster />
    </div>
  );
};

export default Students;
