//insert your forecast api key in the variable below
var forecast_api_key = "";
//put in cloudant username and password
var cloudant_username = "";
var cloudant_password = "";
var daily_weather_data = "";


//get weather data from Forecast.io API
function getWeatherData(event, location_data){
  var $clicked_element, latitude, longitude = null;

  //one location reported by forecast.io API
  if (event == null) {

    latitude = location_data.results[0].geometry.location.lat;
    longitude = location_data.results[0].geometry.location.lng;

  }
  //get latitude and longitude from selected element when
  //more than one location is reported by Google geocoding API
  else {

    $clicked_element = $(event.target);
    latitude = $clicked_element.attr("lat");
    longitude = $clicked_element.attr("long");

  }
  console.log("getWeatherData() start");

  $.ajax({

            url : "https://api.forecast.io/forecast/" + forecast_api_key + "/" + latitude + "," + longitude,
            data : {units : "ca"},
            type : "GET",
            dataType: "jsonp",
            headers: { "Accept-Encoding" : "gzip" },
            success: function(data, textStatus, jqXHR){
              //var json2 = JSON.parse(data);
              daily_weather_data = data;
              console.log("getWeatherData() success");
              console.log("latitude: " + data.latitude + ", longitude: " + data.longitude + ", timezone: " + data.timezone);
              saveDataInCloudant(event, daily_weather_data);

            },
            error: function(jqXHR,textStatus, errorThrown){

              alert(textStatus);

            }

          });

}

//saves weather data into Cloudant database
function saveDataInCloudant(event, daily_weather_data){
  var $clicked_element = $(event.target);
  //daily_weather_data["address"] = $clicked_element.html();
  console.log(JSON.stringify(daily_weather_data));
  $.ajax({

            url: "https://" + cloudant_username + ".cloudant.com/weather_db",
            type: "POST",
            dataType: "json",
            //username: "",
            //password: "",
            contentType: "application/json",
            data: JSON.stringify(daily_weather_data),
            beforeSend: function (jqXHR, settings ) {
              jqXHR.setRequestHeader("Authorization", "Basic " + btoa(cloudant_username + ":" + cloudant_password));
            },
            //headers: { "Origin" : "" },
            success: function(data, textStatus, jqXHR){
              //var json2 = JSON.parse(data);
              console.log("Data saved in Cloudant! " + textStatus);
            },
            error: function(jqXHR,textStatus, errorThrown){

              alert(textStatus + ": " + errorThrown);

            }

          });

}
