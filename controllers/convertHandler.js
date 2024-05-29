function ConvertHandler() {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  this.isValidUnit = function (unit) {
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    return validUnits.includes(unit.toLowerCase());
  };

  function numberStringSplitter(input) {
    let number = input.match(/[.\d\/]+/g) || ["1"];
    let string = input.match(/[a-zA-Z]+/g)[0];

    return [number[0], string];
  }
  function checkDiv(possibleFraction) {
    let nums = possibleFraction.split("/");
    if (nums.length > 2) {
      return false;
    }
    return nums;
  }

  this.getNum = function (input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);
    if (!nums) {
      return undefined;
    }
    let num1 = nums[0];
    let num2 = nums[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    return result;
  };

  this.getUnit = function (input) {
    const unitsRegex = /[a-zA-Z]+$/;
    const match = input.match(unitsRegex);

    if (!match) return "invalid unit";
    const unit = match[0].toLowerCase();

    return this.isValidUnit(unit) ? unit : "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    const units = {
      gal: "l",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    return units[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    return unitNames[unit.toLowerCase()];
  };

  this.convert = function (initNum, initUnit) {
    if (isNaN(initNum)) return NaN; // Return NaN for invalid numbers

    const conversions = {
      gal: initNum * galToL,
      l: initNum / galToL,
      lbs: initNum * lbsToKg,
      kg: initNum / lbsToKg,
      mi: initNum * miToKm,
      km: initNum / miToKm,
      GAL: initNum * galToL,
      L: initNum / galToL,
      LBS: initNum * lbsToKg,
      KG: initNum / lbsToKg,
      MI: initNum * miToKm,
      KM: initNum / miToKm,
    };

    return conversions[initUnit.toLowerCase()];
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const spelledOutInitUnit = this.spellOutUnit(initUnit);
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;
  };
}

module.exports = ConvertHandler;
