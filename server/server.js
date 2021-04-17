const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const history = require("connect-history-api-fallback");

dotenv.config({
  path: `${__dirname}/./config/config.${
    process.env.NODE_ENV || "development"
  }.env`,
});
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(`${__dirname}/../client/build`));
}
app.use(history());

if (process.env.NODE_ENV === "production") {
  app.get(/.*/, (req, res) => {
    res.sendFile(`${__dirname}/../client/build/index.html`);
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
