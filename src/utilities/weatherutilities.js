export const getWeatherIcon = (weather) => {
  const main = weather?.main?.toLowerCase();

  const iconMap = {
    clear: "Sun",
    clouds: "Cloud",
    rain: "CloudRain",
    drizzle: "CloudDrizzle",
    thunderstorm: "CloudLightning",
    snow: "Snowflake",
    mist: "CloudFog",
    fog: "CloudFog",
    haze: "CloudFog",
    dust: "Wind",
    sand: "Wind",
    ash: "Wind",
    squall: "Wind",
    tornado: "Tornado",
  };

  return iconMap[main] || "Cloud";
};

export const formatTemperature = (temp, unit) => {

  if (temp == null || isNaN(temp)) return "--";

  if (unit === "F") {
    return Math.round((temp * 9) / 5 + 32);
  }
  return Math.round(temp);
};

export const formatTime = (timestamp) => {
 
  if (!timestamp) return "--";
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDate = (timestamp) => {

  if (!timestamp) return "--";
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const getWindDirection = (deg) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW"
  ];
  if (typeof deg !== "number" || isNaN(deg)) return "--";
  return directions[Math.round(deg / 22.5) % 16];
};
