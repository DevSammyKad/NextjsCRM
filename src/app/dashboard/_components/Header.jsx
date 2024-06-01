'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
  Bell,
  ChevronDown,
  CommandIcon,
  Lightbulb,
  NutOffIcon,
  Search,
  SearchCheck,
  UserPlus,
} from 'lucide-react';

import React from 'react';
import { ModeToggle } from './ModeToggle';
import { Button } from '@/components/ui/button';
import NotificationPanel from './NotificationPanel';
import MobileSidebar from './MobileSidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
//
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const Header = () => {
  const { user } = useKindeBrowserClient();

  return (
    <div>
      <nav className="h-24 flex justify-between items-center mx-2 shadow-sm">
        <MobileSidebar />
        <div className="relative max-sm:hidden">
          <input
            type="text"
            className="rounded-lg pl-5 border border-border-stroke sm:w-[150px] md:w-[236px] lg:w-[450px] h-12 outline-none text-slate-500 text-base font-normal  lg:placeholder:pl-5 transition-all duration-300 ease-in-out "
            placeholder="Search..."
          />
          <Search className="absolute right-4 top-3 w-5 h-5 " color="gray" />
        </div>
        <div className="flex justify-center items-center gap-4">
          <ModeToggle />

          {/* <NotificationPanel /> */}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="ml-2 border-none">
                <div className="flex items-center gap-2 ml-2 relative">
                  <div className="relative">
                    <img
                      src={
                        user?.picture ||
                        'https://avatars.githubusercontent.com/u/96883294?s=64&v=4'
                      }
                      alt=""
                      className="rounded-full object-cover w-12 h-12"
                    />
                    <div className="bg-white w-4 h-4 absolute rounded-full flex justify-center items-center bottom-0 right-1">
                      <div className="bg-green-500 z-10  w-2 h-2 rounded-full"></div>
                    </div>
                  </div>

                  <div className="max-sm:hidden text-left">
                    <h4 className="font-medium text-base">
                      {user?.given_name || 'Sammykad'}
                    </h4>
                    <p> {user?.email || 'sameer.kad@technolize.in'}</p>
                  </div>
                </div>
                {/* <ChevronDown className="mr-2 h-4 w-4 hidden hover:visible" /> */}
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white p-4 rounded-lg">
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
                <Button variant="outline" size="sm">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Tips
                </Button>
                <Button variant="outline" size="sm">
                  <CommandIcon className="mr-2 h-4 w-4" />
                  Shortcuts
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default Header;
