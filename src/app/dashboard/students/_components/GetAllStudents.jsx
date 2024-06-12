'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const GetAllStudents = () => {
  const [studentsData, setStudentsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStudentsData();
  }, []);

  const getStudentsData = async () => {
    try {
      const response = await axios.get('/api/students');
      if (response.data) {
        setStudentsData(response.data);
        console.log('Data :', response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {studentsData ? (
        <ul>
          {studentsData.map((student) => (
            <li key={student.id}>
              {student.firstName} {student.lastName}
              {student.age}
            </li>
          ))}
        </ul>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default GetAllStudents;
