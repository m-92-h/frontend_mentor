import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const unitTemp = searchParams.get("unitTemp") || "celsius";
    const unitWind = searchParams.get("unitWind") || "kmh";
    const unitPrecip = searchParams.get("unitPrecip") || "mm";

    if (!city) {
        return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    // Step 1: Geocoding
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`, {
        next: { revalidate: 86400 },
    });

    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Weather data
    const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&temperature_unit=${unitTemp}&wind_speed_unit=${unitWind}&precipitation_unit=${unitPrecip}`,
        {
            next: { revalidate: 1800 },
        },
    );

    const weatherData = await weatherRes.json();
    const { current, hourly, daily } = weatherData;

    return NextResponse.json({
        cityName: name,
        countryName: country,
        current: {
            time: current.time,
            temperature: current.temperature_2m,
            feelsLike: current.apparent_temperature,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            precipitation: current.precipitation,
            weatherCode: current.weather_code,
        },
        hourly: {
            times: hourly.time,
            temperatures: hourly.temperature_2m,
            weatherCodes: hourly.weather_code,
        },
        daily: {
            days: daily.time,
            weatherCodes: daily.weather_code,
            tempMax: daily.temperature_2m_max,
            tempMin: daily.temperature_2m_min,
        },
    });
}
