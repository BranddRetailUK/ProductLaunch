const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Serve config file
app.get("/config.json", (req, res) => {
  res.sendFile(path.join(__dirname, "config.json"));
});

// Admin panel post route to update launch time
app.post("/update-launch", (req, res) => {
  const { launchTimestamp } = req.body;
  if (!launchTimestamp) {
    return res.status(400).send("Missing launch timestamp");
  }

  const configPath = path.join(__dirname, "config.json");
  fs.writeFile(configPath, JSON.stringify({ launchTimestamp }), (err) => {
    if (err) {
      console.error("Failed to write config:", err);
      return res.status(500).send("Failed to update launch time");
    }
    res.send("Launch time updated successfully");
  });
});

// Fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
