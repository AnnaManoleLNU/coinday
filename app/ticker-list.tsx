"use client";

import { restClient } from "@massive.com/client-js";
import { useEffect, useState, useRef, useMemo } from "react";
import {
    ListTickersMarketEnum,
    ListTickersOrderEnum,
    ListTickers200Response,
} from "@massive.com/client-js";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";
import StatusDot from "./status-dot";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import TypeBadge from "./type-badge";

export default function TickerTable({
    type,
    active,
}: {
    type?: string;
    active?: boolean;
}) {
    const [data, setData] = useState<ListTickers200Response | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
        throw new Error("Api key required.");
    }

    const rest = useMemo(() => {
        return restClient(apiKey, "https://api.massive.com");
    }, [apiKey]);

    useEffect(() => {
        const fetchTickers = async () => {
            try {
                setLoading(true);
                setError(null);

                const baseParams = {
                    type,
                    market: ListTickersMarketEnum["Stocks"],
                    order: ListTickersOrderEnum["Asc"],
                    limit: 1000,
                };

                let response: ListTickers200Response;

                if (active === undefined) {
                    const [activeResponse, inactiveResponse] = await Promise.all([
                        rest.listTickers({
                            ...baseParams,
                            active: true,
                        }),
                        rest.listTickers({
                            ...baseParams,
                            active: false,
                        }),
                    ]);

                    // response if active is undefined should include both active and inactive tickers, sorted by ticker name
                    response = {
                        ...activeResponse,
                        results: [
                            ...(activeResponse.results ?? []),
                            ...(inactiveResponse.results ?? []),
                        ].sort((a, b) => a.ticker.localeCompare(b.ticker)),
                    };
                } else {
                    // if active is defined, filter by active status
                    response = await rest.listTickers({
                        ...baseParams,
                        active,
                    });
                }

                console.log(response);

                setData(response);
                setLoading(false);
            } catch (e: unknown) {
                setError("Failed to fetch tickers. Too many requests.");
                setLoading(false);
            }
        };

        fetchTickers();
    }, [type, active, rest]);

    const parentRef = useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: data?.results?.length || 0,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 44,
        overscan: 12,
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    return (
        <>
            {data?.results ? (
                <div className="mt-3 overflow-hidden rounded-lg border border-border bg-card w-full">
                    <div className="grid grid-cols-[28px_90px_1fr_70px_70px_60px_70px] items-center gap-3 border-b border-border bg-muted/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        <span></span>
                        <span>Ticker</span>
                        <span>Name</span>
                        <span>Type</span>
                        <span>Exchange</span>
                        <span>Market</span>
                        <span className="text-right">Currency</span>
                    </div>

                    <div ref={parentRef} className="h-[560px] overflow-auto">
                        <div
                            style={{
                                height: rowVirtualizer.getTotalSize(),
                                position: "relative",
                                width: "100%",
                            }}
                        >
                            {rowVirtualizer.getVirtualItems().map((vi) => {
                                const ticker = data?.results?.[vi.index];
                                return (
                                    <button
                                        key={vi.index}
                                        type="button"
                                        className={cn(
                                            "absolute left-0 top-0 grid w-full grid-cols-[28px_90px_1fr_70px_70px_60px_70px] items-center gap-3 border-b border-border/50 px-4 text-left text-sm transition-colors hover:bg-accent/60 focus:bg-accent focus:outline-none"
                                        )}
                                        style={{
                                            height: 44,
                                            transform: `translateY(${vi.start}px)`,
                                        }}
                                    >
                                        <StatusDot
                                            active={ticker?.active || false}
                                        />
                                        <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
                                            {ticker?.ticker}
                                        </span>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="truncate text-sm text-foreground/90">
                                                    {ticker?.name}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {ticker?.name}
                                            </TooltipContent>
                                        </Tooltip>
                                        
                                        <TypeBadge type={ticker?.type} />
                                        {ticker?.primary_exchange ? (
                                            <Badge
                                                variant="outline"
                                                className="h-5 justify-center px-1.5 font-mono text-[10px] font-medium"
                                            >
                                                {ticker?.primary_exchange}
                                            </Badge>
                                        ) : (
                                            <span className="text-sm text-foreground/80">
                                                -
                                            </span>
                                        )}
                                        <span className="font-mono text-[11px] uppercase text-muted-foreground">
                                            {ticker?.market}
                                        </span>
                                        <span className="text-right font-mono text-[11px] uppercase text-muted-foreground">
                                            {ticker?.currency_name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <p>No tickers found for the selected type.</p>
            )}
        </>
    );
}