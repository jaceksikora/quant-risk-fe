import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

type MarketData = {
    date: string;
    close: number;
};

type PriceChartProps = {
    data: MarketData[];
};

export default function PriceChart({
                                       data
                                   }: PriceChartProps) {

    return (
        <ResponsiveContainer
            width="100%"
            height={400}
        >
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis
                    domain={['dataMin - 2', 'dataMax + 2']}
                />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="close"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}