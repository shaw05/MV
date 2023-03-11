// Wait for the DOM to load before running the code
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize the map
  var map = L.map('map').setView([51.505, -0.09], 13);
  
  // Add the base tile layer
  var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  });
  tileLayer.addTo(map);
  
  // Load the marker data from the data.js file
  fetch('data.js')
    .then(response => response.json())
    .then(data => {
      
      // Loop through the marker data and add markers to the map
      data.forEach(marker => {
        
        // Create a marker
        var arrowIcon = L.icon({
          iconUrl: 'arrow.png',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          className: 'arrow-icon',
          rotationAngle: marker.angle
        });
        var markerObj = L.marker([marker.lat, marker.lng], { icon: arrowIcon });
        
        // Add the marker to the map
        markerObj.addTo(map);
        
        // Create a popup for the marker
        var popupContent = '<div class="popup">' +
                             '<div class="popup-images">' +
                               '<div class="overlay">' +
                                 '<img src="' + marker.images[0] + '">' +
                                 '<div class="slider"></div>' +
                                 '<img src="' + marker.images[1] + '">' +
                               '</div>' +
                             '</div>' +
                             '<div class="popup-text">' + marker.text + '</div>' +
                           '</div>';
        markerObj.bindPopup(popupContent);
        
        // Initialize the slider for the popup
        var slider = document.querySelector('.slider');
        noUiSlider.create(slider, {
          start: 50,
          range: {
            min: 0,
            max: 100
          }
        });
        var images = document.querySelectorAll('.popup-images img');
        slider.noUiSlider.on('update', function(values, handle) {
          var value = values[handle];
          var opacity = Math.abs(value - 50) / 50;
          images[0].style.opacity = opacity;
          images[1].style.opacity = 1 - opacity;
        });
      });
    });
});
