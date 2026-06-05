# QuantRisk Frontend

A user interface for the financial risk analysis and investment portfolio optimization platform. The application allows for market data visualization, Monte Carlo simulations, and automated analytical report generation.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [Core Modules](#core-modules)

## Features

- **Market Analysis:**
  - Display historical prices for financial instruments.
  - Calculate return statistics (mean return, number of observations).
  - Volatility analysis (daily and annualized).
- **Portfolio Optimization:**
  - Calculate optimal weights for a multi-asset portfolio.
  - Allocation visualization using pie charts.
  - Calculate portfolio variance.
- **Monte Carlo Simulations:**
  - Run thousands of simulations for future portfolio value.
  - Visualize simulation paths and final value distribution.
  - AI integration for generating textual reports based on simulation results.

## Technologies

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **API Communication:** [Axios](https://axios-http.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Linting:** [ESLint](https://eslint.org/)

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quant-risk-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

## Project Structure

- `src/api` - Axios client configuration for backend communication.
- `src/components` - Reusable components (charts, metric cards, sidebar).
- `src/pages` - Main application views (Market Analysis, Portfolio, Simulation).
- `src/types` - TypeScript type definitions for API data.

## Core Modules

- **MarketAnalysis:** Allows entering a stock ticker to fetch detailed statistics and price charts.
- **PortfolioOptimization:** A tool for portfolio optimization based on a provided list of tickers.
- **SimulationReport:** An advanced risk simulation module with graphical result representation and AI reports.
