import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <div
            style={{
                width: "280px",
                backgroundColor: "#1E293B",
                color: "white",
                padding: "20px",
                minHeight: "100vh"
            }}
        >
            <h2
                style={{
                    marginBottom: "40px"
                }}
            >Investment App</h2>

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >
                <Link to="/market-analysis"
                      style={{
                          color: "#E2E8F0",
                          textDecoration: "none",
                          padding: "10px 0",
                          fontSize: "16px"
                      }}>
                    Market Analysis

                </Link>

                <Link to="/portfolio"
                      style={{
                          color: "#E2E8F0",
                          textDecoration: "none",
                          padding: "10px 0",
                          fontSize: "16px"
                      }}>
                    Portfolio Optimization
                </Link>

                <Link to="/simulation" style={{
                    color: "#E2E8F0",
                    textDecoration: "none",
                    padding: "10px 0",
                    fontSize: "16px"
                }}>
                    Simulation & AI Report
                </Link>
            </nav>
        </div>
    );
}