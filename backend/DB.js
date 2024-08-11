import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

connection.on("error", (err) => {
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.error("Database connection was closed.");
  }
  if (err.code === "ER_CON_COUNT_ERROR") {
    console.error("Database has too many connections.");
  }
  if (err.code === "ECONNREFUSED") {
    console.error("Database connection was refused.");
  }
});

export { connection };
