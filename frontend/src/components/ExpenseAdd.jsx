import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../api/expenseApi";
import {
  ModalOverlay,
  ModalContent,
  Form,
  Label,
  Input,
  Select,
  ButtonContainer,
  CancelButton,
  AddButton,
} from "../styles/StyledComponents";

const ExpenseAdd = ({ onAddExpense }) => {
  const [expenseData, setExpenseData] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
    paymentMethod: "Cash",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors when typing
  };

  // Validate form before submission
  const validateForm = () => {
    let formErrors = {};

    // Description validation
    if (!expenseData.description.trim()) {
      formErrors.description = "Description cannot be empty.";
    }

    // Amount validation
    if (!expenseData.amount) {
      formErrors.amount = "Amount is required.";
    } else if (isNaN(expenseData.amount) || expenseData.amount <= 0) {
      formErrors.amount = "Amount must be a positive number.";
    }

    // Date validation
    if (!expenseData.date) {
      formErrors.date = "Date is required.";
    }

    // Category validation
    if (!expenseData.category) {
      formErrors.category = "Please select a category.";
    }

    return formErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set errors and prevent submission
      return;
    }

    try {
      const addedExpense = await addExpense(expenseData);
      navigate("/expenseList");
      onAddExpense(addedExpense);

      // Reset form fields
      setExpenseData({
        description: "",
        amount: "",
        date: "",
        category: "",
        paymentMethod: "Cash",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          {/* Description */}
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            value={expenseData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description}</p>
          )}

          {/* Amount */}
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            value={expenseData.amount}
            onChange={handleChange}
          />
          {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}

          {/* Date */}
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            name="date"
            id="date"
            value={expenseData.date}
            onChange={handleChange}
          />
          {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}

          {/* Category */}
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            id="category"
            value={expenseData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </Select>
          {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}

          {/* Payment Method */}
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select
            name="paymentMethod"
            id="paymentMethod"
            value={expenseData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
          </Select>

          {/* Buttons */}
          <ButtonContainer>
            <CancelButton
              type="button"
              onClick={() => navigate("/expenseList")}
            >
              Cancel
            </CancelButton>
            <AddButton type="submit">Add Expense</AddButton>
          </ButtonContainer>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ExpenseAdd;
