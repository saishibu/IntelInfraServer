const DAYS_OF_WEEK = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",

];

const HOURS = [
    "12:00 am",
    "01:00 am",
    "02:00 am",
    "03:00 am",
    "04:00 am",
    "05:00 am",
    "06:00 am",
    "07:00 am",
    "08:00 am",
    "09:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "01:00 pm",
    "02:00 pm",
    "03:00 pm",
    "04:00 pm",
    "05:00 pm",
    "07:00 pm",
    "08:00 pm",
    "09:00 pm",
    "10:00 pm",
    "11:00 pm",
    "12:00 pm"
];

window.addEventListener("load", async () => {
    let data = await fetch("/api/data").then((e) => e.json());
    createCharts(data);

    for (button of document.querySelectorAll("button[data-show-element]"))
        button.addEventListener("click", showButtonGroupElement);
});

function showButtonGroupElement(e) {
    let element = e.target;
    let showElement = document.querySelector(element.dataset.showElement);
    if (!showElement.classList.contains("hide")) return;

    for (let button of element.parentElement.querySelectorAll(
        "button[data-show-element]"
    ))
        if (!showElement.isSameNode(button))
            document
                .querySelector(button.dataset.showElement)
                .classList.add("hide");

    showElement.classList.remove("hide");
}

function createCharts(data) {
    // weekely Temperature chart
    let dailyTemps = data.daily.map((e) => e.temp);
    new ApexCharts(document.querySelector("#weekely_temp_chart"), {
        series: [
            {
                name: "High",
                data: dailyTemps.map((e) => e.max)
            },
            {
                name: "Low",
                data: dailyTemps.map((e) => e.min)
            }
        ],
        chart: {
            height: 386,
            width: "100%",
            type: "bar",
            
            toolbar: {
                show: true
            }
        },
        colors: ["#008ffb", "#00e396"],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth"
        },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5
            }
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: DAYS_OF_WEEK,
            title: {
                text: "Temperature in °C",
                style: {
                    fontFamily: 'Poppins, sans-serif',
                },
            }
        },
        yaxis: {
            title: {
                text: ""
            },
            min: -40,
            max: 40
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            }
        },
        legend: {
            position: "bottom",
            horizontalAlign: "right",
            floating: true,
            offsetY: 5,
            offsetX: -5
        }
    }).render();

    // hourly Temperature chart
    var temp_list = data.hourly.map((e) => e.temp);
	console.log(temp_list);
	var temp_24_list = [];
	for (var i = 0; i < temp_list.length; i = i + 2) {
		temp_24_list.push(temp_list[i]);
	}
	console.log(temp_24_list);
    new ApexCharts(document.querySelector("#hourly_temp_chart"), {
        series: [
            {
                name: "Temperature",
                data: temp_24_list
            }
        ],
        chart: {
            height: 380,
            width: "100%",
            type: "bar",
            
            toolbar: {
                show: true
            }
        },
        colors:[ "#00e396"],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth"
        },
        plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            }
          },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5
            }
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: HOURS,
            title: {
                text: "Temperature in °C",
                style: {
                    fontFamily: 'Poppins, sans-serif',
                },
            }
            
        },
        yaxis: {
            title: {
                text: ""
            },
            min: -40,
            max: 40
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            }
        },
        legend: {
            position: "bottom",
            horizontalAlign: "right",
            floating: true,
            offsetY: 5,
            offsetX: -5
        }
    }).render();

    // --------------------PRESSURE CHART----------------------
    // weekely chart
    let dailyPressure = data.daily.map((e) => e.pressure);
    new ApexCharts(document.querySelector("#weekely_pressure_chart"), {
        series: [
            {
                name: "Pressure",
                data: data.daily.map((e) => e.pressure)
            }
        ],
        chart: {
            height: 380,
            width:"100%",
            type: "bar"
        },
        colors: [ "#FFD200"],
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            }
          },
          dataLabels: {
            enabled: false
          },
        xaxis: {
            categories: DAYS_OF_WEEK,
            title: {
                text: "Pressure in hPa",
                style: {
                    fontFamily: 'Poppins, sans-serif',
                },
            }
        },
        
        yaxis: {
            min: 980,
            max: 1050,
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            }
        },
    }).render();

    // hourly pressure  chart
    var pressure_list = data.hourly.map((e) => e.pressure);
	console.log(pressure_list);
	var pressure_24_list = [];
	for (var i = 0; i < pressure_list.length; i = i + 2) {
		pressure_24_list.push(pressure_list[i]);
	}
	console.log(pressure_24_list);

    new ApexCharts(document.querySelector("#hourly_pressure_chart"), {
        series: [
            {
                name: "Pressure",
                data: pressure_24_list
            }
        ],
        chart: {
            height: 370,
            width: "100%",
            type: "bar"
        },
        colors: [ "#FFD200"],
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            }
          },
          dataLabels: {
            enabled: false
          },
        xaxis: {
            categories: HOURS,
            title: {
                text: "Pressure in hPa",
                style: {
                    fontFamily: 'Poppins, sans-serif',
                },
            }
        },
        
        yaxis: {
            min: 980,
            max: 1060,
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            }
        },
    }).render();

    // --------------------HUMIDITY CHART----------------------
     
    // weekely chart
    let dailyHumidity = data.daily.map((e) => e.humidity);
    new ApexCharts(document.querySelector("#weekely_humidity_chart"), {
        series: [
            {
                name: "Humidity",
                data: data.daily.map((e) => e.humidity)
            }
        ],
        chart: {
            height: 380,
            width: "100%",
            type: "bar"
        },
        colors: [ "#ff6178"],
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            }
          },
          dataLabels: {
            enabled: false
          },
        xaxis: {
            categories: DAYS_OF_WEEK,
            title: {
                text: "Humidity in %",
                style: {
                    fontFamily: 'Poppins, sans-serif',
                },
            }
        },
        
        yaxis: {
            min: 0,
            max: 100,
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            }
        },
    }).render();

    // hourly Humidity chart
    var humidity_list = data.hourly.map((e) => e.humidity);
	console.log(humidity_list);
	var humidity_24_list = [];
	for (var i = 0; i < humidity_list.length; i = i + 2) {
		humidity_24_list.push(humidity_list[i]);
	}
	console.log(humidity_24_list);
    new ApexCharts(document.querySelector("#hourly_humidity_chart"), {
        series: [
            {
                name: "Humidity",
                data: humidity_24_list
            }
        ],
        chart: {
            height: 370,
            width: "100%",
            type: "bar",
        },
        colors:[ "#ff6178"],
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
            }
          },
        dataLabels: {
            enabled: false
          },
        legend: {
            show: false
          },
        xaxis: {
            categories: HOURS,
            title: {
                text: "Humidity in %",
                style: {
                    fontFamily: 'Poppins, sans-serif',
                },
            }
        },
        yaxis: {
            title: {
                text: ""
            },
            min: 0,
            max: 100
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            }
        },
    }).render();
    
}
