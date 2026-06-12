import {useState} from "react";
import {api} from "../api/api";
import type {PortfolioOptimizationResponse} from "../types/api";
import MetricCard from "../components/MetricCard.tsx";
import AllocationChart
    from "../components/AllocationChart";

export default function PortfolioOptimization() {

    const [tickers, setTickers] =
        useState("AAPL,NVDA,EA,JPM,VMC");

    const [result, setResult] =
        useState<PortfolioOptimizationResponse | null>(
            null
        );

    const optimizePortfolio = async () => {

        try {

            const tickerArray =
                tickers
                    .split(",")
                    .map((ticker) =>
                        ticker.trim()
                    );

            const response =
                await api.post(
                    "/portfolio/optimize",
                    {
                        tickers: tickerArray
                    }
                );

            setResult(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div>

            <h1>Portfolio Optimization</h1>

            <p
                style={{
                    color: "#94A3B8",
                    marginTop: "-10px",
                    marginBottom: "30px",
                    textAlign: "center"
                }}
            >
                Optimization based on covariance matrix and Markowitz portfolio theory.
            </p>

            <div
                style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "center",
                    gap: "20px",
                    marginBottom: "40px"
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
                        Tickers
                    </label>

                    <input
                        value={tickers}
                        onChange={(e) =>
                            setTickers(e.target.value)
                        }
                        style={{
                            width: "400px",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #334155",
                            backgroundColor: "#1E293B",
                            color: "#F8FAFC"
                        }}
                    />
                </div>

                <button
                    onClick={optimizePortfolio}
                    style={{
                        padding: "12px 20px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#2563EB",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    Optimize Portfolio
                </button>
            </div>
            {
                result && (<MetricCard
                    title="Portfolio Risk"
                    value={
                        (result.portfolio_variance * 100)
                            .toFixed(2) + "%"
                    }/>)
            }
            {
                result && (

                    <div
                        style={{
                            marginTop: "30px",
                            backgroundColor: "#1E293B",
                            padding: "20px",
                            borderRadius: "12px",
                            border: "1px solid #334155"
                        }}
                    >

                        <h3>
                            Portfolio Weights
                        </h3>

                        {
                            Object.entries(result.weights)
                                .map(
                                    ([ticker, weight]) => (

                                        <div
                                            key={ticker}
                                            style={{
                                                marginBottom: "10px"
                                            }}
                                        >

                                            {ticker} - {
                                            (weight * 100)
                                                .toFixed(2)
                                        }%

                                        </div>

                                    )
                                )
                        }

                    </div>

                )
            }
            {
                result && (

                    <div
                        style={{
                            marginTop: "30px",
                            backgroundColor: "#1E293B",
                            padding: "20px",
                            borderRadius: "12px",
                            border: "1px solid #334155"
                        }}
                    >

                        <h3>
                            Portfolio Allocation
                        </h3>

                        <AllocationChart
                            weights={result.weights}
                        />

                    </div>

                )
            }
        </div>
    );
}