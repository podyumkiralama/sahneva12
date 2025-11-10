"use client";

import dynamic from "next/dynamic";

const UtilityBar = dynamic(() => import("./UtilityBar"), {
  ssr: false,
  loading: () => null,
});

export default function UtilityBarClient() {
  return <UtilityBar />;
}
