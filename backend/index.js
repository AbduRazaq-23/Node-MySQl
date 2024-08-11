import express from "express";
import { connection } from "./DB.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors()); // Correct usage

// @desc get all books details
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  connection.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

// @desc post book details
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`id`, `title`, `description`) VALUES (?)";

  const { id, title, description } = req.body;
  const values = [id, title, description];

  connection.query(q, [values], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.send("Data posted successfully");
  });
});

// @desc delete book details
app.delete("/books/:id", (req, res) => {
  const q = "DELETE FROM books WHERE `id` = ?";

  const bId = req.params.id;

  connection.query(q, [bId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.send("Deleted successfully");
  });
});

// @desc update book
app.patch("/books/:id", (req, res) => {
  const q = "UPDATE books SET `title` = ?, `description` = ? WHERE `id` = ?";

  const { title, description } = req.body;
  const bookId = req.params.id;

  connection.query(q, [title, description, bookId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.send("Book updated successfully");
  });
});

// @desc get book by id
app.get("/books/:id", (req, res) => {
  const q = "SELECT * FROM books WHERE `id` = ?";

  const bId = req.params.id;

  connection.query(q, [bId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }

    return res.json(data[0]);
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
