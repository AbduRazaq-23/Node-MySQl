import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Extract bookId from the URL
  const bookId = location.pathname.split("/")[2];

  // Fetch book details when component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/books/${bookId}`
        );
        setBook(response.data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchBook();
  }, [bookId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>

      <input
        type="text"
        placeholder="Book Title"
        name="title"
        value={book.title}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book Description"
        name="description"
        value={book.description}
        onChange={handleChange}
      />

      <button onClick={handleClick}>Update</button>
      {error && <p className="error-message">Something went wrong!</p>}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
