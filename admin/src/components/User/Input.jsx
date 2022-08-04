import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function Input() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/users/${name}`);
  };
  return (
    <Wrapper>
      <form className="form " onSubmit={handleSearch}>
        <label className="label">Tên người dùng : </label>
        <input
          type="text"
          className="input"
          placeholder="Enter ID"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn">
          Tìm kiếm
        </button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1.5rem;
  label {
    font-size: 1.25rem;
    font-weight: 600;
    margin-right: 1rem;
  }
  input {
    font-family: inherit;
    font-size: 1.25rem;
    color: inherit;
    padding: 0.5rem 1rem;
    border: none;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #eee;
    :focus {
      outline: none;
      border-bottom: 3px solid #55c57a;
    }
  }
  .btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 0.3rem;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    margin: 0 auto;
    margin-left: 8.5rem;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
  }
`;

export default Input;
