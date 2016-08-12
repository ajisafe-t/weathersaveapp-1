var li = "<li></li>"
var $address_list="";
var $search_results="";
var test_status = true;
$(document).ready(function(){

  $address_list = $("ul.address_list");
  $('#save_forecast').click(function(event){
    getForecast(event);
  });

});

function getForecast(event){
  var $location = $('#address');
  location_text = $.trim($location.val());
  console.log('Location: ' + location_text);
  if (location_text=="") {
    $('.error').html("* Please enter location here");
    //$('.error').addClass('visible');
    $('.error').removeClass('error');
  } else {
    geocoding(location_text, event);
  }

}

function geocoding(location_text, event) {
  $address_list.children().remove();
  $.ajax({

						url : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location_text,
						//data : {book : JSON.stringify(new_book)},
						type : 'GET',
						dataType: 'json',
						success: function(data, textStatus, jqXHR){
							//var json2 = JSON.parse(data);
              //if Google geocoding API reports more than one location,
              //show in a list so user can pick the desired location
              if (data.results.length > 1){

                for (i=0; i < data.results.length; i++){
                    $address_list.append(li);
                    var $last_li=$address_list.children().last();
                    $last_li.attr({
                      lat: data.results[i].geometry.location.lat,
                      long: data.results[i].geometry.location.lng,
                      class: "search_results"
                    });
                    $last_li.html(data.results[i].formatted_address);
                }
                //event handler for search results
                //on clicking one of the search results get weather data and submit to Cloudant
                $(".search_results").click(function(event){

                  //var $clicked_element = $(this);
                  //$(event.target);
                  getWeatherData(event, data);

                });
                $address_list.parent().show();
              }
              //if one location reported from Google geocoding API, get
              //weather data immediately
              else if (data.results.length==1) {
                getWeatherData(null, data);
              }

						},
            error: function(jqXHR,textStatus, errorThrown){

              alert(textStatus);

            }

					});
}
