function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "25px",
        minWidth: "220px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          color: "#64748b",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: "#0f172a",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;