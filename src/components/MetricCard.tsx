type MetricCardProps = {
    title: string;
    value: string;
};

export default function MetricCard({
                                       title,
                                       value
                                   }: MetricCardProps) {
    return (
        <div
            style={{
                backgroundColor: "#1E293B",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #334155",
                boxShadow:
                    "0 4px 12px rgba(0,0,0,0.25)"
            }}
        >
            <p
                style={{
                    color: "#94A3B8",
                    fontSize: "14px",
                    marginBottom: "10px"
                }}
            >
                {title}
            </p>

            <h2
                style={{
                    color: "#F8FAFC",
                    margin: 0
                }}
            >
                {value}
            </h2>
        </div>
    );
}