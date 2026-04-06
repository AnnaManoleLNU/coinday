"use client";

import Tickers from "@/app/tickers";
import TickerTypes from "./ticker-types";
import { useState } from "react";

export default function Page() {
  const [type, setType] = useState("");
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <TickerTypes onChange={(value: string) => setType(value)} />
        <Tickers type={type} />
      </div>
    </div>
  );
}
