"use client";

import TickerList from "@/app/ticker-list";
import TickerSelect from "./ticker-select";
import TickerStatusSelect from "./ticker-status-select";
import { useState } from "react";

export default function Page() {
    const [type, setType] = useState("");
    const [active, setActive] = useState<boolean | undefined>(undefined);
    return (
        <div className="flex flex-col p-6">
          <div className="mb-4 flex items-center gap-4">
            <TickerSelect onChange={(value: string) => setType(value)} />
            <TickerStatusSelect onChange={(value: boolean) => setActive(value)} />
          </div>
            <TickerList type={type} active={active} />
        </div>
    );
}
