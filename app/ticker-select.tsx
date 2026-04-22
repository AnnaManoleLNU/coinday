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

type Tickers = {
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
        setData(response);
      } catch (e) {
        console.error("An error happened:", e);
      }
    };
    getData();
  }, []);

  return (
      <div>
        <h1 className="font-medium">Coinday</h1>
        <Select onValueChange={(v) => onChange(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select ticker" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tickers</SelectLabel>
              <SelectItem key="all" value={null}>All tickers</SelectItem>
              {data?.results?.map((r: Tickers, i: number) => (
                <SelectItem key={i} value={r.code}>
                  {r.code} ({r.description})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
   
  );
}
