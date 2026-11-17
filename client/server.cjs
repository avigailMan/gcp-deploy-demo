
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const distPath = path.join(__dirname, "dist");

app.use(express.static(distPath));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.includes(".")) {
    return res.sendFile(path.join(distPath, "index.html"));
  }

  next();
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`React UI running on port ${PORT}`);
});
