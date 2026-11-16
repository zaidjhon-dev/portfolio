"use client";

import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F8F6] text-[#0D0D0D] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold tracking-wide text-[#1D4ED8] mb-3 font-mono">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-heading mb-4 text-[#0D0D0D]">
        Page not found
      </h1>
      <p className="text-sm sm:text-base text-[#525250] max-w-md mb-8 leading-relaxed">
        The link you followed may be broken or the page may have been moved.
      </p>
      <Link
        href="/"
        className="btn-primary-blue gap-2"
      >
        <ArrowLeft size={16} weight="bold" />
        <span>Return home</span>
      </Link>
    </div>
  );
}
