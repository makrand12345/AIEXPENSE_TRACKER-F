import { useSelector } from "react-redux";
import { useMemo } from "react";
import VoiceInput from "../components/VoiceInput";
import { speak } from "../utils/voiceParser";
import "../components/Pages.css";

function Home() {
  const expenses = useSelector(
    (state) => state.expenses.list || []
  );

  const aiData = useMemo(() => {
    if (expenses.length === 0) {
      return {
        total: 0,
        avgPerDay: 0,
        topCategory: "N/A",
        insight: "Start adding expenses to unlock AI insights.",
        streak: 0,
      };
    }

    const now = new Date();
    const thisMonthExpenses = expenses.filter((e) => {
      const d = new Date(e.created_at);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    });

    const total = thisMonthExpenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );

    const daysPassed = new Date().getDate();
    const avgPerDay = Math.round(total / daysPassed);

    const categoryMap = {};
    thisMonthExpenses.forEach((e) => {
      categoryMap[e.category] =
        (categoryMap[e.category] || 0) + e.amount;
    });

    const topCategory =
      Object.entries(categoryMap).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] || "N/A";

    const insight =
      avgPerDay > 700
        ? "⚠️ You are spending more than usual daily."
        : "✅ Your spending looks controlled this month.";

    return {
      total,
      avgPerDay,
      topCategory,
      insight,
    };
  }, [expenses]);

  // 🧠 AI VOICE COMMAND HANDLER
  const handleVoiceCommand = (text) => {
    const lower = text.toLowerCase();

    let response = "Sorry, I didn't understand that.";

    if (lower.includes("this month")) {
      response = `You spent ₹${aiData.total} this month.`;
    } else if (lower.includes("per day")) {
      response = `Your average daily spending is ₹${aiData.avgPerDay}.`;
    } else if (lower.includes("top category")) {
      response = `Your highest spending category is ${aiData.topCategory}.`;
    } else if (lower.includes("can i spend")) {
      response =
        aiData.avgPerDay < 700
          ? "Yes, you are within a safe spending range today."
          : "Be careful. You are already spending above average.";
    } else if (lower.includes("advice")) {
      response = aiData.insight;
    }

    speak(response);
  };

  return (
    <div className="page">
      <h1>Welcome 👋</h1>

      {/* AI Insight */}
      <div className="card ai-card">
        <h3>🤖 AI Insight</h3>
        <p>{aiData.insight}</p>
      </div>

      {/* Stats */}
      <div className="home-grid">
        <div className="card stat-card">
          <h4>This Month</h4>
          <p className="stat-value">₹{aiData.total}</p>
        </div>

        <div className="card stat-card">
          <h4>Avg / Day</h4>
          <p className="stat-value">₹{aiData.avgPerDay}</p>
        </div>

        <div className="card stat-card">
          <h4>Top Category</h4>
          <p className="stat-value">
            {aiData.topCategory.toUpperCase()}
          </p>
        </div>
      </div>

      {/* 🎤 CONVERSATIONAL AI */}
      <div className="card">
        <h3>🎤 Talk to your AI</h3>
        <p style={{ fontSize: "14px", color: "#64748b" }}>
          Try saying: “How much did I spend this month?”
        </p>
        <VoiceInput onResult={handleVoiceCommand} />
      </div>
    </div>
  );
}

export default Home;
