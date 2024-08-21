"use client";
import Image from "next/image";
import next from "../../../../public/next.svg";

import dark_next from "../../../../public/dark_next.svg";
import React, { useState } from "react";
import { NavLinks } from "../../../constants/index";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarClose, SidebarOpenIcon } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { Button } from "@/components/ui/button";
import PlanModal from "../_components/PlanModal";

const SideNav = ({ closeSidebar }) => {
  const pathname = usePathname();

  const [isExpanded, setIsExpanded] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
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
          isExpanded ? "w-72" : "w-24"
        } relative flex flex-col`}
      >
        <button
          onClick={handleToggleSidebar}
          className="absolute -right-1 top-2 hidden h-6 w-6 items-center justify-center rounded-full"
        >
          {isExpanded ? (
            <SidebarClose color="gray" size={22} />
          ) : (
            <SidebarOpenIcon color="gray" size={22} />
          )}
        </button>
        <div className="flex items-center justify-between px-4 lg:my-5">
          <div>
            <Image src={next} width={130} height={120} alt="Logo" />
          </div>
        </div>
        <div className="mt-3 flex h-full flex-col justify-between">
          <div>
            <h2 className="px-4 text-sm font-medium max-lg:text-xs">
              Main menu
            </h2>
            {NavLinks.slice(0, -2).map((item, index) => (
              <div key={index}>
                <Link href={item.path} onClick={handleLinkClick}>
                  <div
                    className={`mx-5 my-5 flex justify-start rounded-lg px-4 py-3 text-start text-lg font-medium ${
                      pathname === item.path
                        ? `bg-zinc-200 text-[#4EFFCA] dark:bg-zinc-900 ${
                            isExpanded ? "border-l-8 border-[#4EFFCA]" : ""
                          }`
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-5">
                      <div className="flex items-center justify-center">
                        {item.icon && (
                          <item.icon className="flex h-6 w-6 items-center justify-center" />
                        )}
                      </div>
                      <div className={`${isExpanded ? "" : "hidden"} text-sm`}>
                        {item.heading}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {NavLinks.length > 1 && <div className="mx-5 my-4 h-px"></div>}
            <h2 className="px-4 text-sm font-medium max-lg:text-xs">Setting</h2>
            {NavLinks.slice(-2).map((item, index) => (
              <Link key={index} href={item.path} onClick={handleLinkClick}>
                <div
                  className={`mx-5 my-5 flex justify-start rounded-lg px-4 py-3 text-start text-lg font-medium ${
                    pathname === item.path
                      ? `text-[#4EFFCA] dark:bg-zinc-900 ${
                          isExpanded ? "border-l-8 border-[#4EFFCA]" : ""
                        }`
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-center space-x-5">
                    <div className="flex items-center justify-center">
                      {item.icon && (
                        <item.icon className="flex h-6 w-6 items-center justify-center" />
                      )}
                    </div>
                    <div className={`${isExpanded ? "" : "hidden"} text-sm`}>
                      {item.heading}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Upgrade*/}
          {isExpanded && (
            <div className="mx-4 mb-5 rounded-3xl border px-4 py-4 dark:border-gray-600 dark:bg-gray-300/10">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold tracking-tight">
                  Get Result So Far{" "}
                </h3>
                <Button
                  variant="outline"
                  className="rounded-xl bg-[#4EFFCA] px-4 py-2 font-semibold dark:text-black dark:hover:text-white"
                >
                  Pro
                </Button>
              </div>

              <p className="text-sm leading-7 [&:not(:first-child)]:mt-3">
                Get 1 month free and unlock all pro feature
              </p>
              <div className="mt-2 flex items-center justify-center">
                <Button
                  onClick={handleOpenModal}
                  className="px-3 text-center"
                  variant="outline"
                >
                  Upgrade Now
                </Button>
                <PlanModal isOpen={showModal} onClose={handleCloseModal} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideNav;
