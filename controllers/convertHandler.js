function ConvertHandler() {
  this.getNum = function (input) {
    const match = input.match(/[a-zA-Z]+|[^a-zA-Z]+/g);
    const numStr = match && match[0].match(/[a-zA-Z]/) ? "" : match[0];

    if (!numStr || numStr.trim() === "") {
      return 1; // Default to 1 when no numerical input is provided
    }

    if ((numStr.match(/\//g) || []).length > 1) {
      return "invalid number";
    }

    let result;
    if (numStr.includes("/")) {
      const [numerator, denominator] = numStr.split("/");
      result = parseFloat(numerator) / parseFloat(denominator);
    } else {
      result = parseFloat(numStr);
    }

    if (isNaN(result)) {
      return "invalid number";
    }

    return result;
  };

  this.getUnit = function (input) {
    const match = input.match(/[a-zA-Z]+/g);
    const numStr = input.match(/[^a-zA-Z]+/);
    const unit = match ? match[0].toLowerCase() : undefined;
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    const isValidUnit = validUnits.includes(unit);

    if (!isValidUnit && (!numStr || numStr[0].trim() === "")) {
      return "invalid number and unit";
    }

    if (!isValidUnit) {
      return "invalid unit";
    }

    return unit === "l" ? "L" : unit;
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "L",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    const spellings = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    return spellings[unit === "l" ? "L" : unit];
  };

  this.convert = function (initNum, initUnit) {
    if (initUnit === "invalid unit" || initNum === "invalid number") {
      return undefined;
    }
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = undefined;
    }
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    if (initUnit === "invalid unit" && initNum === "invalid number") {
      return "invalid number and unit";
    } else if (initUnit === "invalid unit") {
      return "invalid unit";
    } else if (initNum === "invalid number") {
      return "invalid number";
    }

    const spellOutInitUnit = this.spellOutUnit(initUnit);
    const spellOutReturnUnit = this.spellOutUnit(returnUnit);

    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 5,
    });

    return `${formatter.format(
      initNum
    )} ${spellOutInitUnit} converts to ${formatter.format(
      returnNum
    )} ${spellOutReturnUnit}`;
  };
}

module.exports = ConvertHandler;
