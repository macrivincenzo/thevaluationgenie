function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#1e3a8a", fontSize: "3rem", textAlign: "center" }}>
        ValuationGenie
      </h1>
      <h2 style={{ color: "#64748b", fontSize: "1.5rem", textAlign: "center", marginBottom: "2rem" }}>
        Instant Business Valuation
      </h2>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "#475569" }}>
          Get professional business valuations for your service-based business in minutes. 
          Our AI-powered tool uses industry-standard methodologies to provide accurate estimates.
        </p>
        <button 
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 24px",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "1rem"
          }}
        >
          Get Free Valuation Estimate
        </button>
        <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
          Free Business Valuation Estimate - Professional Reports $39
        </p>
      </div>
    </div>
  );
}

export default App;