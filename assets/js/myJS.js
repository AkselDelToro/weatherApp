function getZipInfo() {
    let base = "https://api.zippopotam.us/us/"
    let z = document.getElementById("zip").value
    let url = base + z;
    // alert("URL"+url);
    fetch(url)
        .then(res => res.json())
        .then(function (data) {
            let ostr = ""
            if (data.places === undefined) {
                ostr = "no data found for zip: " + z
            } else {
                let pl = data.places[0]


                let apiKey = '41796f54bab236ec1ee2b18a8c2d964e'
                let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${pl.latitude}&lon=${pl.longitude}&appid=${apiKey}&units=imperial`
                fetch(url2)
                    .then(res2 => res2.json().then(function (data) {
                        console.log("----------------")
                        console.log(data)
                        let humidity = data.main.humidity
                        let pressure = data.main.pressure
                        let feelsLike = data.main.feels_like
                        let temp = data.main.temp
                        let speed = data.wind.speed

                        let icon = data.weather[0].icon
                        let img = `http://openweathermap.org/img/wn/${icon}@2x.png`
                        ostr += "<table class='table table-striped'>"
                        ostr += "<thead>"
                        ostr += "<tr>"
                        ostr += "<th>City</th>"
                        ostr += "<th>State</th>"
                        ostr += "<th>Temperature (F)</th>"
                        ostr += "<th>Feels Like (F)</th>"
                        ostr += "<th>Humidity</th>"
                        ostr += "<th>Pressure</th>"
                        ostr += "<th>Wind Speed</th>"
                        ostr += " <th></th>"
                        ostr += "</tr>"
                        ostr += "</thead>"
                        ostr += "<tbody>"
                        ostr += `<tr>`
                        ostr += `<td> ${pl['place name']} </td>`
                        ostr += `<td> ${[pl.state]} </td>`
                        ostr += `<td> ${[temp]} </td>`
                        ostr += `<td> ${[feelsLike]} </td>`
                        ostr += `<td> ${[humidity]} </td>`
                        ostr += `<td> ${[pressure]} </td>`
                        ostr += `<td> ${[speed]} </td>`
                        ostr += `<td> <img src='${img}'> </td>`
                        ostr += '</tr></tbody></table>'
                        document.getElementById("results").innerHTML = ostr
                    }))
            }
        }).catch(function (err) {
        console.log("broken: " + err)
    })
}