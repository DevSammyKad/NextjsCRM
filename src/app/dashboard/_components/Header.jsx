"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Avvvatars from "avvvatars-react";
import man from "../../../../public/man.png";

import {
  Cloud,
  LifeBuoy,
  LogOut,
  Moon,
  Search,
  Sun,
  Users,
} from "lucide-react";

import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import MobileSidebar from "./MobileSidebar";
import { useTheme } from "next-themes";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PlanModal from "./PlanModal";
import TeamMembers from "./TeamMembers";

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
      <nav className="mx-2 flex h-24 items-center justify-between shadow-sm">
        <MobileSidebar />
        <div className="relative max-sm:hidden">
          <input
            type="text"
            className="border-border-stroke h-12 w-full rounded-lg border pl-5 text-base font-normal text-slate-500 outline-none transition-all duration-300 ease-in-out lg:placeholder:pl-5"
            placeholder="Search..."
          />
          <Search className="absolute right-4 top-3 h-5 w-5" color="gray" />
        </div>
        <div className="flex items-center justify-center">
          <ModeToggle />

          {/* <NotificationPanel /> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative ml-2 flex cursor-pointer items-center gap-2">
                <div className="relative h-12 w-12 cursor-pointer rounded-full">
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

                  <div className="absolute bottom-0 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                    <div className="z-10 h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>

                <div className="text-left max-sm:hidden">
                  <h4 className="text-sm font-medium">
                    {user?.given_name || "User Name"}
                  </h4>
                  <p className="text-sm">
                    {" "}
                    {user?.email || "UserName@gmail.com"}
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
                  className="mx-3 my-2 flex cursor-pointer items-center gap-5 hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Create Team</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="my-2 flex cursor-pointer items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-900">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="m-0 border-0 p-0 px-0 outline-none"
                        size="icon"
                      >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span>Theme</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="mx-3 my-2 flex cursor-pointer items-center gap-5 hover:bg-gray-100 dark:hover:bg-gray-900">
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="mx-3 my-2 flex cursor-pointer items-center gap-5 hover:bg-gray-100 dark:hover:bg-gray-900">
                  <LogoutLink
                    postLogoutRedirectURL="./"
                    className="flex w-full items-center gap-5"
                  >
                    <LogOut />
                    <span> Log Out</span>
                  </LogoutLink>
                </DropdownMenuItem>

                <DropdownMenuItem
                  disabled
                  className="my-2 flex cursor-pointer items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <span>API</span>
                  <Cloud className="mr-2 h-4 w-4" />
                </DropdownMenuItem>
              </DropdownMenu>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleOpenPlanModal}
                className="flex w-full justify-center"
              >
                <Button className="w-full">Upgrade to Pro</Button>
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
