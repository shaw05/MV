var map;
var markers = [];

function initMap() {
  var london = {lat: 51.5074, lng: -0.1278};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: london
  });

  // Load markers from JSON file
  $.getJSON('json3.json', function(data) {
    $.each(data.markers, function(index, marker) {
      addMarker(marker.lat, marker.lng, marker.angle, marker.label, marker.image1, marker.image2, marker.text);
    });
  });
}

function addMarker(lat, lng, angle, label, image1, image2, text) {
  var position = {lat: lat, lng: lng};

  // Add marker to map
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: label,
    icon: {
      url: 'arrow.png',
      size: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 16),
      labelOrigin: new google.maps.Point(16, -10)
    }
  });

  // Create marker info window content
  var arrowElement = document.createElement('div');
  arrowElement.className = 'arrow';
  arrowElement.style.transform = 'rotate(' + angle + 'deg)';

  var labelElement = document.createElement('div');
  labelElement.className = 'marker-label';
  labelElement.textContent = label;

  var overlayContainer = document.createElement('div');
  overlayContainer.className = 'overlay-container';

  var overlayImage1 = document.createElement('img');
  overlayImage1.src = image1;

  var overlayImage2 = document.createElement('img');
  overlayImage2.src = image2;

  var overlaySlider = document.createElement('div');
  overlaySlider.className = 'overlay-slider';

  var overlaySliderInput = document.createElement('input');
  overlaySliderInput.type = 'range';
  overlaySliderInput.min = '0';
  overlaySliderInput.max = '100';
  overlaySliderInput.value = '0';

 
