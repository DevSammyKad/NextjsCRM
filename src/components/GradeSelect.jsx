import React, { useEffect, useState, useCallback } from 'react';
import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
} from './ui/select';
import axios from 'axios';

const GradeSelect = React.memo(({ selectedGrade }) => {
  const [grades, setGrades] = useState([1]);

  const getGradesList = useCallback(async () => {
    try {
      const response = await axios.get('/api/grade');
      setGrades(response.data);
    } catch (error) {
      console.error('Failed to fetch grades:', error);
    }
  }, []);

  useEffect(() => {
    getGradesList();
  }, [getGradesList]);

  const handleValueChange = (value) => {
    selectedGrade(value);
  };

  return (
    <div>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Grade" />
        </SelectTrigger>
        <SelectContent>
          {grades.map((item, index) => (
            <SelectItem key={index} value={item.grade}>
              {item.grade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

export default GradeSelect;
