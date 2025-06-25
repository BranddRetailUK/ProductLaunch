const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

// ✅ Serve config.json
app.get("/config.json", (req, res) => {
  res.sendFile(path.join(__dirname, "config.json"));
});

// ✅ Explicit route for admin panel
app.get("/admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

// ✅ POST route to update launch + music config
app.post("/update-launch", (req, res) => {
  const { launchTimestamp, musicEnabled, musicSrc, showManualTestButton } = req.body;

  if (!launchTimestamp) {
    return res.status(400).send("Missing launch timestamp");
  }

  const config = {
    launchTimestamp,
    musicEnabled: !!musicEnabled,
    musicSrc: musicSrc || "",
    showManualTestButton: !!showManualTestButton
  };

  fs.writeFile("config.json", JSON.stringify(config), (err) => {
    if (err) {
      console.error("Failed to write config:", err);
      return res.status(500).send("Failed to update config");
    }
    res.send("Launch config updated successfully");
  });
});

// ✅ Fallback route to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
