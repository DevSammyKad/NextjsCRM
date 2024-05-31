// 'use client';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Bell, Plus, UserPlus } from 'lucide-react';
// import { ChevronDown, CopyIcon, Settings, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// const Member = [
//   {
//     name: 'Sammy kad',
//     email: 'XXXXXXXX@gmail.com',
//     role: 'Admin',
//     avatarImage:
//       'https://cdn.dribbble.com/users/1753227/avatars/normal/6752084b4e06d2153861314e61f6a5a2.png?1694596476',
//   },
//   {
//     name: 'Sammy kad',
//     email: 'saskhh@gmail.com',
//     role: 'Employ',
//     avatarImage: 'https://avatars.githubusercontent.com/u/96883294?s=64&v=4',
//   },
// ];

// const NotificationPanel = () => {
//   const [copied, setCopied] = useState(false);
//   const [linkValue, setLinkValue] = useState('');
//   const [email, setEmail] = useState('');

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(linkValue); // Copy link to clipboard
//       setCopied(true); // Set copied state to true (optional for visual feedback)
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopied(false), 3000); // Reset copied state after 2 seconds (optional)
//     } catch (error) {
//       console.error('Error copying link:', error); // Handle potential errors
//     }
//   };
//   const handleChange = (event) => {
//     setLinkValue(event.target.value); // Update link value state on input change
//   };
//   const handleEmailChange = (event) => {
//     setEmail(event.target.value); // Update link value state on input change
//   };

//   const handleInvite = async () => {
//     try {
//       if (!email) {
//         toast.error('Email is required');
//         return;
//       }
//       const response = await axios.get('/api/email', {
//         params: {
//           to: email,
//         },
//       });

//       if (response.data.success) {
//         toast.success('Invitation sent!');
//         console.log(response.data);
//       } else {
//         toast.error('Failed to send invitation');
//       }
//     } catch (error) {
//       console.error('Error sending invitation:', error);
//       toast.error('Error sending invitation');
//     }
//   };

//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button className="flex gap-1 items-center">
//             <UserPlus />
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Invite Team Member</DialogTitle>
//             <DialogDescription>
//               Now You can invite your Team to this Platform
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid lg:grid-cols-1 gap-10 relative sm:grid-cols-1">
//             <div className="flex w-full items-center space-x-2">
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={handleEmailChange}
//               />
//               <Button
//                 onClick={handleInvite}
//                 className="bg-blue-500 dark:text-white "
//                 type="submit"
//               >
//                 Send Invite
//               </Button>
//             </div>
//             <div>
//               <p>Project Members</p>
//               {Member.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center w-full space-x-2 mt-5"
//                 >
//                   <div className="flex items-center gap-2 ml-2 relative  w-full space-x-2">
//                     <div className="relative w-12 h-12">
//                       <Image
//                         src={item.avatarImage}
//                         alt={item.name}
//                         width={50}
//                         height={50}
//                         // priority={true}
//                         className="rounded-full border-2  object-cover "
//                       />
//                       <div className="bg-white w-4 h-4 absolute rounded-full flex justify-center items-center bottom-0 right-1">
//                         <div className="bg-green-500 z-10  w-2 h-2 rounded-full"></div>
//                       </div>
//                     </div>

//                     <div className="">
//                       <h4 className="font-medium text-sm">{item.name}</h4>
//                       <p className="text-gray-400 leading-5 text-xs">
//                         {item.email}
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     <Button
//                       // disabled
//                       variant="outline"
//                       className="flex gap-2 text-sm cursor-not-allowed"
//                     >
//                       <Settings color="gray" size={20} /> {item.role}{' '}
//                       <ChevronDown color="gray" size={20} />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm">
//                 Link To share
//               </p>
//               <div className="flex w-full items-center space-x-10 mt-3">
//                 <Input
//                   type="text"
//                   placeholder="Link"
//                   value={linkValue}
//                   onChange={handleChange}
//                 />
//                 <Button className="" type="Copy" onClick={handleCopy}>
//                   {copied ? (
//                     'Copied!'
//                   ) : (
//                     <CopyIcon className="h-5 w-5 text-white" />
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <DialogFooter className="mt-10">
//             <DialogClose asChild>
//               <Button
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => setOpen(false)}
//               >
//                 Cancel
//               </Button>
//             </DialogClose>
//             <Button type="submit" className="w-full">
//               Create
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default NotificationPanel;
