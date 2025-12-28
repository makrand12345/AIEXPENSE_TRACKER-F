import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchExpensesApi,
  addExpenseApi,
  deleteExpenseApi,
} from "../../api/expenseApi";

// 🔄 Async actions
export const fetchExpenses = createAsyncThunk(
  "expenses/fetch",
  async () => {
    const res = await fetchExpensesApi();
    return res.data;
  }
);

export const addExpense = createAsyncThunk(
  "expenses/add",
  async (expense) => {
    const res = await addExpenseApi(expense);
    return res.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (id) => {
    await deleteExpenseApi(id);
    return id;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetch
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      // add
      .addCase(addExpense.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // delete
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (e) => e.id !== action.payload
        );
      });
  },
});

export default expensesSlice.reducer;
 