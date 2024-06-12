'use client';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TeamMembers = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update link value state on input change
  };

  const handleInvite = async () => {
    try {
      if (!email) {
        toast.error('Email is required');
        return;
      }
      const response = await axios.get('/api/email', {
        params: {
          to: email,
        },
      });

      if (response.data.success) {
        toast.success('Invitation sent!');
        console.log(response.data);
      } else {
        toast.error('Failed to send invitation');
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error('Error sending invitation');
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Invite your team members to collaborate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs">People with access</p>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
                <Button
                  disabled={!email}
                  onClick={handleInvite}
                  className="bg-blue-500 dark:text-white "
                  type="submit"
                >
                  Send Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamMembers;
