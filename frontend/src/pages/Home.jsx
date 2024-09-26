import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ExpenseList from "../components/ExpenseList";
import Charts from "../components/Charts";
import { fetchExpenses } from "../api/expenseApi";
import { Container, Content, Title } from "../styles/StyledComponents";

const Home = () => {
  const [expenses, setExpenses] = useState([]);

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

  return (
    <Container>
      <Title>Expense Tracker</Title>
      <Content>
        <Charts expenses={expenses} />
        <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      </Content>
    </Container>
  );
};

export default Home;
