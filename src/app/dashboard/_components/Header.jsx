'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Avvvatars from 'avvvatars-react';
import man from '../../../../public/man.png';

import {
  Cloud,
  LifeBuoy,
  LogOut,
  Moon,
  Search,
  Sun,
  Users,
} from 'lucide-react';

import React, { useState } from 'react';
import { ModeToggle } from './ModeToggle';
import { Button } from '@/components/ui/button';
import MobileSidebar from './MobileSidebar';
import { useTheme } from 'next-themes';

import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PlanModal from './PlanModal';
import TeamMembers from './TeamMembers';

const Header = React.memo(() => {
  const { setTheme } = useTheme();
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  const [showPlanModal, setShowPlanModal] = useState(false);

  const [showTeamMemberDialog, setShowTeamMemberDialog] = useState(false);

  const handleShowTeamMemberDialog = () => {
    setShowTeamMemberDialog(true);
  };
  const handleHideTeamMemberDialog = () => {
    setShowTeamMemberDialog(false);
  };

  const handleOpenPlanModal = () => {
    setShowPlanModal(true);
  };

  const handleClosePlanModal = () => {
    setShowPlanModal(false);
  };

  return (
    <div>
      <nav className="h-24 flex justify-between items-center mx-2 shadow-sm">
        <MobileSidebar />
        <div className="relative max-sm:hidden">
          <input
            type="text"
            className="rounded-lg pl-5 border border-border-stroke w-full h-12 outline-none text-slate-500 text-base font-normal  lg:placeholder:pl-5 transition-all duration-300 ease-in-out "
            placeholder="Search..."
          />
          <Search className="absolute right-4 top-3 w-5 h-5 " color="gray" />
        </div>
        <div className="flex justify-center items-center ">
          <ModeToggle />

          {/* <NotificationPanel /> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 ml-2 relative cursor-pointer">
                <div className="relative cursor-pointer w-12 h-12  rounded-full">
                  {user?.picture ? (
                    <Image
                      src={user?.picture}
                      alt="Profile Picture"
                      width={46}
                      height={46}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <Avvvatars
                      value={user?.given_name?.[0]}
                      displayValue="G"
                      size={46}
                    />
                  )}

                  <div className="bg-white w-4 h-4 absolute rounded-full flex justify-center items-center bottom-0 right-1">
                    <div className="bg-green-500 z-10  w-2 h-2 rounded-full"></div>
                  </div>
                </div>

                <div className="max-sm:hidden text-left">
                  <h4 className="font-medium text-sm">
                    {user?.given_name || 'User Name'}
                  </h4>
                  <p className="text-sm">
                    {' '}
                    {user?.email || 'UserName@gmail.com'}
                  </p>
                </div>
              </div>
              {/* <ChevronDown className="mr-2 h-4 w-4 hidden hover:visible" /> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
              <DropdownMenu>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleShowTeamMemberDialog}
                  className="my-2 flex gap-5 mx-3 items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Create Team</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="my-2  flex gap-4  items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="outline-none p-0 border-0 px-0 m-0 "
                        size="icon"
                      >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme('light')}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('dark')}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('system')}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span>Theme</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="my-2 flex gap-5 mx-3  items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900">
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="my-2 flex gap-5 mx-3  items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900">
                  <LogoutLink
                    postLogoutRedirectURL="./"
                    className="w-full flex  gap-5 items-center"
                  >
                    <LogOut />
                    <span> Log Out</span>
                  </LogoutLink>
                </DropdownMenuItem>

                <DropdownMenuItem
                  disabled
                  className="my-2 cursor-pointer flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <span>API</span>
                  <Cloud className="mr-2 h-4 w-4" />
                </DropdownMenuItem>
              </DropdownMenu>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleOpenPlanModal}
                className="w-full  flex justify-center "
              >
                <Button className="w-full ">Upgrade to Pro</Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <PlanModal isOpen={showPlanModal} onClose={handleClosePlanModal} />
      <TeamMembers
        isOpen={showTeamMemberDialog}
        onClose={handleHideTeamMemberDialog}
      />
    </div>
  );
});

export default Header;
