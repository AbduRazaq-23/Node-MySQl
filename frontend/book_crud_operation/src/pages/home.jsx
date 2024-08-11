import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/books/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to={"/add"}>
        <button>Add New Books</button>
      </Link>
      <div className="item">
        {books.map((book) => (
          <div key={book.id}>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <Link to={`/update/${book.id}`}>
              <button>update</button>
            </Link>
            <button onClick={() => handleDelete(book.id)}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default home;
