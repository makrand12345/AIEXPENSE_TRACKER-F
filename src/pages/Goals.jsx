import { useState } from "react";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    type: "short-term", // short, medium, long
  });

  const addGoal = () => {
    if (!form.name || !form.targetAmount || !form.targetDate) return;

    const newGoal = {
      ...form,
      id: Date.now(),
      progress: ((form.currentAmount || 0) / form.targetAmount) * 100,
    };

    setGoals([...goals, newGoal]);

    setForm({
      name: "",
      targetAmount: "",
      currentAmount: "",
      targetDate: "",
      type: "short-term",
    });
  };

  // AI-style suggestion: monthly saving required to meet goal
  const calculateMonthlySuggestion = (goal) => {
    const today = new Date();
    const target = new Date(goal.targetDate);
    const monthsLeft = Math.max(1, (target.getFullYear() - today.getFullYear()) * 12 + (target.getMonth() - today.getMonth()));
    const remainingAmount = goal.targetAmount - (goal.currentAmount || 0);
    return (remainingAmount / monthsLeft).toFixed(0);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Financial Goals</h2>

      {/* Goal Form */}
      <div className="glass" style={{ padding: "20px", marginBottom: "30px" }}>
        <input
          style={input}
          placeholder="Goal Name (e.g., Buy Car)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={input}
          type="number"
          placeholder="Target Amount (₹)"
          value={form.targetAmount}
          onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
        />
        <input
          style={input}
          type="number"
          placeholder="Current Amount (₹)"
          value={form.currentAmount}
          onChange={(e) => setForm({ ...form, currentAmount: e.target.value })}
        />
        <input
          style={input}
          type="date"
          value={form.targetDate}
          onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
        />
        <select
          style={input}
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="short-term">Short-Term</option>
          <option value="medium-term">Medium-Term</option>
          <option value="long-term">Long-Term</option>
        </select>

        <button className="btn" style={{ width: "100%", marginTop: "15px" }} onClick={addGoal}>
          Add Goal
        </button>
      </div>

      {/* Goal List */}
      {goals.length === 0 && <p>No goals created yet.</p>}

      {goals.map((g) => {
        const monthlySuggestion = calculateMonthlySuggestion(g);
        return (
          <div key={g.id} className="glass" style={{ padding: "20px", marginBottom: "15px" }}>
            <h4>{g.name}</h4>
            <p>
              Target: ₹{g.targetAmount} | Current: ₹{g.currentAmount || 0} | Type: {g.type}
            </p>
            <p>Target Date: {g.targetDate}</p>
            <div style={{ background: "#e0e0e0", borderRadius: "8px", height: "20px", width: "100%", margin: "10px 0" }}>
              <div
                style={{
                  height: "100%",
                  width: `${g.progress}%`,
                  background: "linear-gradient(90deg, #1e90ff, #00bfff)",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
            <p>Progress: {g.progress.toFixed(1)}%</p>
            <p>💡 AI Suggestion: Save ₹{monthlySuggestion}/month to meet your goal</p>
          </div>
        );
      })}
    </div>
  );
}

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  width: "100%",
  marginBottom: "10px",
};

export default Goals;
