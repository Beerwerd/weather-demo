const { WMO_CONDITIONS } = require("./constants");

function getWeatherCondition(code) {
  return WMO_CONDITIONS[code] || "Unknown";
}

module.exports = {
  getWeatherCondition,
};
