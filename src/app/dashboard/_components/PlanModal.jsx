"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import pointImg from "../../../../public/point.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Check } from "lucide-react";

const PlanModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="max-w-[300px]">
      <DialogContent>
        <DialogHeader>
          <DialogTitle align="center">
            You're currently on a Free plan
          </DialogTitle>
          <DialogDescription>
            Choose from the plan options below. Upon confirmation, your account
            will be upgraded and the new pricing will be applied immediately.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="free" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100/5">
            <TabsTrigger value="free" className="">
              Free
            </TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>

          <TabsContent value="free">
            <Card>
              <CardHeader>
                $0 /month
                <CardDescription>
                  For individuals that just want to explore.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="my-6 ml-6 list-none [&>li]:mt-2">
                  <li>1000 Create Leads</li>
                  <li>200 Credits/month</li>
                  <li>General Commercial Terms</li>
                  <li>Private Generations</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="premium">
            <Card>
              <CardHeader>
                ₹ 299 /month
                <CardDescription>
                  For individuals that just want to explore.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="my-6 ml-6 list-none [&>li]:mt-2">
                  <li className="flex gap-2">
                    <Check color="#4EFFCA" />
                    Unlimited Leads{" "}
                  </li>
                  <li className="flex gap-2">
                    <Check color="#4EFFCA" /> General Commercial Terms
                  </li>
                  <li className="flex gap-2">
                    {" "}
                    <Check color="#4EFFCA" />
                    Optional credits purchase
                  </li>
                  <li className="flex gap-2">
                    {" "}
                    <Check color="#4EFFCA" />
                    Vision Generations
                  </li>
                  <li className="flex gap-2">
                    {" "}
                    <Check color="#4EFFCA" />
                    Private Generations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="gooeyLeft" type="submit">
            Confirm and Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanModal;
