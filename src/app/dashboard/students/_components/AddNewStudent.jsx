'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { PhoneInput } from '@/components/ui/phone-input';
import axios from 'axios';

const AddNewStudent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);

  const getGradesList = async () => {
    try {
      const response = await axios.get('/api/grade');
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  useEffect(() => {
    getGradesList();
  }, []);

  const handlePhoneChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
    setValue('phoneNumber', newPhoneNumber); // Register phone number with react-hook-form
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/students', data);
      console.log('Form data submitted:', response.data);
      setOpen(false);
      toast.success('Student added successfully');
      reset();
    } catch (error) {
      console.error('Error during submission:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="flex gap-1 items-center">
            <Plus /> <h1 className="text-xs sm:text-sm">Add New Student</h1>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new student</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mt-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    {...register('firstName', {
                      required: 'First name is required',
                      maxLength: {
                        value: 20,
                        message: 'First name must be less than 20 characters',
                      },
                      minLength: {
                        value: 3,
                        message: 'First name must be at least 3 characters',
                      },
                      validate: (value) =>
                        value[0] === value[0].toUpperCase() ||
                        'First name must start with a capital letter',
                    })}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-xs">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    {...register('lastName', {
                      required: 'Last name is required',
                      validate: (value) =>
                        value[0] === value[0].toUpperCase() ||
                        'Last name must start with a capital letter',
                    })}
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-xs">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="22"
                    {...register('age', { required: 'Age is required' })}
                  />
                  {errors.age && (
                    <span className="text-red-500 text-xs">
                      {errors.age.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select onValueChange={(value) => setValue('grade', value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((item, index) => (
                        <SelectItem key={index} value={item.id}>
                          {item.grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.grade && (
                    <span className="text-red-500 text-xs">
                      {errors.grade.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone</Label>
                <PhoneInput
                  id="phoneNumber"
                  className="flex gap-2 border-0 focus:outline-none focus:border-none"
                  value={phoneNumber}
                  defaultCountry="IN"
                  onChange={handlePhoneChange}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="New Pune, Pune"
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && (
                  <span className="text-red-500 text-xs">
                    {errors.address.message}
                  </span>
                )}
              </div>
            </div>
            <DialogFooter className="mt-10">
              <DialogClose asChild>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="w-full">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewStudent;
