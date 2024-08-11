import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  // Initialize the state with default values
  const [book, setBook] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [error, setError] = useState(false);

  // Use the navigate hook to redirect after submission
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/books", book);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Book</h2>
      <form className="form-item" onSubmit={handleClick}>
        <input
          type="number"
          onChange={handleChange}
          placeholder="ID"
          className="form-input"
          name="id"
          value={book.id}
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Title"
          className="form-input"
          name="title"
          value={book.title}
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Description"
          className="form-input"
          name="description"
          value={book.description}
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
        {error && (
          <p className="error-message">An error occurred. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default AddBook;
