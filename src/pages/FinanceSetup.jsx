import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveFinanceProfileApi } from "../api/financeApi";

function FinanceSetup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    monthly_income: "",
    fixed_expenses: "",
    investments: "",
    liabilities: "",
    risk_level: "medium",
    financial_goal: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await saveFinanceProfileApi({
        ...form,
        monthly_income: Number(form.monthly_income),
        fixed_expenses: Number(form.fixed_expenses),
        investments: Number(form.investments),
        liabilities: Number(form.liabilities),
      });

      alert("Finance profile saved");
      navigate("/dashboard");
    } catch {
      alert("Failed to save finance profile");
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: "520px", margin: "auto" }}>
        <h2>Financial Profile</h2>

        <input
          name="monthly_income"
          placeholder="Monthly Income"
          onChange={handleChange}
        />

        <input
          name="fixed_expenses"
          placeholder="Fixed Expenses (rent, EMIs)"
          onChange={handleChange}
        />

        <input
          name="investments"
          placeholder="Investments (MF, stocks)"
          onChange={handleChange}
        />

        <input
          name="liabilities"
          placeholder="Loans / Credit"
          onChange={handleChange}
        />

        <select name="risk_level" onChange={handleChange}>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>

        <input
          name="financial_goal"
          placeholder="Primary Goal (house, travel, FIRE)"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          Save Finance Profile
        </button>
      </div>
    </div>
  );
}

export default FinanceSetup;
