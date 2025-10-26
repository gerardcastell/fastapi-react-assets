import CircularProgress from "@mui/material/CircularProgress";
import { useInterestRateDisplay } from "../hooks/useInterestRateDisplay";

export const InterestRateDisplay = () => {
  const { interestRate, isFetching, error } = useInterestRateDisplay();

  return (
    <div
      style={{
        maxWidth: 320,
        margin: "2rem auto",
        padding: "2rem 1.5rem",
        background: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 2px 16px rgba(50, 50, 93, 0.1)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "1.2rem",
          color: "#666",
          fontWeight: 500,
          marginBottom: "0.5rem",
        }}
      >
        Average Interest Rate
      </div>
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          color: "#2b7fd2",
          marginBottom: "0.25rem",
        }}
      >
        {interestRate !== undefined && interestRate !== null
          ? `${interestRate}%`
          : "--"}
      </div>
      <div style={{ fontSize: "0.95rem", color: "#aaa", marginTop: "0.25rem" }}>
        {isFetching ? <CircularProgress /> : error ? "Failed to load." : null}
      </div>
    </div>
  );
};
