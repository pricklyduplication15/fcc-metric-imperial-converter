const express = require("express");
const bodyParser = require("body-parser");
const ConvertHandler = require("./controllers/convertHandler"); // Adjust path as needed

const app = express();
const convertHandler = new ConvertHandler();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/convert", (req, res) => {
  const input = req.query.input;
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  if (initNum === "invalid number" && initUnit === "invalid unit") {
    res.status(400).json({ error: "invalid number and unit" });
  } else if (initNum === "invalid number") {
    res.status(400).json({ error: "invalid number" });
  } else if (initUnit === "invalid unit") {
    res.status(400).json({ error: "invalid unit" });
  } else {
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes
