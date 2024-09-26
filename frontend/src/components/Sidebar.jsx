import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  max-width: 180px;
  width: 100%;
  position: sticky;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarItem = styled.li`
  margin: 15px 0;

  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;

    &:hover {
      color: #007bff;
    }
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarTitle>Expense Tracker</SidebarTitle>
      <SidebarList>
        <SidebarItem>
          <Link to="/">Home</Link>
        </SidebarItem>
        <SidebarItem>
          <Link to="/expenses">Expenses</Link>
        </SidebarItem>
        <SidebarItem>
          <Link to="/reports">Reports</Link>
        </SidebarItem>
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
