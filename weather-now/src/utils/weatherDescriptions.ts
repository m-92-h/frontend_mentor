interface WeatherDescription {
    label: string;
    icon: string;
}

interface WeatherDescMap {
    [code: number]: WeatherDescription;
}

export const weatherDesc: WeatherDescMap = {
    0: { label: "Clear Sky", icon: "/images/icon-sunny.webp" },
    1: { label: "Mainly Clear", icon: "/images/icon-sunny.webp" },
    2: { label: "Partly Cloudy", icon: "/images/icon-partly-cloudy.webp" },
    3: { label: "Overcast", icon: "/images/icon-overcast.webp" },
    45: { label: "Fog", icon: "/images/icon-fog.webp" },
    51: { label: "Light Drizzle", icon: "/images/icon-drizzle.webp" },
    56: { label: "Drizzle", icon: "/images/icon-drizzle.webp" },
    61: { label: "Slight Rain", icon: "/images/icon-rain.webp" },
    63: { label: "Rain", icon: "/images/icon-rain.webp" },
    71: { label: "Slight Snow", icon: "/images/icon-snow.webp" },
    73: { label: "Snow", icon: "/images/icon-snow.webp" },
    75: { label: "Heavy Snow", icon: "/images/icon-snow.webp" },
    77: { label: "Snow Grains", icon: "/images/icon-snow.webp" },
    80: { label: "Slight Rain Showers", icon: "/images/icon-rain.webp" },
    81: { label: "Rain Showers", icon: "/images/icon-rain.webp" },
    82: { label: "Heavy Rain Showers", icon: "/images/icon-rain.webp" },
    95: { label: "Thunderstorm", icon: "/images/icon-storm.webp" },
};
