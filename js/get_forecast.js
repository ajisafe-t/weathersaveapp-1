var daily_weather_data="";

function getWeatherData(event, location_data){
  var $clicked_element, latitude, longitude = null;
  if (event == null) {

    latitude = location_data.results[0].geometry.location.lat;
    longitude = location_data.results[0].geometry.location.lng;

  } else {

    $clicked_element = $(event.target);
    latitude = $clicked_element.attr("lat");
    longitude = $clicked_element.attr("long");
    
  }
  console.log("getWeatherData() start");

  $.ajax({

            url : "https://api.forecast.io/forecast/932b5e0f9627698b7c6e4aab9522ea64/" + latitude + "," + longitude,
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

function saveDataInCloudant(event, daily_weather_data){
  /*var address = $clicked_element.text();
  daily_weather_data["address"] = address;

  $.ajax({

            url : "https://ajisafet.cloudant.com/forecast/932b5e0f9627698b7c6e4aab9522ea64/" + latitude + "," + longitude,
            data : {unit : "ca"},
            type : "GET",
            dataType: "json",
            headers: { "Accept-Encoding" : "gzip" },
            success: function(data, textStatus, jqXHR){
              //var json2 = JSON.parse(data);
              daily_weather_data = data;
              saveDataInCloudant(event, daily_weather_data);

            },
            error: function(jqXHR,textStatus, errorThrown){

              alert(textStatus);

            }

          });
*/

}
