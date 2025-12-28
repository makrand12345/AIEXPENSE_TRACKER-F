import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchExpenses,
  addExpense,
  deleteExpense,
} from "../features/expenses/expensesSlice";

import VoiceInput from "../components/VoiceInput";
import { parseExpenseFromVoice } from "../utils/voiceParser";

/* 🎨 CATEGORY COLORS */
const CATEGORY_COLORS = {
  food: "#22c55e",
  travel: "#3b82f6",
  shopping: "#ec4899",
  bills: "#f97316",
  other: "#64748b",
};

function Expenses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: expenses, loading } = useSelector(
    (state) => state.expenses
  );

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("other");

  /* 🔐 Auth guard */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(fetchExpenses());
  }, [dispatch, navigate]);

  /* ➕ Manual add */
  const handleAddExpense = () => {
    if (!title || !amount) return;

    dispatch(
      addExpense({
        title: title.trim(),
        amount: Number(amount),
        category,
      })
    );

    setTitle("");
    setAmount("");
    setCategory("other");
  };

  /* 🎤 VOICE INPUT HANDLER (RESTORED + SAFE) */
  const handleVoiceResult = (text) => {
    const parsed = parseExpenseFromVoice(text);
    if (!parsed) return;

    dispatch(addExpense(parsed));
  };

  return (
    <div className="page">
      <h1>Expenses</h1>

      {/* ➕ Add Expense */}
      <div className="card">
        <input
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {Object.keys(CATEGORY_COLORS).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={handleAddExpense}>
          Add Expense
        </button>
      </div>

      {/* 🎤 VOICE INPUT — NEVER REMOVE AGAIN */}
      <VoiceInput onResult={handleVoiceResult} />

      {loading && <p>Loading...</p>}

      {!loading && expenses.length === 0 && (
        <p>No expenses yet</p>
      )}

      {/* 📋 Expense List */}
      {expenses.map((expense) => (
        <div key={expense.id} className="card expense-row">
          <div className="expense-info">
            <span className="expense-title">
              {expense.title} — ₹{expense.amount}
            </span>

            <span className="expense-meta">
              {(expense.category || "other").toUpperCase()}
              {expense.created_at &&
                " • " +
                  new Date(
                    expense.created_at
                  ).toLocaleString()}
            </span>
          </div>

          <span
            className="category-badge"
            style={{
              background:
                CATEGORY_COLORS[expense.category] ||
                CATEGORY_COLORS.other,
            }}
          >
            {expense.category || "other"}
          </span>

          <button
            className="delete-btn"
            onClick={() =>
              dispatch(deleteExpense(expense.id))
            }
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default Expenses;
