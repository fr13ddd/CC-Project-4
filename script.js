function findDestination() {
    const climate = document.getElementById("climate").value;
    const travelTime = document.getElementById("travelTime").value;
    const budget = parseInt(document.getElementById("budget").value);
    const destinations = {
        beach: [{name: "Maldives", bestMonths: ["01", "02", "03"], budget: 3000},
                {name: "Cancun", bestMonths: ["01", "02", "12"], budget: 1500}],
        mountain: [{name: "Nepal", bestMonths: ["04", "05", "09", "10"], budget: 2000},
                   {name: "Swiss Alps", bestMonths: ["12", "01", "02"], budget: 2500}],
        city: [{name: "New York", bestMonths: ["09", "10", "11"], budget: 1800},
               {name: "Tokyo", bestMonths: ["03", "04", "10", "11"], budget: 2500}]
    };

    const month = travelTime.split("-")[1];
    let suggestions = destinations[climate]?.filter(d => d.bestMonths.includes(month) && d.budget <= budget);

    let resultText = "Please fill in all fields.";
    if (suggestions?.length) {
        resultText = "Based on your preferences, you should consider visiting: <br>";
        suggestions.forEach(s => {
            resultText += `${s.name} (Best months: ${s.bestMonths.join(", ")}, Budget: $${s.budget})<br>`;
        });
    } else if (climate) {
        resultText = "No matching destinations found with your criteria.";
    }

    document.getElementById("result").innerHTML = resultText;
}
