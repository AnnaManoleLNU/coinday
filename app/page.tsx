"use client";

import TickerList from "@/app/ticker-list";
import TickerSelect from "./ticker-select";
import { useState } from "react";

export default function Page() {
    const [type, setType] = useState("");
    return (
        <div className="flex flex-col p-6">
            <TickerSelect onChange={(value: string) => setType(value)} />
            <TickerList type={type} />
        </div>
    );
}
