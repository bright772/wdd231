
async function displayWeather() {
    const holder = document.getElementById("weather-holder");
    if (!holder) return;

    const placeholder = {
        temp: "--",
        description: "Connect a weather API to show live data",
        forecast: ["Day 1: --", "Day 2: --", "Day 3: --"],
    };

    const API_KEY = "fe05404fbbcae8fd7c3d9b5ef9c02d97";
    // const API_KEY = "524e17b82fc57aa9f1269c29a9d885d3";

    // Decimal Degrees = (+-: +N/E, -S/W) Degrees + (Minutes/60) + (Seconds/3600)
    // 126 52 25 East
    // 35 32 52 North

    const latitude = (35 + 32 / 60 + 52 / 3600).toFixed(4);
    const longitude = (126 + 52/60 + 25/3600).toFixed(4);

    const currentEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=${API_KEY}`;
    const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

    try {
        const [currentResponse, forecastResponse] =
            await Promise.all([
                fetch(currentEndpoint),
                fetch(forecastEndpoint)
            ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather API request failed");
        }

        const data = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        const currentTemp = Math.round(data.main.temp);
        const description = data.weather[0].description;

        const allForecastDays = {};
        forecastData.list.forEach(forecastDay => {
            const date = forecastDay.dt_txt.split(" ")[0];

            if (!allForecastDays[date]) {
                allForecastDays[date] = {
                    date: date,
                            high: -10000,
                            low: 10000
                        };
                    }

            allForecastDays[date].high = Math.max(allForecastDays[date].high, forecastDay.main.temp_max);
            allForecastDays[date].low = Math.min(allForecastDays[date].low, forecastDay.main.temp_min);
        });

        const forecast = Object.values(allForecastDays)
            .slice(1, 4) // start from tomorrow
            .map(day => {
                const date = new Date(day.date + "T12:00:00");

                const dayName = date.toLocaleDateString(undefined, {
                    // weekday: "long"
                    weekday: "short",
                    month: "2-digit",
                    day: "2-digit"
                });

                const high = Math.round(day.high);
                const low = Math.round(day.low);

                return `${dayName}: High ${high}°F / Low ${low}°F`;
            });

        holder.innerHTML = `
            <p><strong>${currentTemp}&deg;</strong> &mdash; ${description}</p>
            <ul>${forecast.map(f => `<li>${f}</li>`).join("")}</ul>
        `;
    } catch (error) {
        holder.innerHTML = `
            <p>Failed to load weather data.</p>
        `;
        console.error(error);
    }
}
displayWeather();
