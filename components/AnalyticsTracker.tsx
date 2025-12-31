"use client";

import { useEffect } from "react";
import { trackVisit } from "@/app/actions/analytics";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Runs every time the URL path changes
    trackVisit();
  }, [pathname]);

  return null; // It renders nothing visibly
}