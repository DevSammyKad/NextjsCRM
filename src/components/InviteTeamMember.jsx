'use client';

import React, { useState } from 'react';
// import { IoClose } from 'react-icons/io5';
// import { Clos } from 'react-icons/ci';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Image from 'next/image';
import { ChevronDown, CopyIcon, Settings, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Member = [
  {
    name: 'Sammy kad',
    email: 'XXXXXXXX@gmail.com',
    role: 'Admin',
    avatarImage:
      'https://cdn.dribbble.com/users/1753227/avatars/normal/6752084b4e06d2153861314e61f6a5a2.png?1694596476',
  },
  {
    name: 'Sammy kad',
    email: 'saskhh@gmail.com',
    role: 'Employ',
    avatarImage: 'https://avatars.githubusercontent.com/u/96883294?s=64&v=4',
  },
];
console.log(Member);

const InviteTeamMember = () => {
  const [copied, setCopied] = useState(false);
  const [linkValue, setLinkValue] = useState('');
  const [email, setEmail] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkValue); // Copy link to clipboard
      setCopied(true); // Set copied state to true (optional for visual feedback)
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 3000); // Reset copied state after 2 seconds (optional)
    } catch (error) {
      console.error('Error copying link:', error); // Handle potential errors
    }
  };
  const handleChange = (event) => {
    setLinkValue(event.target.value); // Update link value state on input change
  };
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
    <div>
      <div className="fixed inset-0 z-10  w-full flex items-center justify-center bg-black dark:bg-white dark:bg-opacity-50 dark:backdrop-blur-sm bg-opacity-50 backdrop-blur-sm">
        {' '}
        <div className="bg-white dark:bg-black p-10 rounded-2xl w-[400px]  ">
          <div className="flex justify-between items-center mb-10 ">
            <h5 className=" font-medium">
              Invite Team Member{' '}
              <p className="text-gray-400 leading-5 text-xs">
                Now You can invite your Team to this Platform
              </p>
            </h5>

            <button
              //   onClick={closeModal}
              className=" text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded-full p-1"
            >
              <X size={22} className="" />
            </button>
          </div>
          <div className="grid lg:grid-cols-1 gap-10 relative sm:grid-cols-1">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              <Button
                onClick={handleInvite}
                className="bg-blue-500 dark:text-white "
                type="submit"
              >
                Send Invite
              </Button>
            </div>
            <div>
              <p>Project Members</p>
              {Member.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center w-full space-x-2 mt-5"
                >
                  <div className="flex items-center gap-2 ml-2 relative  w-full space-x-2">
                    <div className="relative w-12 h-12">
                      <Image
                        src={item.avatarImage}
                        alt={item.name}
                        width={50}
                        height={50}
                        // priority={true}
                        className="rounded-full border-2  object-cover "
                      />
                      <div className="bg-white w-4 h-4 absolute rounded-full flex justify-center items-center bottom-0 right-1">
                        <div className="bg-green-500 z-10  w-2 h-2 rounded-full"></div>
                      </div>
                    </div>

                    <div className="">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-gray-400 leading-5 text-xs">
                        {item.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button
                      // disabled
                      variant="outline"
                      className="flex gap-2 text-sm cursor-not-allowed"
                    >
                      <Settings color="gray" size={20} /> {item.role}{' '}
                      <ChevronDown color="gray" size={20} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm">
                Link To share
              </p>
              <div className="flex w-full items-center space-x-10 mt-3">
                <Input
                  type="text"
                  placeholder="Link"
                  value={linkValue}
                  onChange={handleChange}
                />
                <Button className="" type="Copy" onClick={handleCopy}>
                  {copied ? (
                    'Copied!'
                  ) : (
                    <CopyIcon className="h-5 w-5 text-white" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default InviteTeamMember;
