"use client";

import React from "react";

export default function LoadingTeam() {
  return (
    <div className="grid w-full max-w-[800px] animate-pulse gap-6 rounded-lg border px-5 py-4 shadow">
      <header className="flex items-center justify-between">
        <div className="grid gap-2">
          <div className="h-5 w-32 animate-pulse rounded bg-neutral-200" />
          <div className="h-5 w-80 animate-pulse rounded bg-neutral-200" />
        </div>
        <div className="h-8 w-32 animate-pulse rounded bg-neutral-200" />
      </header>
      <main className="grid w-full gap-6 rounded-lg border px-5 py-4 shadow">
        <header className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((i, key) => (
            <div
              key={key}
              className="h-5 animate-pulse rounded bg-neutral-200"
            />
          ))}
        </header>
        <div className="grid gap-2">
          {[...Array(5)].map((i, key) => (
            <div
              key={key}
              className="h-12 animate-pulse rounded bg-neutral-200"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
