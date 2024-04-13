async function fetchWeather(city) {
    const apiKey = 'f6b5f60882b0b1b4a3f41741666d4f38';  // Your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data could not be fetched.');
        const data = await response.json();
        return {
            description: data.weather[0].description,
            temp: data.main.temp
        };
    } catch (error) {
        console.error(`Failed to fetch weather data for ${city}:`, error);
        return { description: 'Weather data not available', temp: 'N/A' };
    }
}

async function findDestination() {
    const climate = document.getElementById("climate").value;
    const travelTime = document.getElementById("travelTime").value;
    const budget = parseInt(document.getElementById("budget").value);
    if (!climate || !travelTime || isNaN(budget)) {
        document.getElementById('result').innerHTML = "Please fill in all fields.";
        return;
    }

    const destinations = {
        beach: [
            {name: "Maldives", bestMonths: ["01", "02", "03"], budget: 3000},
            {name: "Cancun", bestMonths: ["01", "02", "12"], budget: 1500},
            {name: "Phuket", bestMonths: ["11", "12", "01"], budget: 1200},
            {name: "Bali", bestMonths: ["04", "05", "06"], budget: 1800},
            {name: "Hawaii", bestMonths: ["06", "07", "08"], budget: 2500},
            {name: "Mykonos", bestMonths: ["07", "08", "09"], budget: 2200},
            {name: "Miami Beach", bestMonths: ["05", "06", "07"], budget: 2000},
            {name: "Bahamas", bestMonths: ["11", "12", "01"], budget: 2300}
        ],
        mountain: [
            {name: "Nepal", bestMonths: ["04", "05", "09", "10"], budget: 2000},
            {name: "Swiss Alps", bestMonths: ["12", "01", "02"], budget: 2500},
            {name: "Rocky Mountains", bestMonths: ["06", "07", "08"], budget: 2200},
            {name: "Andes", bestMonths: ["09", "10", "11"], budget: 1900},
            {name: "Himalayas", bestMonths: ["04", "05", "06"], budget: 3000},
            {name: "Blue Mountains", bestMonths: ["09", "10", "11"], budget: 1500},
            {name: "Mount Fuji", bestMonths: ["07", "08", "09"], budget: 1800},
            {name: "Banff National Park", bestMonths: ["06", "07", "08"], budget: 2000}
        ],
        city: [
            {name: "New York", bestMonths: ["09", "10", "11"], budget: 1800},
            {name: "Tokyo", bestMonths: ["03", "04", "10", "11"], budget: 2500},
            {name: "Paris", bestMonths: ["04", "05", "06"], budget: 2200},
            {name: "London", bestMonths: ["05", "06", "07"], budget: 2100},
            {name: "Sydney", bestMonths: ["12", "01", "02"], budget: 2300},
            {name: "Berlin", bestMonths: ["06", "07", "08"], budget: 1700},
            {name: "Barcelona", bestMonths: ["05", "06", "09"], budget: 1600},
            {name: "Rome", bestMonths: ["04", "05", "10"], budget: 1900}
        ]
    };

    const month = travelTime.split("-")[1];
    let suggestions = destinations[climate].filter(d => d.bestMonths.includes(month) && d.budget <= budget);

    let resultText = suggestions.length > 0 ? "Based on your preferences, you should consider visiting: <br>" : "No matching destinations found with your criteria.";
    for (const s of suggestions) {
        const weatherData = await fetchWeather(s.name); // Fetch weather for each destination
        resultText += `${s.name} (Best months: ${s.bestMonths.join(", ")}, Budget: $${s.budget}, Weather: ${weatherData.description}, Temp: ${weatherData.temp}°C)<br>`;
    }

    document.getElementById('result').innerHTML = resultText;
}
