import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

type MonteCarloChartProps = {
    samplePaths: number[][];
};

export default function MonteCarloChart({
                                            samplePaths
                                        }: MonteCarloChartProps) {

    const limitedPaths =
        samplePaths.slice(0, 20);

    const chartData = [];

    const days =
        limitedPaths[0]?.length || 0;

    for (let day = 0; day < days; day++) {

        const row: Record<string, number> = {
            day
        };

        limitedPaths.forEach(
            (path, index) => {

                row[`path${index}`] =
                    path[day];

            }
        );

        chartData.push(row);
    }

    return (

        <div
            style={{
                width: "100%",
                height: "500px"
            }}
        >

            <ResponsiveContainer>

                <LineChart
                    data={chartData}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="day"
                        label={{
                            value: "Trading Days",
                            position: "insideBottom",
                            offset: -5
                        }}
                    />

                    <YAxis
                        label={{
                            value: "Portfolio Value ($)",
                            angle: -90,
                            position: "insideLeft"
                        }}
                    />

                    {
                        limitedPaths.map(
                            (_, index) => (

                                <Line
                                    key={index}
                                    type="monotone"
                                    dataKey={`path${index}`}
                                    dot={false}
                                    strokeWidth={0.7}
                                    stroke="#3B82F6"
                                />

                            )
                        )
                    }

                </LineChart>

            </ResponsiveContainer>

        </div>

    );
}