'use client';
import Image from 'next/image';
import next from '../../../../public/next.svg';
import React, { useState } from 'react';
import { NavLinks } from '../../../constants/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarClose, SidebarOpenIcon } from 'lucide-react';
// import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

import { Button } from '@/components/ui/button';
import PlanModal from '@/components/PlanModal';

const SideNav = ({ closeSidebar }) => {
  // const { user } = useKindeBrowserClient();
  const pathname = usePathname();

  const [isExpanded, setIsExpanded] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLinkClick = () => {
    if (closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <>
      <div
        className={`h-screen shadow-sm ${
          isExpanded ? 'w-72' : 'w-24'
        } flex flex-col relative`}
      >
        <button
          onClick={handleToggleSidebar}
          className="absolute hidden w-6 h-6 rounded-full justify-center items-center top-2 -right-1"
        >
          {isExpanded ? (
            <SidebarClose color="gray" size={22} />
          ) : (
            <SidebarOpenIcon color="gray" size={22} />
          )}
        </button>
        <div className="flex justify-between items-center my-5 px-8">
          <div>
            <Image src={next} width={130} height={120} alt="Logo" />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="px-4 font-medium text-sm max-lg:text-xs">
              Main menu
            </h2>
            {NavLinks.slice(0, -2).map((item, index) => (
              <div key={index}>
                <Link href={item.path} onClick={handleLinkClick}>
                  <div
                    className={`flex justify-start my-5 text-start py-3 px-4 rounded-lg mx-5 text-lg font-medium ${
                      pathname === item.path
                        ? `dark:bg-zinc-900 bg-zinc-200 text-[#4EFFCA] ${
                            isExpanded ? 'border-l-8 border-[#4EFFCA]' : ''
                          }`
                        : ''
                    }`}
                  >
                    <div className="flex justify-center items-center space-x-5">
                      <div className="flex justify-center items-center">
                        {item.icon && (
                          <item.icon className="w-6 h-6 flex justify-center items-center" />
                        )}
                      </div>
                      <div className={`${isExpanded ? '' : 'hidden'} text-sm`}>
                        {item.heading}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {NavLinks.length > 1 && <div className="h-px mx-5 my-4"></div>}
            <h2 className="px-4 font-medium text-sm max-lg:text-xs">Setting</h2>
            {NavLinks.slice(-2).map((item, index) => (
              <Link key={index} href={item.path} onClick={handleLinkClick}>
                <div
                  className={`flex justify-start my-5 text-start py-3 px-4 rounded-lg mx-5 text-lg font-medium ${
                    pathname === item.path
                      ? `dark:bg-zinc-900 text-[#4EFFCA] ${
                          isExpanded ? 'border-l-8 border-[#4EFFCA]' : ''
                        }`
                      : ''
                  }`}
                >
                  <div className="flex justify-center items-center space-x-5">
                    <div className="flex justify-center items-center">
                      {item.icon && (
                        <item.icon className="w-6 h-6 flex justify-center items-center" />
                      )}
                    </div>
                    <div className={`${isExpanded ? '' : 'hidden'} text-sm`}>
                      {item.heading}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Upgrade*/}
          {isExpanded && (
            <div className="mt-14 rounded-3xl dark:bg-zinc-800 border py-4 mx-4 px-4">
              <div className="flex gap-2 items-center">
                <h3 className=" text-base font-semibold tracking-tight">
                  Get Result So Far{' '}
                </h3>
                <Button
                  variant="outline"
                  className="bg-[#4EFFCA] rounded-xl px-4 py-2 font-semibold dark:hover:text-white dark:text-black"
                >
                  Pro
                </Button>
              </div>

              <p className="leading-7 text-sm [&:not(:first-child)]:mt-3">
                Get 1 month free and unlock all pro feature
              </p>
              <div className="flex justify-center items-center mt-2">
                <Button
                  onClick={handleModal}
                  className="text-center px-3"
                  variant="outline"
                >
                  Upgrade Now
                </Button>
                {showModal && <PlanModal />}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideNav;
