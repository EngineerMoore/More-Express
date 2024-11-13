const express = require("express");
const app = express();
const PORT = 3000;

// Parse json aka how we access the body in post request
app.use(express.json())

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/notes", require("./api/notes")) ;

// Next(Argument) goes directly to error middleware.
/* Q: Why is argument in brackets, and do we always pass in status and message?
A: {} create the err object represented by the err parameter in error-handler middleware*/
app.use((req, res, next) => {
  next({status: 404, message: `Endpoint not found.`});
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? `Sorry something went wrong!`);
})

app.listen(PORT, ()        => {
  console.log(`Listening o)n port ${PORT}...`);
});
