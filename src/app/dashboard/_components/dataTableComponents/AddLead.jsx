import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { prisma } from "@/lib/db";

async function getLeadStatus() {
  const leadStatus = await prisma.LeadStatus();
  return leadStatus;
}
const AddLead = () => {
  const status = getLeadStatus();

  console.log(status);
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Create Lead</Button>
        </DialogTrigger>
        <DialogHeader>
          <DialogContent>
            <DialogTitle>Create Lead</DialogTitle>
            <DialogDescription>Xyz</DialogDescription>
            {/* <form onSubmit={handleSubmit()}>
              <div className="grid gap-4 mt-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Max"
                      {...register('name', {
                        required: 'Name is required',
                        maxLength: {
                          value: 20,
                          message: ' Name must be less than 20 characters',
                        },
                        minLength: {
                          value: 3,
                          message: ' Name must be at least 3 characters',
                        },
                        validate: (value) =>
                          value[0] === value[0].toUpperCase() ||
                          ' Name must start with a capital letter',
                      })}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs">
                        {errors.name.message}
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
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {status?.map((item, index) => (
                          <SelectItem key={index} value={item.id}>
                            {item.id}
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
                    {...register('address', {
                      required: 'Address is required',
                    })}
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
            </form> */}
          </DialogContent>
        </DialogHeader>
      </Dialog>
    </>
  );
};

export default AddLead;
