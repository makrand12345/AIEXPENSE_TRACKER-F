import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../features/expenses/expensesSlice";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#2563eb", "#60a5fa", "#93c5fd", "#bfdbfe"];

function Summary() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.list);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  // 🔹 Category-wise data
  const categoryData = Object.values(
    expenses.reduce((acc, curr) => {
      acc[curr.category] = acc[curr.category] || {
        name: curr.category,
        value: 0
      };
      acc[curr.category].value += curr.amount;
      return acc;
    }, {})
  );

  return (
    <div className="page">
      <h1>Summary</h1>

      {expenses.length === 0 && <p>No expenses to summarize</p>}

      {/* PIE CHART */}
      <div className="card">
        <h3>Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="card">
        <h3>Expense Amounts</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenses}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Summary;
