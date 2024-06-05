import React from 'react';
import AddNewStudent from './_components/AddNewStudent';
import { Toaster } from 'react-hot-toast';

const Students = () => {
  return (
    <div>
      <h2 className="font-bold text-xl items-center flex justify-between">
        Students
        <AddNewStudent />
      </h2>
      <div></div>
      <Toaster />
    </div>
  );
};

export default Students;
