'use client';

import React from 'react';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import SideNav from './SideNav';

const MobileSidebar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="flex md:hidden items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <MenuIcon className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent side="left">
          <SideNav />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
