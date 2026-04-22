"use client";

import { restClient, ListTickerTypes200Response } from "@massive.com/client-js";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

type Ticker = {
    asset_class: string;
    code: string;
    description: string;
    locale: string;
};

interface Props {
    onChange: (v: string) => void;
}

export default function TickerSelect({ onChange }: Props) {
    const [data, setData] = useState<ListTickerTypes200Response | null>(null);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const getData = async () => {
            if (!apiKey) {
                throw new Error("Missing API_KEY environment variable");
            }

            const rest = restClient(apiKey, "https://api.massive.com");

            try {
                const response = await rest.listTickerTypes({});
                console.log(response);
                setData(response);
            } catch (e) {
                console.error("An error happened:", e);
            }
        };
        getData();
    }, []);

    const ALL_TICKERS = "ALL_TICKERS";

    return (
        <div>
            <Select onValueChange={(v) => onChange(v === ALL_TICKERS ? "" : v)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select ticker" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tickers</SelectLabel>

                        <SelectItem value={ALL_TICKERS}>All tickers</SelectItem>

                        {data?.results?.map((r: Ticker) => (
                            <SelectItem key={r.code} value={r.code}>
                                {r.code} ({r.description})
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
