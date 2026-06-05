import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Sidebar from "./components/Sidebar";

import MarketAnalysis from "./pages/MarketAnalysis";
import PortfolioOptimization from "./pages/PortfolioOptimization";
import SimulationReport from "./pages/SimulationReport";

function App() {
  return (
      <BrowserRouter>

        <div
            style={{
              display: "flex"
            }}
        >

          <Sidebar />

          <div
              style={{
                flex: 1,
                padding: "20px"
              }}
          >

            <Routes>

              <Route
                  path="/"
                  element={
                    <Navigate
                        to="/market-analysis"
                    />
                  }
              />

              <Route
                  path="/market-analysis"
                  element={<MarketAnalysis />}
              />

              <Route
                  path="/portfolio"
                  element={<PortfolioOptimization />}
              />

              <Route
                  path="/simulation"
                  element={<SimulationReport />}
              />

            </Routes>

          </div>

        </div>

      </BrowserRouter>
  );
}

export default App;