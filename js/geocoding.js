$(document).ready(function(){

  $('#save_forecast').click(function(event){
    getForecast(event);
  });

});

function getForecast(event){
  var location = $('#address');
  location_text = $.trim(location.val());
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

  $.ajax({

						url : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location_text,
						//data : {book : JSON.stringify(new_book)},
						type : 'GET',
						dataType: 'json',
						success: function(data, textStatus, jqXHR){
							//var json2 = JSON.parse(data);
							alert(data.status);
						},
            error: function(jqXHR,textStatus, errorThrown){

              alert(textStatus);

            }

					});
}
