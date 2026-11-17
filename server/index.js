
const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173"
}));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello from Node.js!");
});

app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 4500 },
    { id: 2, name: "Mouse", price: 120 },
    { id: 3, name: "Keyboard", price: 250 }
  ]);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
