'use client';
import React, { useState } from 'react';
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
import toast, { Toaster } from 'react-hot-toast';

import PhoneInput from '../../../../components/phoneInput/index';

const AddNewStudent = ({ Toaster }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
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
      alert(JSON.stringify(data));
      console.log('Form data submitted:', data);
      setOpen(false);
      toast.success('Student added successfully');
      reset();
    } catch (error) {
      toast.error('Please try again');
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex gap-1 items-center">
            <Plus /> Add New Student
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
                      validate: (value) => value[0] === value[0].toUpperCase(),
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
                  <Select
                    onValueChange={(value) => setValue('grade', value)}
                    {...register('grade', { required: 'Grade is required' })}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7th">7th</SelectItem>
                      <SelectItem value="8th">8th</SelectItem>
                      <SelectItem value="9th">9th</SelectItem>
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
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  defaultCountry="US"
                  className="phone-input-class"
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
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
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
