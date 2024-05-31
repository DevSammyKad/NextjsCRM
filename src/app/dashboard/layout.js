import { Button } from '@/components/ui/button';
import { Sidebar } from 'lucide-react';
import React from 'react';
import Header from './_components/Header';
import SideNav from './_components/SideNav';

const layout = ({ children }) => {
  return (
    <div className="flex h-full relative">
      <div className="h-screen md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 hidden">
        <SideNav />
      </div>
      <div className="flex-grow flex flex-col">
        <main className="flex-grow md:pl-72">
          <Header />
          <div className="p-5">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default layout;
