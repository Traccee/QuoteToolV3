const express = require("express");
const cors = require("cors");
const path = require("path");

require("./database");
const { calculateQuote } = require("./pricingEngine");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route (for browser testing)
app.get("/", (req, res) => {
  res.send("QuoteToolV2 server is running ✅");
});

// Main quote endpoint
app.post("/quote", (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const quote = calculateQuote(req.body);

    console.log("PLAN MONTHLY OUT:", quote.breakdown.planMonthly);
    console.log("PLAN KEY OUT:", quote.breakdown.planKey);
    console.log("REQ PLAN:", JSON.stringify(req.body.plan));

    res.json(quote);
  } catch (err) {
    console.error("Quote error:", err);
    res.status(500).json({ error: err?.message || "Quote calculation failed" });
  }
});

// Serve React app
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*path", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// IMPORTANT: Railway uses dynamic port
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});