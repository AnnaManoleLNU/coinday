"use client";

import { restClient } from "@massive.com/client-js";
import { useEffect, useState } from "react";
import {
  ListTickersMarketEnum,
  ListTickersOrderEnum,
  ListTickers200Response,
} from "@massive.com/client-js";

export default function TickerList({ type }: { type: string }) {
  const [data, setData] = useState<ListTickers200Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error("Api key required.");
  }
  
  const rest = restClient(apiKey, "https://api.massive.com");
  useEffect(() => {
    const fetchTickers = async () => {
      if (type === "") return
      try {
        setLoading(true)
        const response = await rest.listTickers({
          type: type,
          market: ListTickersMarketEnum["Stocks"],
          active: true,
          order: ListTickersOrderEnum["Asc"],
          limit: 1000,
        });

        console.log(response)

        setData(response);
        setLoading(false);
      } catch (e: unknown) {
        setError("Failed to fetch tickers. Too many requests.");
        setLoading(false);
      }
    };
    fetchTickers();
  }, [type]);

  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <div>
      {data?.results?.map((ti, index) => (
        <div className="flex gap-2" key={index}>
          <p className="font-semibold">{ti.ticker} -</p>
          <p>{ti.name}</p>
          
        </div>
      ))}
    </div>
  );
}
