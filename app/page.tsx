"use client";

import TickerList from "@/app/ticker-list";
import TickerSelect from "./ticker-select";
import { useState } from "react";

export default function Page() {
  const [type, setType] = useState("");
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex flex-col">
        <TickerSelect onChange={(value: string) => setType(value)} />
        <TickerList type={type} />
      </div>
    </div>
  );
}
