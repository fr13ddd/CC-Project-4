let map;

//Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7128, lng: -74.006 }, // NY
    zoom: 8,
  });
}

function findDestination() {
  const climate = document.getElementById("climate").value;
  const travelMonth = document.getElementById("travelTime").value;
  const budget = parseInt(document.getElementById("budget").value);

  const destinations = {
    beach: [
      {
        name: "Maldives",
        lat: 3.2028,
        lng: 73.2207,
        bestMonths: ["January", "February", "March"],
        budget: 3000,
      },
      {
        name: "Cancun",
        lat: 21.1619,
        lng: -86.8515,
        bestMonths: ["January", "February", "December"],
        budget: 1500,
      },
      {
        name: "Phuket",
        lat: 7.8804,
        lng: 98.3923,
        bestMonths: ["November", "December", "January"],
        budget: 1200,
      },
      {
        name: "Bali",
        lat: -8.3405,
        lng: 115.092,
        bestMonths: ["April", "May", "June"],
        budget: 1800,
      },
      {
        name: "Hawaii",
        lat: 21.3069,
        lng: -157.8583,
        bestMonths: ["June", "July", "August"],
        budget: 2500,
      },
      {
        name: "Mykonos",
        lat: 37.4467,
        lng: 25.3289,
        bestMonths: ["July", "August", "September"],
        budget: 2200,
      },
      {
        name: "Miami Beach",
        lat: 25.7907,
        lng: -80.13,
        bestMonths: ["May", "June", "July"],
        budget: 2000,
      },
      {
        name: "Bahamas",
        lat: 25.0343,
        lng: -77.3963,
        bestMonths: ["November", "December", "January"],
        budget: 2300,
      },
    ],
    mountain: [
      {
        name: "Nepal",
        lat: 28.3949,
        lng: 84.124,
        bestMonths: ["April", "May", "September", "October"],
        budget: 2000,
      },
      {
        name: "Swiss Alps",
        lat: 46.8182,
        lng: 8.2275,
        bestMonths: ["December", "January", "February"],
        budget: 3000,
      },
      {
        name: "Rocky Mountains",
        lat: 39.5501,
        lng: -105.7821,
        bestMonths: ["June", "July", "August"],
        budget: 2500,
      },
      {
        name: "Andes",
        lat: -32.6532,
        lng: -70.0107,
        bestMonths: ["September", "October", "November"],
        budget: 2200,
      },
      {
        name: "Blue Mountains",
        lat: -33.7144,
        lng: 150.3114,
        bestMonths: ["September", "October", "November"],
        budget: 1500,
      },
      {
        name: "Mount Fuji",
        lat: 35.3606,
        lng: 138.7274,
        bestMonths: ["July", "August", "September"],
        budget: 1800,
      },
      {
        name: "Banff National Park",
        lat: 51.4968,
        lng: -115.9281,
        bestMonths: ["June", "July", "August"],
        budget: 2000,
      },
    ],
    city: [
      {
        name: "New York",
        lat: 40.7128,
        lng: -74.006,
        bestMonths: ["September", "October", "November"],
        budget: 1800,
      },
      {
        name: "Tokyo",
        lat: 35.6895,
        lng: 139.6917,
        bestMonths: ["March", "April", "October", "November"],
        budget: 2500,
      },
      {
        name: "Paris",
        lat: 48.8566,
        lng: 2.3522,
        bestMonths: ["April", "May", "June"],
        budget: 2200,
      },
      {
        name: "London",
        lat: 51.5074,
        lng: -0.1278,
        bestMonths: ["May", "June", "July"],
        budget: 2100,
      },
      {
        name: "Sydney",
        lat: -33.8688,
        lng: 151.2093,
        bestMonths: ["December", "January", "February"],
        budget: 2300,
      },
      {
        name: "Berlin",
        lat: 52.52,
        lng: 13.405,
        bestMonths: ["June", "July", "August"],
        budget: 1700,
      },
      {
        name: "Barcelona",
        lat: 41.3851,
        lng: 2.1734,
        bestMonths: ["May", "June", "September"],
        budget: 1600,
      },
      {
        name: "Rome",
        lat: 41.9028,
        lng: 12.4964,
        bestMonths: ["April", "May", "October"],
        budget: 1900,
      },
    ],
  };

  let suggestions = destinations[climate]?.filter(
    (d) => d.bestMonths.includes(travelMonth) && d.budget <= budget
  );

  let resultText = "Please fill in all fields.";
  if (suggestions?.length) {
    resultText =
      "Based on your preferences, you should consider visiting: <br>";
    suggestions.forEach((s) => {
      resultText += `${s.name} The best months to visit are ${s.bestMonths.join(
        ", "
      )}, if your budget is around $${s.budget}<br><br>`;
      placeMarker(s.name, s.lat, s.lng);
      fetchWeather(s.name);
    });
  } else if (climate) {
    resultText = "No matching destinations found with your criteria.";
  }

  document.getElementById("result").innerHTML = resultText;
}

function placeMarker(destinationName, lat, lng) {
  const location = { lat: lat, lng: lng };
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: destinationName,
  });

  map.panTo(location);
  map.setZoom(12);
}

//openweather API
function fetchWeather(destination) {
  const apiKey = "f6b5f60882b0b1b4a3f41741666d4f38";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const weatherInfo = `${destination}: ${temperature}°C, ${weatherDescription}`;
      document.getElementById(
        "weather-info"
      ).innerHTML += `<p>${weatherInfo}</p>`;
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}
