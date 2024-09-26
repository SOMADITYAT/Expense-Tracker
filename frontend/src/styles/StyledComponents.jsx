import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 10;
  inset: 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const Form = styled.form`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px; /* Width for the modal */
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  margin-bottom: 16px;

  &:focus {
    border-color: #007bff; /* Highlight color on focus */
    outline: none;
  }
`;

export const Select = styled.select`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  margin-bottom: 16px;

  &:focus {
    border-color: #007bff; /* Highlight color on focus */
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
  background-color: #ccc;
  color: black;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    background-color: #b3b3b3;
  }
`;

export const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const TableContainer = styled.div`
  margin: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  th {
    background-color: #007bff;
    color: #fff;
    position: sticky;
    top: 0;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

export const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    // background-color: #0056b3;
  }
`;

export const AddButtonPopUp = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-2px);
  }
  &:a {
    color: white;
  }

  &:active {
    transform: translateY(1px); /* Pressed effect */
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const PaginationButton = styled.a`
  text-decoration: none;
  padding: 10px;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  margin: 0 5px;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

export const ActivePage = styled.span`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin: 0 5px;
`;

export const PageButton = styled.button`
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;

  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`;
export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;

  select,
  input {
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
`;

export const ResetButton = styled.button`
  padding: 8px;
  border-radius: 8px;
  background-color: #ef4444;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-right: 12px;
  height: 45px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dc2626;
  }
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa; /* Light background for contrast */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  color: #343a40; /* Darker title color */
  margin-bottom: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Spacing between charts and expense list */
`;
