import Chart from 'chart.js/auto'

export default async (latitude=54.4547274 , longtitude = 17.0398068) => {
    const chartEl = document.getElementById('chart');
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longtitude + '&hourly=temperature_2m';
    if (chartEl)
    {
        try
        {
            let response = await fetch(apiUrl);
            if (response.ok) {
                destroyChartIfExists();
                let json = await response.json();
                let labels = getOnlyHourFromJSON(json.hourly.time);
                let data = json.hourly.temperature_2m;
                makeChart(chartEl, labels, data);
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }
}
function makeChart(chartEl, labels, data)
{
    new Chart(
        chartEl,
        {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Temperatura [' + String.fromCharCode(176) + 'C]',
                        data: data
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 90,
                            minRotation: 90
                        }
                    }
                }
            }
        })
}
function destroyChartIfExists()
{
    let chartStatus = Chart.getChart("chart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
}
function getOnlyHourFromJSON(time)
{
    let values = [];
    time.forEach(element =>
        {
            let value = parseInt(element.substring(8, 10)) + ' ' + months[parseInt(element.substring(6, 8))] + ' ' + element.slice(-5);
            console.log(parseInt(element.substring(6, 8)));
            values.push(value);
        }
    )
    return values;
}
const months= {
    1: "sty",
    2: "lut",
    3: "mar",
    4: "kwi",
    5: "maj",
    6: "cze",
    7: "lip",
    8: "sie",
    9: "wrze",
    10: "paź",
    11: "lis",
    12: "gru"
}