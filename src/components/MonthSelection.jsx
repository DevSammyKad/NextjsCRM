"use client";

import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { addMonths } from "date-fns";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";
import { Value } from "@radix-ui/react-select";

const MonthSelection = ({ selectedMonth }) => {
  const today = new Date();
  const nextMonths = addMonths(today, 0);
  const [month, setMonth] = useState(nextMonths);

  // Ensure the date is consistent between server and client rendering
  useEffect(() => {
    setMonth(nextMonths);
  }, []);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarDays /> {moment(month).format("MMM YYYY")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(value) => {
              setMonth(value);
              selectedMonth(value);
            }}
            className="flex flex-1 justify-center rounded-lg"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelection;
