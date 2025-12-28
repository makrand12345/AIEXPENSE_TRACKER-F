import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./features/expenses/expensesSlice";

// 🔥 LOAD FROM LOCAL STORAGE
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// 🔥 SAVE TO LOCAL STORAGE
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // ignore
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    expenses: expensesReducer
  },
  preloadedState: persistedState
});

// 🔥 AUTO SAVE ON EVERY CHANGE
store.subscribe(() => {
  saveState({
    expenses: store.getState().expenses
  });
});

export default store;
 