import {useEffect, useState} from "react";
import {api} from "../api/api";

import MetricCard from "../components/MetricCard";
import PriceChart from "../components/PriceChart";

import type {MarketData, ReturnStats, VolatilityStats} from "../types/api";

export default function MarketAnalysis() {

    const [prices, setPrices] =
        useState<MarketData[]>([]);

    const [returnStats, setReturnStats] =
        useState<ReturnStats | null>(null);

    const [volatilityStats, setVolatilityStats] =
        useState<VolatilityStats | null>(null);

    const [ticker, setTicker] =
        useState("AAPL");

    const fetchData = async () => {

        try {

            const [
                marketResponse,
                returnsResponse,
                volatilityResponse
            ] = await Promise.all([

                api.get(
                    `/market-data/${ticker}`
                ),

                api.get(
                    `/analytics/${ticker}/returns`
                ),

                api.get(
                    `/analytics/${ticker}/volatility`
                )

            ]);

            setPrices(
                marketResponse.data
            );

            setReturnStats(
                returnsResponse.data
            );

            setVolatilityStats(
                volatilityResponse.data
            );

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        const loadInitialData = async () => {
            await fetchData();
        };

        void loadInitialData();

    }, []);

    return (
        <div>

            <h1
                style={{
                    marginTop: "20px",
                    marginBottom: "20px"
                }}
            >
                Market Analysis
            </h1>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <label
                        style={{
                            marginBottom: "5px",
                            color: "#94A3B8",
                            fontSize: "14px"
                        }}
                    >
                        Ticker
                    </label>

                    <input
                        value={ticker}
                        onChange={(e) =>
                            setTicker(
                                e.target.value.toUpperCase()
                            )
                        }
                        placeholder="AAPL"
                        style={{
                            textTransform: "uppercase",
                            width: "300px",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #334155",
                            backgroundColor: "#1E293B",
                            color: "#F8FAFC"
                        }}
                    />
                </div>

                <button
                    onClick={fetchData}
                    style={{
                        padding: "12px 20px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#2563EB",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    Analyze
                </button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(4, 1fr)",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <MetricCard
                    title="Mean Return"
                    value={
                        returnStats
                            ? (
                            returnStats.mean_return * 100
                        ).toFixed(2) + "%"
                            : "-"
                    }
                />

                <MetricCard
                    title="Daily Volatility"
                    value={
                        volatilityStats
                            ? (
                            volatilityStats.daily_volatility * 100
                        ).toFixed(2) + "%"
                            : "-"
                    }
                />

                <MetricCard
                    title="Annualized Volatility"
                    value={
                        volatilityStats
                            ? (
                            volatilityStats.annualized_volatility * 100
                        ).toFixed(2) + "%"
                            : "-"
                    }
                />

                <MetricCard
                    title="Observations"
                    value={
                        returnStats
                            ? returnStats.observations.toString()
                            : "-"
                    }
                />

            </div>

            <PriceChart data={prices}/>

        </div>
    );
}