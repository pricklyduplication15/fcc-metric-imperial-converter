function ConvertHandler() {
  this.getNum = function (input) {
    // Split the input into number and unit parts
    const match = input.match(/[a-zA-Z]+|[^a-zA-Z]+/g);
    const numStr = match && match[0].match(/[a-zA-Z]/) ? "" : match[0];
    const unit = match ? match.find((e) => /[a-zA-Z]/.test(e)) : "";

    // If numStr is empty, default to 1
    if (!numStr) return 1;

    // Handle fractions and detect double-fractions
    if ((numStr.match(/\//g) || []).length > 1) {
      return undefined; // return undefined for double-fraction input
    }

    let result;
    if (numStr.includes("/")) {
      const [numerator, denominator] = numStr.split("/");
      result = parseFloat(numerator) / parseFloat(denominator);
    } else {
      result = parseFloat(numStr);
    }

    // Check if result is NaN
    return isNaN(result) ? undefined : result;
  };

  this.getUnit = function (input) {
    const match = input.match(/[a-zA-Z]+/g);
    const unit = match ? match[0].toLowerCase() : "invalid unit";
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    return validUnits.includes(unit)
      ? unit === "l"
        ? "L"
        : unit
      : "invalid unit";
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
    if (initUnit === "invalid unit" || !initNum) {
      return "invalid input";
    }

    const spellOutInitUnit = this.spellOutUnit(initUnit);
    const spellOutReturnUnit = this.spellOutUnit(returnUnit);

    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 5, // Adjust the precision here
    });

    return `${formatter.format(
      initNum
    )} ${spellOutInitUnit} converts to ${formatter.format(
      returnNum
    )} ${spellOutReturnUnit}`;
  };
}

module.exports = ConvertHandler;
