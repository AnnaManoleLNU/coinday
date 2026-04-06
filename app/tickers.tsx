"use client";

import { restClient } from "@massive.com/client-js";
import { useEffect, useState } from "react";
import {
  ListTickersMarketEnum,
  ListTickersOrderEnum,
  ListTickers200Response,
} from "@massive.com/client-js";

export default function Tickers({ type }: { type: string }) {
  const [data, setData] = useState<ListTickers200Response | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      throw new Error("Api key required.");
    }
    const rest = restClient(apiKey, "https://api.massive.com");
    const listTickers = async () => {
      try {
        const response = await rest.listTickers({
          type: type,
          market: ListTickersMarketEnum["Stocks"],
          active: true,
          order: ListTickersOrderEnum["Asc"],
          limit: 1000,
        });
        setData(response);
      } catch (e) {
        console.error("An error happened:", e);
      }
    };
    listTickers();
  }, [type]);

  return <div>empty data for now</div>;
}
