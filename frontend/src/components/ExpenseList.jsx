import React, { useState, useEffect } from "react";
import { fetchExpenses, deleteExpense, updateExpense } from "../api/expenseApi";
import {
  TableContainer,
  Table,
  ButtonContainer,
  ActionButton,
  AddButtonPopUp,
  FilterContainer,
  Select,
  Input,
  ResetButton,
} from "../styles/StyledComponents";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CustomPagination from "./CustomPagination";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedExpense, setUpdatedExpense] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  });

  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateRangeStart, setDateRangeStart] = useState("");
  const [dateRangeEnd, setDateRangeEnd] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = ["Food", "Transport", "Utilities", "Entertainment"];
  const paymentMethods = ["Cash", "Online"];

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const expensesData = await fetchExpenses();
        setExpenses(expensesData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    loadExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        setExpenses(expenses.filter((expense) => expense._id !== id));
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  const handleEdit = (expense) => {
    setEditMode(expense._id);
    setUpdatedExpense({ ...expense });
  };

  const handleUpdate = async (id) => {
    try {
      if (!updatedExpense.amount || !updatedExpense.description) {
        alert("Amount and Description are required.");
        return;
      }

      const response = await updateExpense(id, updatedExpense);
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) => (expense._id === id ? response : expense))
      );

      setEditMode(null);
      setUpdatedExpense({});
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filtering logic
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      categoryFilter === "" || expense.category === categoryFilter;
    const matchesPaymentMethod =
      paymentMethodFilter === "" ||
      expense.paymentMethod === paymentMethodFilter;
    const matchesDateRange =
      (dateRangeStart === "" ||
        new Date(expense.date) >= new Date(dateRangeStart)) &&
      (dateRangeEnd === "" || new Date(expense.date) <= new Date(dateRangeEnd));

    return matchesCategory && matchesPaymentMethod && matchesDateRange;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    const aValue =
      sortConfig.key === "date" ? new Date(a.date) : a[sortConfig.key];
    const bValue =
      sortConfig.key === "date" ? new Date(b.date) : b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  const pageCount = Math.ceil(sortedExpenses.length / itemsPerPage);
  const currentExpenses = sortedExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onPageChange = (page) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  const resetFilters = () => {
    setCategoryFilter("");
    setDateRangeStart("");
    setDateRangeEnd("");
    setPaymentMethodFilter("");
    setCurrentPage(1);
  };

  return (
    <TableContainer>
      <h2 style={{ marginLeft: "20px" }}>Expense List</h2>
      {/* Filter Inputs */}
      <FilterContainer>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Select
          value={paymentMethodFilter}
          onChange={(e) => setPaymentMethodFilter(e.target.value)}
        >
          <option value="">All Payment Methods</option>
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </Select>

        <Input
          type="date"
          value={dateRangeStart}
          onChange={(e) => setDateRangeStart(e.target.value)}
        />
        <Input
          type="date"
          value={dateRangeEnd}
          onChange={(e) => setDateRangeEnd(e.target.value)}
        />

        <ResetButton onClick={resetFilters}>Reset </ResetButton>

        <ButtonContainer>
          <AddButtonPopUp>
            <Link
              to="/expenseAdd"
              style={{ textDecoration: "none", color: "white" }}
            >
              <FaPlus />
            </Link>
          </AddButtonPopUp>
        </ButtonContainer>
      </FilterContainer>
      <Table>
        <thead>
          <tr>
            <th onClick={() => handleSort("amount")}>
              Amount
              {sortConfig.key === "amount" &&
                (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </th>
            <th onClick={() => handleSort("description")}>
              Description
              {sortConfig.key === "description" &&
                (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </th>
            <th onClick={() => handleSort("date")}>
              Date
              {sortConfig.key === "date" &&
                (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </th>
            <th onClick={() => handleSort("category")}>
              Category
              {sortConfig.key === "category" &&
                (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </th>
            <th onClick={() => handleSort("paymentMethod")}>
              Payment Method
              {sortConfig.key === "paymentMethod" &&
                (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.length > 0 ? (
            currentExpenses.map((expense) => (
              <tr key={expense._id}>
                <td>
                  {editMode === expense._id ? (
                    <input
                      type="number"
                      value={updatedExpense.amount}
                      onChange={(e) =>
                        setUpdatedExpense({
                          ...updatedExpense,
                          amount: parseFloat(e.target.value),
                        })
                      }
                    />
                  ) : (
                    `$${expense.amount.toFixed(2)}`
                  )}
                </td>
                <td>
                  {editMode === expense._id ? (
                    <input
                      type="text"
                      value={updatedExpense.description}
                      onChange={(e) =>
                        setUpdatedExpense({
                          ...updatedExpense,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    expense.description
                  )}
                </td>
                <td>
                  {editMode === expense._id ? (
                    <input
                      type="date"
                      value={updatedExpense.date.split("T")[0]}
                      onChange={(e) =>
                        setUpdatedExpense({
                          ...updatedExpense,
                          date: e.target.value,
                        })
                      }
                    />
                  ) : (
                    new Date(expense.date).toLocaleDateString()
                  )}
                </td>
                <td>
                  {editMode === expense._id ? (
                    <select
                      value={updatedExpense.category}
                      onChange={(e) =>
                        setUpdatedExpense({
                          ...updatedExpense,
                          category: e.target.value,
                        })
                      }
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    expense.category
                  )}
                </td>
                <td>
                  {editMode === expense._id ? (
                    <select
                      value={updatedExpense.paymentMethod}
                      onChange={(e) =>
                        setUpdatedExpense({
                          ...updatedExpense,
                          paymentMethod: e.target.value,
                        })
                      }
                    >
                      {paymentMethods.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  ) : (
                    expense.paymentMethod
                  )}
                </td>
                <td>
                  {editMode === expense._id ? (
                    <>
                      <ActionButton onClick={() => handleUpdate(expense._id)}>
                        <FaPlus />
                      </ActionButton>
                      <ActionButton onClick={() => setEditMode(null)}>
                        <FaTrash />
                      </ActionButton>
                    </>
                  ) : (
                    <>
                      <ActionButton onClick={() => handleEdit(expense)}>
                        <FaEdit />
                      </ActionButton>
                      <ActionButton onClick={() => handleDelete(expense._id)}>
                        <FaTrash />
                      </ActionButton>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <CustomPagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={onPageChange}
      />
    </TableContainer>
  );
};

export default ExpenseList;
