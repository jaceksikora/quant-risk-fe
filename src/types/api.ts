export type MarketData = {
    date: string;
    close: number;
};

export type ReturnStats = {
    mean_return: number;
    min_return: number;
    max_return: number;
    std_return: number;
    observations: number;
};

export type VolatilityStats = {
    daily_volatility: number;
    annualized_volatility: number;
};

export type PortfolioOptimizationResponse = {
    weights: Record<string, number>;
    portfolio_variance: number;
};

export type MonteCarloResponse = {
    simulations: number;

    expected_value: number;

    best_case: number;

    worst_case: number;

    probability_of_loss: number;

    final_values: number[];

    sample_paths: number[][];
};