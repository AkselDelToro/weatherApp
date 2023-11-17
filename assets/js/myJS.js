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
                        document.getElementById("results").innerHTML = ostr
                        document.getElementById("city").innerHTML = pl['place name'];
                        document.getElementById('state').innerHTML = pl.state;
                        document.getElementById('humidity').innerHTML = humidity;
                        document.getElementById('pressure').innerHTML = pressure;
                        document.getElementById('windSpeed').innerHTML = speed;
                        document.getElementById('temp').innerHTML = temp;
                        document.getElementById('feelsLike').innerHTML = feelsLike;
                    }))
            }
        }).catch(function (err) {
        console.log("broken: " + err)
    })
}