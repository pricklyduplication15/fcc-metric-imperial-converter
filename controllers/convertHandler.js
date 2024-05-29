function ConvertHandler() {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  this.isValidUnit = function (unit) {
    const validUnits = ["GAL", "L", "MI", "KM", "LBS", "KG"];
    return validUnits.includes(unit.toUpperCase());
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
    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    result = parseFloat(num1) / parseFloat(num2);
    return result;
  };

  this.getUnit = function (input) {
    const unitsRegex = /[a-zA-Z]+$/;
    const match = input.match(unitsRegex);

    if (!match) return "invalid unit";
    const unit = match[0].toUpperCase();

    return this.isValidUnit(unit) ? unit : "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    const units = {
      GAL: "L",
      L: "gal",
      MI: "km",
      KM: "mi",
      LBS: "kg",
      KG: "lbs",
    };

    return units[initUnit.toUpperCase()];
  };

  this.spellOutUnit = function (unit) {
    let unitUpper = unit.toUpperCase();

    switch (unitUpper) {
      case "KM":
        return "kilometers";
      case "GAL":
        return "gallons";
      case "LBS":
        return "pounds";
      case "MI":
        return "miles";
      case "L":
        return "liters";
      case "KG":
        return "kilograms";
      default:
        return "don't know";
    }
  };

  this.convert = function (initNum, initUnit) {
    if (isNaN(initNum)) return NaN; // Return NaN for invalid numbers

    const conversions = {
      GAL: initNum * galToL,
      L: initNum / galToL,
      LBS: initNum * lbsToKg,
      KG: initNum / lbsToKg,
      MI: initNum * miToKm,
      KM: initNum / miToKm,
    };

    return conversions[initUnit.toUpperCase()];
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    if (typeof initUnit !== "string" || typeof returnUnit !== "string") {
      return "Invalid unit";
    }

    const spelledOutInitUnit = this.spellOutUnit(initUnit);
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit);

    let formattedInitUnit =
      initUnit.toLowerCase() === "l" ? "L" : initUnit.toLowerCase();
    let formattedReturnUnit =
      returnUnit.toLowerCase() === "l" ? "L" : returnUnit.toLowerCase();

    return `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;
  };
}

module.exports = ConvertHandler;
