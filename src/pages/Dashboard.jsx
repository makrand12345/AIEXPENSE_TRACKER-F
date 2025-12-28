import { useEffect, useState } from "react";
import { getAnalyticsOverview } from "../api/analyticsApi";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAnalyticsOverview()
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  }, []);

  if (!data) return <p className="page">Loading insights…</p>;

  if (data.warning) {
    return (
      <div className="page">
        <h2>⚠️ Action Required</h2>
        <p>{data.warning}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Financial Overview</h1>

      <div className="card">
        <p><strong>Total Spent:</strong> ₹{data.total_spent}</p>
        <p><strong>Disposable Income:</strong> ₹{data.disposable_income}</p>
        <p><strong>Investment Ratio:</strong> {data.investment_ratio * 100}%</p>
        <p><strong>Risk Level:</strong> {data.risk_level}</p>
      </div>

      <div className="card ai-card">
        <h3>🧠 AI Insight</h3>
        <p>{data.insight}</p>
      </div>
    </div>
  );
}

export default Dashboard;
