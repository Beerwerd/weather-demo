const packingAndTipsByWeather = {
  "Clear sky": {
    pack: ["sunglasses", "cap", "light shirt"],
    tips: ["stay hydrated", "use sunscreen on shoulders"],
  },
  "Mainly clear": {
    pack: ["sunglasses", "light jacket"],
    tips: ["avoid long sun exposure midday", "light meals for comfort"],
  },
  "Partly cloudy": {
    pack: ["light jacket", "comfortable shoes"],
    tips: [
      "clouds can hide sudden sun bursts",
      "perfect time for walking tours",
    ],
  },
  Overcast: {
    pack: ["hoodie", "extra layers"],
    tips: ["low light affects visibility", "pack something warm for evenings"],
  },
  Fog: {
    pack: ["reflective clothing", "warm scarf"],
    tips: ["extra caution crossing streets", "allow more time for transport"],
  },
  "Depositing rime fog": {
    pack: ["warm gloves", "face protection"],
    tips: ["watch for slippery surfaces", "limit long outdoor stays"],
  },
  "Drizzle: light": {
    pack: ["light waterproof jacket", "cap"],
    tips: ["avoid cotton layers", "high chance of damp shoes"],
  },
  "Drizzle: moderate": {
    pack: ["rain jacket", "waterproof shoes"],
    tips: ["umbrella may be annoying in wind", "check indoor plans backup"],
  },
  "Drizzle: dense": {
    pack: ["raincoat", "umbrella"],
    tips: ["sidewalk puddles everywhere", "dress quick-dry underneath"],
  },
  "Freezing drizzle: light": {
    pack: ["gloves", "water resistant boots"],
    tips: ["black ice risk", "warm up hands frequently"],
  },
  "Freezing drizzle: dense": {
    pack: ["thermal layers", "thick waterproof coat"],
    tips: ["icy stairs and pavements", "keep phone battery warm"],
  },
  "Rain: slight": {
    pack: ["compact umbrella", "waterproof jacket"],
    tips: ["roofed café stops help", "avoid cloth shoes"],
  },
  "Rain: moderate": {
    pack: ["raincoat", "boots"],
    tips: ["public transport delays possible", "secure electronics in bags"],
  },
  "Rain: heavy": {
    pack: ["strong umbrella", "spare socks"],
    tips: ["avoid long outdoor walks", "mind slippery tiles indoors"],
  },
  "Freezing rain: light": {
    pack: ["thermal gloves", "insulated waterproof jacket"],
    tips: ["sidewalks turn into mirrors", "check weather alerts hourly"],
  },
  "Freezing rain: heavy": {
    pack: ["full winter gear", "anti slip shoe grips"],
    tips: ["avoid trees and power lines", "short trips only"],
  },
  "Snow fall: slight": {
    pack: ["winter hat", "scarf"],
    tips: ["watch for wind gusts", "perfect time for warm drinks"],
  },
  "Snow fall: moderate": {
    pack: ["insulated boots", "warm coat"],
    tips: ["transport slower than usual", "protect devices from moisture"],
  },
  "Snow fall: heavy": {
    pack: ["heavy duty winter coat", "snow pants"],
    tips: ["stay visible to drivers", "plan extra travel time"],
  },
  "Snow grains": {
    pack: ["windproof jacket", "gloves"],
    tips: ["stings the face in wind", "use lip balm"],
  },
  "Rain showers: slight": {
    pack: ["hooded jacket", "quick dry clothing"],
    tips: ["showers can come suddenly", "check sky often"],
  },
  "Rain showers: moderate": {
    pack: ["rain poncho", "waterproof bag cover"],
    tips: ["store essentials high in backpack", "avoid muddy routes"],
  },
  "Rain showers: violent": {
    pack: ["heavy rainproof gear", "no cotton clothing"],
    tips: ["stay off bikes", "find shelter quickly"],
  },
  "Snow showers: slight": {
    pack: ["beanie", "warm socks"],
    tips: ["keep feet dry", "short stops to warm up"],
  },
  "Snow showers: heavy": {
    pack: ["down jacket", "snow boots"],
    tips: ["visibility drops fast", "walk carefully near traffic"],
  },
  "Thunderstorm: slight or moderate": {
    pack: ["waterproof shoes", "avoid metal items"],
    tips: ["seek indoor shelter", "stay away from tall isolated objects"],
  },
  "Thunderstorm with slight hail": {
    pack: ["helmet style cap", "thick jacket"],
    tips: ["hail hurts!", "use covered walkways"],
  },
  "Thunderstorm with heavy hail": {
    pack: ["reinforced hood", "stay indoors advice note"],
    tips: ["do not stay outside", "delay non-essential trips"],
  },
};

const fallbackBriefing = (forecast) => {
  return packingAndTipsByWeather[forecast[0].condition];
};

module.exports = {
  fallbackBriefing,
};
