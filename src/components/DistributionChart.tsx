import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

type DistributionChartProps = {
    values: number[];
};

export default function DistributionChart({
                                              values
                                          }: DistributionChartProps) {

    const bins = 20;

    const min = Math.min(...values);
    const max = Math.max(...values);

    const binSize =
        (max - min) / bins;

    const histogram = [];

    for (let i = 0; i < bins; i++) {

        const start =
            min + i * binSize;

        const end =
            start + binSize;

        const count =
            values.filter(
                value =>
                    value >= start &&
                    value < end
            ).length;

        histogram.push({
            range:
                start.toFixed(0),
            count
        });
    }

    return (
        <div
            style={{
                width: "100%",
                height: "400px"
            }}
        >

            <ResponsiveContainer>

                <BarChart
                    data={histogram}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="range"
                        interval={2}
                        label={{
                            value: "Final Portfolio Value ($)",
                            position: "insideBottom",
                            offset: -5
                        }}
                    />

                    <YAxis
                        label={{
                            value: "Number Of Simulations",
                            angle: -90,
                            position: "insideLeft"
                        }}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#3B82F6"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}