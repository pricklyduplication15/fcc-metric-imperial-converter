"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    if (!initNum && !initUnit) {
      res.json({ error: "invalid number and unit" });
      return;
    } else if (!initNum) {
      res.json({ error: "invalid number" });
      return;
    } else if (!initUnit) {
      res.json({ error: "invalid unit" });
      return;
    }
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    // Log the response object
    console.log({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: toString,
    });

    // Send the response as JSON
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: toString,
    });
  });
};
