import { useState } from "react";
import { api } from "../api/api";

import MetricCard
    from "../components/MetricCard";

import type {
    MonteCarloResponse
} from "../types/api";

import MonteCarloChart
    from "../components/MonteCarloChart";

import DistributionChart
    from "../components/DistributionChart";

export default function SimulationReport() {

    const [tickers, setTickers] =
        useState("MSFT");

    const [investment, setInvestment] =
        useState(5000);

    const [simulations, setSimulations] =
        useState(10000);

    const [result, setResult] =
        useState<MonteCarloResponse | null>(
            null
        );

    const [report, setReport] =
        useState("");

    const [loadingReport, setLoadingReport] =
        useState(false);

    const runSimulation = async () => {

        try {

            const tickerArray =
                tickers
                    .split(",")
                    .map(
                        ticker =>
                            ticker.trim()
                    );

            const response =
                await api.post(
                    "/simulation/monte-carlo",
                    {
                        tickers: tickerArray,
                        initial_investment: investment,
                        simulations: simulations
                    }
                );

            setResult(
                response.data
            );

        } catch (error) {

            console.error(error);

        }
    };

    const generateReport = async () => {

        try {

            setLoadingReport(true);

            const tickerArray =
                tickers
                    .split(",")
                    .map(
                        ticker =>
                            ticker.trim()
                    );

            const response =
                await api.post(
                    "/ai/report",
                    {
                        tickers: tickerArray,
                        initial_investment: investment,
                        simulations: simulations
                    }
                );

            setReport(
                response.data.report
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoadingReport(false);

        }
    };

    return (
        <div>

            <h1
                style={{
                    marginBottom: "40px"
                }}
            >
                Simulation & AI Report
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}
            >

                <input
                    value={tickers}
                    onChange={(e) =>
                        setTickers(e.target.value)
                    }
                    placeholder="MSFT,NVDA"
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #334155",
                        backgroundColor: "#1E293B",
                        color: "#F8FAFC"
                    }}
                />

                <input
                    type="number"
                    value={investment}
                    onChange={(e) =>
                        setInvestment(
                            Number(e.target.value)
                        )
                    }
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #334155",
                        backgroundColor: "#1E293B",
                        color: "#F8FAFC"
                    }}
                />

                <input
                    type="number"
                    value={simulations}
                    onChange={(e) =>
                        setSimulations(
                            Number(e.target.value)
                        )
                    }
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #334155",
                        backgroundColor: "#1E293B",
                        color: "#F8FAFC"
                    }}
                />

                <button
                    onClick={runSimulation}
                    style={{
                        padding: "12px 20px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#2563EB",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    Run Simulation
                </button>

                {
                    loadingReport && (

                        <div
                            style={{
                                marginTop: "40px",
                                backgroundColor: "#1E293B",
                                padding: "20px",
                                borderRadius: "12px",
                                border: "1px solid #334155",
                                textAlign: "center"
                            }}
                        >

                            <h3>
                                Generating AI Report...
                            </h3>

                            <p>
                                Analyzing portfolio risk and
                                simulation results
                            </p>

                        </div>

                    )
                }

                <button
                    onClick={generateReport}
                    disabled={loadingReport}
                    style={{
                        padding: "12px 20px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#16A34A",
                        color: "white",
                        cursor: "pointer",
                        opacity: loadingReport ? 0.7 : 1
                    }}
                >
                    {
                        loadingReport
                            ? "Generating..."
                            : "Generate AI Report"
                    }
                </button>

            </div>
            {
                result && (

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(2, 1fr)",
                            gap: "20px",
                            marginTop: "40px"
                        }}
                    >

                        <MetricCard
                            title="Expected Value"
                            value={
                                result.expected_value
                                    .toFixed(2)
                            }
                        />

                        <MetricCard
                            title="Best Case"
                            value={
                                result.best_case
                                    .toFixed(2)
                            }
                        />

                        <MetricCard
                            title="Worst Case"
                            value={
                                result.worst_case
                                    .toFixed(2)
                            }
                        />

                        <MetricCard
                            title="Probability Of Loss"
                            value={
                                (
                                    result.probability_of_loss
                                    * 100
                                ).toFixed(2)
                                + "%"
                            }
                        />

                    </div>

                )
            }
            {
                result && (

                    <div
                        style={{
                            marginTop: "40px",
                            backgroundColor: "#1E293B",
                            padding: "20px",
                            borderRadius: "12px",
                            border: "1px solid #334155"
                        }}
                    >

                        <h3>
                            Monte Carlo Paths
                        </h3>

                        <MonteCarloChart
                            samplePaths={
                                result.sample_paths
                            }
                        />

                    </div>

                )
            }
            {
                result && (

                    <div
                        style={{
                            marginTop: "40px",
                            backgroundColor: "#1E293B",
                            padding: "20px",
                            borderRadius: "12px",
                            border: "1px solid #334155"
                        }}
                    >

                        <h3>
                            Distribution Of Outcomes
                        </h3>

                        <DistributionChart
                            values={
                                result.final_values
                            }
                        />

                    </div>

                )
            }
            {
                report && (

                    <div
                        style={{
                            marginTop: "40px",
                            backgroundColor: "#1E293B",
                            padding: "20px",
                            borderRadius: "12px",
                            border: "1px solid #334155"
                        }}
                    >

                        <h2>
                            AI Investment Analysis
                        </h2>

                        <div
                            style={{
                                whiteSpace: "pre-line",
                                lineHeight: "1.8"
                            }}
                        >
                            {report}
                        </div>

                    </div>

                )
            }
        </div>
    );
}