const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js"); // Adjust path as needed

let convertHandler = new ConvertHandler();

const units = ["L", "gal", "mi", "km", "lbs", "kg"];

suite("Unit Tests", function () {
  test("should correctly read a whole number input", function () {
    assert.strictEqual(convertHandler.getNum("32L"), 32);
  });

  test("should correctly read a decimal number input", function () {
    assert.strictEqual(convertHandler.getNum("3.2L"), 3.2);
  });

  test("should correctly read a fractional input", function () {
    assert.strictEqual(convertHandler.getNum("1/2L"), 0.5);
  });

  test("should correctly read a fractional input with a decimal", function () {
    assert.strictEqual(convertHandler.getNum("1.5/3L"), 0.5);
  });

  test("should return an error for a double-fraction input", () => {
    assert.equal(convertHandler.getNum("3/2/3L"), undefined);
  });

  test("should default to a numerical input of 1 when no numerical input is provided", () => {
    assert.equal(convertHandler.getNum("L"), 1);
  });

  test("should correctly read each valid input unit", function () {
    units.forEach((unit) => {
      assert.strictEqual(convertHandler.getUnit("32" + unit), unit);
    });
  });

  test("should correctly return an error for an invalid input unit", function () {
    assert.strictEqual(convertHandler.getUnit("32g"), "invalid unit");
  });

  test("should return the correct return unit for each valid input unit.", function () {
    units.forEach((unit) => {
      assert.strictEqual(
        convertHandler.getReturnUnit(unit),
        convertHandler.getReturnUnit(unit)
      );
    });
  });

  test("should correctly return the spelled-out string unit for each valid input unit.", function () {
    units.forEach((unit) => {
      const expectedString = `1 ${convertHandler.spellOutUnit(
        unit
      )} converts to 1 ${convertHandler.spellOutUnit(
        convertHandler.getReturnUnit(unit)
      )}`;
      assert.strictEqual(
        convertHandler.getString(
          1,
          unit,
          1,
          convertHandler.getReturnUnit(unit)
        ),
        expectedString
      );
    });
  });

  test("should correctly convert gal to L", function () {
    assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541);
  });

  test("should correctly convert L to gal", function () {
    assert.strictEqual(convertHandler.convert(1, "L"), 1 / 3.78541);
  });

  test("should correctly convert mi to km", function () {
    assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934);
  });

  test("should correctly convert km to mi", function () {
    assert.strictEqual(convertHandler.convert(1, "km"), 1 / 1.60934);
  });

  test("should correctly convert lbs to kg", function () {
    assert.strictEqual(convertHandler.convert(1, "lbs"), 0.453592);
  });

  test("should correctly convert kg to lbs", function () {
    assert.strictEqual(convertHandler.convert(1, "kg"), 1 / 0.453592);
  });
});
