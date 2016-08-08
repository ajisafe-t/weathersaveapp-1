function getWeatherData(event){
  var $clicked_element = $(event.target);
  var latitude = $clicked_element.attr("lat");
  var longitude = $clicked_element.attr("lng");

  $.ajax({

            url : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location_text,
            //data : {book : JSON.stringify(new_book)},
            type : 'GET',
            dataType: 'json',
            success: function(data, textStatus, jqXHR){
              //var json2 = JSON.parse(data);
              if (data.results.length>1){

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


              }
              $address_list.parent().show();
            },
            error: function(jqXHR,textStatus, errorThrown){

              alert(textStatus);

            }

          });
          
}
