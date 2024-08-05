'use client';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';

//- KEY Features

// Get Instant Notification
// Get all Data form All Platform In place
// Track Student All Data
// Manage Teacher Salary and Track Work Record
// Track Students Onboarding in Animated Globe

import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { BentoGridNotification } from './BentoGridNotification';
import BentoGridAnimatedBeam from './BentoGridAnimatedBeam';
import Globe from '@/components/magicui/globe';

const BentoGrid = () => {
  return (
    <>
      <div className="flex mx-5 mt-20 mb-5">
        <div
          className={cn(
            'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Key Feature of this School CRM</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
      </div>
      <div
        className="flex flex-col md:grid md: grid-cols-3 p-2  gap-10 mx-5 "
        style={{ gridAutoRows: '136px' }}
      >
        <div className=" row-start-1 row-end-4 bg-slate-100 rounded-lg  text-black border-gray-100 border">
          <BentoGridNotification />
        </div>
        <div className="row-start-1 row-end-4 bg-zinc-200/40 animate-pulse bg-gradient-to-tb from-gray-50 via-gray-300 to-red-200  rounded-lg  border-zinc-200 border ">
          <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center  rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60 md:shadow-xl">
            <Globe className="-top-36" />

            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            <span className="absolute bottom-10 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              Track Globe
            </span>
          </div>
        </div>
        <div className="row-start-1 row-end-3 flex items-center justify-between bg-zinc-200/40 rounded-lg text-black  border-zinc-200 border ">
          <BentoGridAnimatedBeam />
        </div>
        <div className="row-start-4 row-end-6 bg-zinc-200/40 rounded-lg text-black  border-zinc-200 border "></div>
        <div className="row-start-4 row-end-6 col-span-2 bg-zinc-200/40 rounded-lg text-black  border-zinc-200 border ">
          {/* <BentoGridAnimatedBeam /> */}
          <div className="p-7">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Real-time Update, What happen in your Organization .
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-3">
              Take the pain out of book keeping! Wave goodbye to mountains of
              paperwork and endless email reminders. There`s now a new way of
              accounting.
            </p>
          </div>
          <div className="space-y-4 mt-5 mx-10">
            <div className="w-20 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg border border-gray-200" />
            <div className="w-full h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg border border-gray-200" />
            <div className="w-full h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg border border-gray-200" />
          </div>
        </div>
        <div className="row-start-3 row-end-4  bg-zinc-200/40 rounded-lg text-black  border-zinc-200 border ">
          {/* <BentoGridAnimatedBeam /> */}
        </div>
      </div>
    </>
  );
};

export default BentoGrid;
