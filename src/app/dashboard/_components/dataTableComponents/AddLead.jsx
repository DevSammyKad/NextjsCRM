import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { LeadStatus, LeadSource } from "@prisma/client";
import { createLead } from "@/actions";
import { leadSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";

// import SubmitButton from "../SubmitButton";

const AddLead = () => {
  const status = Object.keys(LeadStatus);
  const source = Object.keys(LeadSource);

  const [lastResult, action] = useFormState(createLead, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: leadSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Create Lead</Button>
        </DialogTrigger>
        <DialogHeader>
          <DialogContent>
            <DialogTitle>Create Lead</DialogTitle>
            <DialogDescription>
              Create Manual Lead using this form
            </DialogDescription>
            <form
              id={form.id}
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submitted");
                form.onSubmit(e); // Continue with form submission
              }}
              action={action}
            >
              <div className="mt-5 grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Full Name"
                      key={fields.name.key}
                      name={fields.name.name}
                      defaultValue={fields.name.initialValue}
                    />
                    <span className="text-xs text-red-500">
                      {fields.name.errors}
                    </span>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        key={fields.age.key}
                        name={fields.age.name}
                        defaultValue={fields.age.initialValue}
                        placeholder="age : 22"
                      />
                      <span className="text-xs text-red-500">
                        {fields.age.errors}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="source">Source</Label>
                    <Select
                      key={fields.source.key}
                      name={fields.source.name}
                      defaultValue={fields.source.initialValue}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Source" />
                      </SelectTrigger>
                      <SelectContent>
                        {source?.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-red-500">
                      {fields.source.errors}
                    </span>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="grade">Status</Label>
                    <Select
                      key={fields.status.key}
                      name={fields.status.name}
                      defaultValue={fields.status.initialValue}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {status?.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-red-500">
                      {fields.status.errors}
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">Phone</Label>
                  <input
                    type="text"
                    key={fields.phone.key}
                    name={fields.phone.name}
                    defaultValue={fields.phone.initialValue}
                  />
                  <span className="text-xs text-red-500">
                    {fields.phone.errors}
                  </span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="note">Note</Label>
                  <Textarea
                    id="note"
                    type="text"
                    key={fields.note.key}
                    name={fields.note.name}
                    defaultValue={fields.note.initialValue}
                    className="min-h-32"
                    placeholder="Write your Note here"
                  />
                  <p className="text-sm text-red-500">{fields.note.errors}</p>
                </div>
              </div>

              <DialogFooter>
                <SubmitButton text={"Lead"} />
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogHeader>
      </Dialog>
    </>
  );
};

export default AddLead;
