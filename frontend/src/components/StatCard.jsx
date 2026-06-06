function StatCard({
  title,
  value
}) {
  return (
    <div className="stat-card">
      <div className="stat-title">
        {title}
      </div>

      <div className="stat-number">
        {value}
      </div>
    </div>
  );
}

export default StatCard;