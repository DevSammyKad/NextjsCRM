"use client";
import Avvvatars from "avvvatars-react";
import axios from "axios";
import React, { useState, useEffect } from "react";

const GetAllStudents = () => {
  const [studentsData, setStudentsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStudentsData();
  }, []);

  const getStudentsData = async () => {
    try {
      const response = await axios.get("/api/students");
      if (response.data) {
        setStudentsData(response.data);
        console.log("Data :", response.data);
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
            <li key={student.id} className="my-3 flex items-center gap-2">
              <Avvvatars value={student?.firstName?.[0]} size={46} />
              {student.firstName} {student.lastName}
              {student.organizationId} {student.gradeId} {student.age}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex h-10 w-full animate-pulse items-center justify-center rounded-lg bg-gray-400/5"></div>
      )}
    </div>
  );
};

export default GetAllStudents;
