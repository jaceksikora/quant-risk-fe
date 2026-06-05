import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

type AllocationChartProps = {
    weights: Record<string, number>;
};

const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6"
];

export default function AllocationChart({
                                            weights
                                        }: AllocationChartProps) {

    const data =
        Object.entries(weights)
            .map(
                ([ticker, weight]) => ({
                    name: ticker,
                    value: Number(
                        (weight * 100)
                            .toFixed(2)
                    )
                })
            );

    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                >

                    {
                        data.map(
                            (_, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                        index %
                                        COLORS.length
                                            ]
                                    }
                                />

                            )
                        )
                    }

                </Pie>

                <Tooltip />

            </PieChart>

        </ResponsiveContainer>

    );
}