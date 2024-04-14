function findDestination() {
    const climate = document.getElementById("climate").value;
    const travelMonth = document.getElementById("travelTime").value;
    const budget = parseInt(document.getElementById("budget").value);

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
 

    let suggestions = destinations[climate]?.filter(d => d.bestMonths.includes(travelMonth) && d.budget <= budget);

    let resultText = "Please fill in all fields.";
    if (suggestions?.length) {
        resultText = "Based on your preferences, you should consider visiting: <br>";
        suggestions.forEach(s => {
            resultText += `${s.name} (Best months: ${s.bestMonths.join(", ")}, Budget: $${s.budget})<br>`;
            // 发送请求获取天气信息
            fetchWeather(s.name);
        });
    } else if (climate) {
        resultText = "No matching destinations found with your criteria.";
    }

    document.getElementById("result").innerHTML = resultText;
}

function fetchWeather(destination) {
    // 使用你的 API 密钥和目的地信息构建 API 请求
    const apiKey = "f6b5f60882b0b1b4a3f41741666d4f38";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&units=metric`;

    // 发送 API 请求
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // 处理返回的天气数据
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            
            // 更新页面上的天气信息
            const weatherInfo = `${destination}: ${temperature}°C, ${weatherDescription}`;
            document.getElementById("weather-info").innerHTML += `<p>${weatherInfo}</p>`;
        })
        .catch(error => console.error("Error fetching weather data:", error));
}