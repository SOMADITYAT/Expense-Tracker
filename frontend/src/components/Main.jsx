import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Expense from "../pages/Expense";
import ExpenseList from "./ExpenseList";
import ExpenseAdd from "./ExpenseAdd";

const Main = () => {
  return (
    <main style={{ padding: "20px", flexGrow: 1 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expense />} />
        <Route path="/expenseAdd" element={<ExpenseAdd />} />
        <Route path="/expenseList" element={<ExpenseList />} />
      </Routes>
    </main>
  );
};

export default Main;
